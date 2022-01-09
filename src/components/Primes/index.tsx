import { FC } from 'react'
import styled from 'styled-components'
import { Redirect, useRouteMatch } from 'react-router'

import { PrimesSpiral } from './PrimesSpiral'
import { PrimesGallery } from './PrimesGallery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  height: 100%;

  > :last-child {
    height: 100%;
  }
`

export const Primes: FC = () => {
  const matchSpiral = useRouteMatch('/primes/spiral')
  const matchGallery = useRouteMatch('/primes/gallery')
  return (
    <Container>
      <div>
        {!!matchSpiral ? (
          <PrimesSpiral />
        ) : !!matchGallery ? (
          <PrimesGallery />
        ) : (
          <Redirect to="/primes/gallery" />
        )}
      </div>
    </Container>
  )
}
