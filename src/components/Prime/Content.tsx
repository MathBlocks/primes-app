import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { useAttributes } from '../App/PrimesContext'
import { getSVGDataURI } from '../PrimeSVG'
import { useRouteTokenId } from './Context'
import { Rental } from './Rental'

// Attributes
// [x] List
// [x] Icons for attributes
// [ ] Rarity for each attribute
// [ ] Prime factors
// [ ] Prime factor count
// [ ] Prime/composite/unit
// [ ] Twins
// [ ] Cousins
// [ ] Sexy primes
//
// On-chain stuff
// [x] Owner
// [-] Rental
//
// [ ] Breeding
//   [ ] lastBred
//   [ ] n breeds
//   [ ] Children
//   [ ] Forms!
//
// [ ] Other
//   [ ] OpenSea link

const Container = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: space-between;

  > :first-child {
    flex-basis: 60%;
    img {
      width: 100%;
      height: auto;
    }
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
    { key: string; name: string; symbol: string; fill: string }[]
  >(() => {
    if (!attributes) return []

    return Object.keys(attributes)
      .filter((key) =>
        attributes[key as keyof Attributes].has(tokenId as number),
      )
      .map((key) => {
        const [name, symbol, fill] = ATTRIBUTE_NAMES[key as keyof Attributes]
        return { key, name, symbol, fill }
      })
  }, [attributes, tokenId])

  return (
    <Container>
      <div>
        <img
          src={getSVGDataURI(tokenId as number, primeAttributes)}
          alt="Prime"
        />
        {/*<img src={data.prime.image} alt={tokenId} />*/}
      </div>

      <div>
        <div>
          <h1>Primes #{tokenId}</h1>
          <div>
            {tokenId > 1 && <Link to={`/primes/${tokenId - 1}`}>Previous</Link>}{' '}
            {tokenId < 16383 && <Link to={`/primes/${tokenId + 1}`}>Next</Link>}
          </div>
        </div>
        <div>
          <h3>Owner</h3>
          <div>{data?.prime?.owner.address ?? 'none'}</div>
        </div>
        <Rental />
        <div>
          <h3>Properties</h3>
          {primeAttributes.map(({ key, name, fill }) => (
            <div key={key} style={{ color: fill }}>
              {name}
            </div>
          ))}
        </div>
        {data?.prime?.primeFactors.length ? (
          <div>
            <h3>Prime Factors</h3>
            {data.prime.primeFactors.map(({ id }) => (
              <div key={id}>{id}</div>
            ))}
          </div>
        ) : null}
        {data?.prime?.twins.length ? (
          <div>
            <h3>Twins</h3>
            {data.prime.twins.map(({ id }) => (
              <div key={id}>{id}</div>
            ))}
          </div>
        ) : null}
        {data?.prime?.cousins.length ? (
          <div>
            <h3>Cousins</h3>
            {data.prime.cousins.map(({ id }) => (
              <div key={id}>{id}</div>
            ))}
          </div>
        ) : null}
        {data?.prime?.sexyPrimes.length ? (
          <div>
            <h3>Sexy Primes</h3>
            {data.prime.sexyPrimes.map(({ id }) => (
              <div key={id}>{id}</div>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  )
}
