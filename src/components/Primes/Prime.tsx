import { FC, useMemo } from 'react'
import styled from 'styled-components'
import SkeletonLoader from 'tiny-skeleton-loader-react'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES } from '../../attributes'
import { getSVGDataURI } from '../PrimeSVG'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`

export const Prime: FC<{ tokenId: number }> = ({ tokenId }) => {
  const { data } = usePrimeQuery({ variables: { tokenId: tokenId.toString() } })

  const attributes = useMemo<
    { key: string; name: string; symbol: string }[]
  >(() => {
    if (!data?.prime) return []

    return Object.keys(data.prime)
      .filter(
        (key) =>
          Object.prototype.hasOwnProperty.call(ATTRIBUTE_NAMES, key) &&
          data.prime &&
          (data.prime[key as keyof typeof data['prime']] as Boolean),
      )
      .map((key) => ({
        key,
        name: ATTRIBUTE_NAMES[key as keyof typeof ATTRIBUTE_NAMES][0],
        symbol: ATTRIBUTE_NAMES[key as keyof typeof ATTRIBUTE_NAMES][1],
      }))
  }, [data])

  return (
    <Container>
      <h1>{tokenId}</h1>
      <div>
        {data?.prime ? (
          <>
            <div>
              <div>Owner</div>
              <div>{data.prime.owner.address}</div>
            </div>
            <div>
              <img height="512" width="512" src={getSVGDataURI(tokenId)} />
              {/*<img src={data.prime.image} alt={tokenId} />*/}
            </div>
            <ul>
              {attributes.map(({ key, name }) => (
                <li key={key}>{name}</li>
              ))}
            </ul>
          </>
        ) : (
          <SkeletonLoader />
        )}
      </div>
    </Container>
  )
}
