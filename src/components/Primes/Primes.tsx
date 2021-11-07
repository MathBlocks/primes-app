import { FC } from 'react'
import styled from 'styled-components'
import SkeletonLoader from 'tiny-skeleton-loader-react'

import { PrimesPixi } from './PrimesPixi'
import { PrimesContext, useAttributes, useRouteTokenId } from './PrimesContext'
import { SelectedPrime } from './SelectedPrime'
import { PrimesOverlay } from './PrimesOverlay'
import { SelectedPrimeSidebar } from './SelectedPrimeSidebar'

// Name me
const Container = styled.div<{ hasPrime: boolean }>`
  position: relative;
  height: 100%;

  > :last-child {
    height: 100%;
  }

  > * {
    > :first-child {
      display: ${({ hasPrime }) => (hasPrime ? 'none' : 'block')};
    }
    > :last-child {
      display: ${({ hasPrime }) => (hasPrime ? 'block' : 'none')};
    }
  }
`

// Keep PrimesPixi rendered if possible
// (costs a fair chunk of memory, but much faster for navigating around)
const Content: FC = () => {
  const [attributes] = useAttributes()
  const [tokenId] = useRouteTokenId()

  return (
    <Container hasPrime={!!tokenId}>
      <div>
        <PrimesOverlay />
        <SelectedPrimeSidebar />
      </div>
      <div>
        {attributes ? <PrimesPixi /> : <SkeletonLoader />}
        <SelectedPrime />
      </div>
    </Container>
  )
}

export const Primes: FC = () => (
  <PrimesContext>
    <Content />
  </PrimesContext>
)
