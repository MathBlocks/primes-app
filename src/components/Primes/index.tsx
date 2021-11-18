import { FC } from 'react'
import styled from 'styled-components'

import { Spiral } from './Spiral'
import { Overlay } from './Overlay'

const Container = styled.div`
  position: relative;
  height: 100%;
`

export const Primes: FC = () => (
  <Container>
    <Overlay />
    <Spiral />
  </Container>
)
