import { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
  table {
  }
`

export const Contests: FC = () => (
  <Container>
    <h1>Math Contests</h1>
    <p>
      We organize math contests periodically to keep our community
      engaged and enthusiastic about learning new topics.
    </p>
    <h2>Proof of Math</h2>
    <p>
      A weekly math challenge with prizes that involves{' '}
      <a href="https://projecteuler.net/">Project Euler</a> style
      questions: require more than mathematical insight, i.e.
      programming, to solve. Similar to Project Euler, we will try to
      keep a “one-minute rule”, that is, an efficient implementation
      will allow a solution to be obtained on a modestly powered
      computer in less than one minute.
    </p>
    <ul>
      <li>Round 1 — Upcoming, Feb 5, 2022 — 14:00 UTC</li>
    </ul>
    <p>
      Join our <a href="https://mathblocks.io/discord">Discord</a>{' '}
      and follow our{' '}
      <a href="https://twitter.com/mathblocks_io">Twitter</a> to get
      notified when the contests begin.
    </p>
    <h2>Primes Whitelist Test</h2>
    <p>
      The Primes Whitelist test took place between Dec 3-5 2021, and
      consisted of 8 questions with varying difficulties.{' '}
      <Link to="/contests/wltest">Click here to learn more.</Link>
    </p>
  </Container>
)
