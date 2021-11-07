import { FC, useMemo } from 'react'
import styled from 'styled-components'
import SkeletonLoader from 'tiny-skeleton-loader-react'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { getSVGDataURI } from '../PrimeSVG'
import { useRouteTokenId } from './PrimesContext'

const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`

export const SelectedPrime: FC = () => {
  const [tokenId] = useRouteTokenId()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId?.toString() as string },
    skip: !tokenId,
  })

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
        name: ATTRIBUTE_NAMES[key as keyof Attributes][0],
        symbol: ATTRIBUTE_NAMES[key as keyof Attributes][1],
      }))
  }, [data])

  return tokenId ? (
    <Container>
      <h1>{tokenId}</h1>
      <div>
        <>
          <div>
            <div>Owner</div>
            <div>{data?.prime?.owner.address}</div>
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
      </div>
    </Container>
  ) : (
    <Container>Prime not found</Container>
  )
}
