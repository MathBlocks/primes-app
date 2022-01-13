import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// @ts-ignore
import isPrime from 'is-prime'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { Attributes } from '../../attributes'
import { useAttributes } from '../App/PrimesContext'
import { useRouteTokenId } from './Context'
import { RentalData } from './RentalData'
import { useContracts } from '../App/DAppContext'
import { useAttributesProof } from '../../merkleTree'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { AccountLink } from '../AccountLink'
import { PrimeDetailLists } from './PrimeDetailLists'

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

  @media (max-width: 480px) {
    min-width: 100%;
  }
`

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

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const Content: FC = () => {
  const [tokenId] = useRouteTokenId()
  const [attributes] = useAttributes()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    pollInterval: 20e3,
  })

  const attributesCount = useMemo<number>(() => {
    if (!attributes) return 0

    return Object.keys(attributes).filter((key) =>
      attributes[key as keyof Attributes].has(tokenId as number),
    ).length
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
                <AccountLink account={data.prime.owner.address} />
              </span>
            ) : (
              <span>Not minted.</span>
            )}
          </div>
          <div className="opensea">
            <a
              href={`https://opensea.io/assets/0xbda937f5c5f4efb2261b6fcd25a71a1c350fdf20/${tokenId}`}
            >
              View on OpenSea
            </a>
          </div>
        </div>
        {data?.prime && !data.prime.revealed && attributesCount > 1 && (
          <div className="reveal-attributes">
            <p>
              {tokenId} has {attributesCount} properties, but they
              are not yet stored immutably on the contract and do not
              appear on the artwork or on other platforms (e.g.
              OpenSea).
            </p>
            <p>
              You can reveal the properties so they appear on the
              artwork. This can be done at any time.
            </p>
            <RevealAttributesForm tokenId={tokenId} />
          </div>
        )}
        <PrimeDetailLists tokenId={tokenId} />
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
