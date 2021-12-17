import { FC } from 'react'
import styled from 'styled-components'
import { Redirect, useRouteMatch } from 'react-router'
import { NavLink } from 'react-router-dom'

import { PrimesSpiral } from './PrimesSpiral'
import { PrimesGallery } from './PrimesGallery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  height: 100%;

  > :first-child {
    display: flex;
    gap: 3rem;
    font-size: 1.2rem;
    justify-content: center;
    align-items: center;
    border-bottom: 1px #444 solid;
    padding-bottom: 1rem;
  }

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
        <NavLink to="/primes/gallery">Gallery</NavLink>
        <NavLink to="/primes/spiral">Ulam Spiral</NavLink>
      </div>
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
