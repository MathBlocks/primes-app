import { FC, ReactChild, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// @ts-ignore
import isPrime from 'is-prime'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { useAttributes } from '../App/PrimesContext'
import { useRouteTokenId } from './Context'
import { truncateAddress } from '../../utils'
import { RentalData } from './RentalData'
import { useContracts } from '../App/DAppContext'
import { useAttributesProof } from '../../merkleTree'
import { SendTransactionWidget } from '../SendTransactionWidget'

const PrimeImage = styled.div`
  min-width: 28rem;

  > div:first-child {
    border-radius: 0.75rem;
    border: 1px #444 solid;
    overflow: hidden;
  }

  .navigation {
    margin-top: 1rem;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const ListContainer = styled.div`
  padding: 1rem 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
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
  display: flex;
  gap: 0.5rem;
  align-items: center;
  > :first-child {
    height: 1rem;
    width: auto;
  }
`

const PrimeLink: FC<{ id: string }> = ({ id }) => (
  <PrimeLinkContainer className="monospace" to={`/primes/${id}`}>
    {id}
  </PrimeLinkContainer>
)

const Navigation: FC<{ tokenId: number }> = ({ tokenId }) => (
  <div className="navigation">
    {tokenId > 1 && (
      <Link to={`/primes/${tokenId - 1}`}>Previous</Link>
    )}{' '}
    {tokenId < 16384 && (
      <Link to={`/primes/${tokenId + 1}`}>Next</Link>
    )}
  </div>
)

const PrimeDetail = styled.div`
  width: 24rem;

  h1 {
    margin-bottom: 0.5rem;
  }

  > :first-child {
    margin-bottom: 2rem;
  }

  .reveal-attributes {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px darkred solid;
    p {
      margin-top: 0;
    }
  }
`

const Container = styled.div`
  padding: 8rem 0 4rem 0;
  display: flex;
  gap: 4rem;
  justify-content: space-between;
`

export const Content: FC = () => {
  const [tokenId] = useRouteTokenId()
  const [attributes] = useAttributes()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    pollInterval: 20e3,
  })

  const primeAttributes = useMemo<
    { key: string; name: string; symbol: FC }[]
  >(() => {
    if (!attributes) return []

    return Object.keys(attributes)
      .filter((key) =>
        attributes[key as keyof Attributes].has(tokenId as number),
      )
      .map((key) => {
        const [name, symbol] =
          ATTRIBUTE_NAMES[key as keyof Attributes]
        return { key, name, symbol: symbol as FC }
      })
  }, [attributes, tokenId])

  const prime = useMemo<boolean>(() => isPrime(tokenId), [tokenId])

  return (
    <Container>
      <PrimeImage>
        <div>
          {data?.prime?.image ? (
            <img src={data?.prime?.image} alt={tokenId.toString()} />
          ) : (
            <div className="no-image" />
          )}
        </div>
        <Navigation tokenId={tokenId} />
      </PrimeImage>

      <PrimeDetail>
        <div>
          <h1>
            {tokenId === 1 ? '' : prime ? 'Prime' : 'Composite'} #
            {tokenId}
          </h1>
          <div className="owner">
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
              <span>Not minted.</span>
            )}
          </div>
        </div>
        {data?.prime &&
          !data.prime.revealed &&
          primeAttributes.length > 1 && (
            <div className="reveal-attributes">
              <p>
                {tokenId} has {primeAttributes.length} attributes,
                but they are not yet stored immutably on the contract
                and do not appear on the artwork or on other
                platforms (e.g. OpenSea).
              </p>
              <p>
                You can reveal the attributes so they appear on the
                artwork. This can be done at any time.
              </p>
              <RevealAttributesForm tokenId={tokenId} />
            </div>
          )}
        <List
          title="Attributes"
          items={primeAttributes.map(
            ({ key: id, symbol: Symbol, name }) => ({
              id,
              value: (
                <Attribute>
                  <Symbol />
                  <span>{name}</span>
                </Attribute>
              ),
            }),
          )}
        />
        {data?.prime && prime ? (
          <>
            <List
              title="Twin Primes"
              items={(data.prime.twins ?? []).map(({ id }) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
            />
            <List
              title="Cousin Primes"
              items={(data.prime.cousins ?? []).map(({ id }) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
            />
            <List
              title="Sexy Primes"
              items={(data.prime.sexyPrimes ?? []).map(({ id }) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
            />
          </>
        ) : (
          <List
            title="Parents"
            items={(
              [data?.prime?.parent1, data?.prime?.parent2] as [
                { id: string },
                { id: string },
              ]
            )
              .filter(Boolean)
              .map(({ id }) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
          />
        )}
        <List
          title="Children"
          items={[
            ...(data?.prime?.childrenAsParent1 ?? []),
            ...(data?.prime?.childrenAsParent2 ?? []),
          ].map(({ id }) => ({
            id,
            value: <PrimeLink id={id} />,
          }))}
        />
        {data?.prime?.primeFactors.length ? (
          <>
            <List
              title="Prime Factors"
              items={data?.prime?.primeFactors
                .map((id) => id.toString())
                .map((id) => ({
                  id,
                  value: <PrimeLink id={id} />,
                }))}
            />
          </>
        ) : null}
        <RentalData tokenId={tokenId} />
      </PrimeDetail>
    </Container>
  )
}

const RevealAttributesForm: FC<{ tokenId: number }> = ({
  tokenId,
}) => {
  const contracts = useContracts()
  const attributesProof = useAttributesProof(tokenId)

  if (!contracts || !attributesProof) return null

  return (
    <SendTransactionWidget
      functionName="revealAttributes"
      contract={contracts.Primes}
      args={[tokenId, attributesProof.value, attributesProof.proof]}
      transactionOptions={{ transactionName: 'Reveal attributes' }}
    />
  )
}
