import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
`

export const Contests: FC = () => (
  <Container>
    <h1>Math Contests</h1>

  </Container>
)
