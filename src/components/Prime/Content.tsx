import { FC, ReactChild, ReactNode, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// @ts-ignore
import isPrime from 'is-prime'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { useAttributes } from '../App/PrimesContext'
import { getSVGDataURI } from '../PrimeSVG'
import { useRouteTokenId } from './Context'
import { truncateAddress } from '../../utils'

const Navigation: FC<{ tokenId: number }> = ({ tokenId }) => (
  <div>
    {tokenId > 1 && (
      <Link to={`/primes/${tokenId - 1}`}>Previous</Link>
    )}{' '}
    {tokenId < 16383 && (
      <Link to={`/primes/${tokenId + 1}`}>Next</Link>
    )}
  </div>
)

const PrimeImage = styled.div`
  min-width: 24rem;

  > div {
    border-radius: 0.75rem;
    border: 1px #444 solid;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const ListContainer = styled.div`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  h3 {
  }
  li {
  }
`

const List: FC<{
  title: string
  items: { id: string; value: ReactChild }[]
}> = ({ title, items }) => (
  <ListContainer>
    <h3>{title}</h3>
    <ul>
      {items.length ? (
        items.map((item) => <li key={item.id}>{item.value}</li>)
      ) : (
        <li>None</li>
      )}
    </ul>
  </ListContainer>
)

const PrimeLinkContainer = styled(Link)`
  border: 1px white solid;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: white;
`

const Attribute = styled.div`
  border: 1px white solid;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: white;
`

const PrimeLink: FC<{ id: string }> = ({ id }) => (
  <PrimeLinkContainer className="monospace" to={`/primes/${id}`}>
    {id}
  </PrimeLinkContainer>
)

const Container = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: space-between;

  > :first-child {
  }

  > :last-child {
  }
`

export const Content: FC = () => {
  const [tokenId] = useRouteTokenId()
  const [attributes] = useAttributes()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
  })

  const primeAttributes = useMemo<
    { key: string; name: string; symbol: ReactNode }[]
  >(() => {
    if (!attributes) return []

    return Object.keys(attributes)
      .filter((key) =>
        attributes[key as keyof Attributes].has(tokenId as number),
      )
      .map((key) => {
        const [name, symbol] =
          ATTRIBUTE_NAMES[key as keyof Attributes]
        return { key, name, symbol }
      })
  }, [attributes, tokenId])

  const prime = useMemo<boolean>(() => isPrime(tokenId), [tokenId])

  return (
    <Container>
      <PrimeImage>
        <div>
          <img
            src={getSVGDataURI(tokenId as number, primeAttributes)}
            alt="Prime"
          />
          {/*<img src={data.prime.image} alt={tokenId} />*/}
        </div>
      </PrimeImage>

      <div>
        <div>
          <h1>
            {tokenId === 1 ? '' : prime ? 'Prime' : 'Composite'} #
            {tokenId}
          </h1>
          <Navigation tokenId={tokenId} />
        </div>
        <div>
          {data?.prime?.owner.address ? (
            <span>
              Owned by{' '}
              <a
                className="monospace"
                href={`https://etherscan.io/address/${data.prime.owner.address}`}
              >
                {truncateAddress(data.prime.owner.address)}
              </a>
            </span>
          ) : (
            <span>Not owned</span>
          )}
        </div>
        <List
          title="Attributes"
          items={primeAttributes.map((attr) => ({
            id: attr.key,
            value: <Attribute>{attr.name}</Attribute>,
          }))}
        />
        {prime ? (
          <>
            <List
              title="Twin Primes"
              items={(data?.prime?.twins ?? []).map(({ id }) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
            />
            <List
              title="Cousin Primes"
              items={(data?.prime?.cousins ?? []).map(({ id }) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
            />
            <List
              title="Sexy Primes"
              items={(data?.prime?.sexyPrimes ?? []).map(
                ({ id }) => ({
                  id,
                  value: <PrimeLink id={id} />,
                }),
              )}
            />
          </>
        ) : (
          <>
            <List
              title="Prime Factors"
              // items={(data?.prime?.primeFactors ?? []).map(({ id }) => ({
              //   id,
              //   value: <PrimeLink id={id} />,
              // }))}
              items={[]}
            />
          </>
        )}
      </div>
    </Container>
  )
}
