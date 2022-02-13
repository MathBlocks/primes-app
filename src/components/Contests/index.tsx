import { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
  h5 {
    font-size: 100%;
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
      A biweekly math challenge with prizes that involves{' '}
      <a href="https://projecteuler.net/">Project Euler</a> style
      questions: require more than mathematical insight, i.e.
      programming, to solve. Similar to Project Euler, we will try to
      keep a “one-minute rule”, that is, an efficient implementation
      will allow a solution to be obtained on a modestly powered
      computer in less than one minute.
    </p>
    <h4>Round 1 — Feb 5—7, 2022</h4>
    <p>
      <a href="https://hackmd.io/@prism0x/pom-r1">Click here</a> to
      see the problems.{' '}
      <a href="https://hackmd.io/@prism0x/pom-r1-tr">Click here</a>{' '}
      for a Turkish translation.
    </p>
    <h5>Winners</h5>
    <p>
      🥇 thisisanameforsure#5293 (Prize: 0.15 ETH)
      <br />
      🥈 polynomaly#2148 (Prize: 0.1 ETH)
    </p>
    <h5>Close calls</h5>
    <p>
      Harchy33#4681
      <br />
      steppered#5847
      <br />
      leecher.eth#6265
    </p>
    <h5>Honorable mentions</h5>
    <p>
      BorinhoTeslax#5317
      <br />
      DFGrasped#9323
    </p>

    <h4>Round 2 — Feb 19—21, 2022</h4>
    <p>Upcoming.</p>
    <p>
      Join our <a href="https://mathblocks.io/discord">Discord</a>{' '}
      and follow us on{' '}
      <a href="https://twitter.com/mathblocks_io">Twitter</a> to get
      notified when the challenges begin.
    </p>

    <h2>Challenge of the Day (CotD)</h2>
    <p>
      MathBlocks organizes a daily version of Proof of Math called
      Challenge of the Day, which is intended to be easier and
      solvable during the day.
    </p>
    <p>
      Although CotD does not have cash prizes, participants can
      receive points for solving and get featured in a leaderboard.
      This is a work in progress, stay tuned.
    </p>
    <p>
      Join our <a href="https://mathblocks.io/discord">Discord</a>{' '}
      and head over to the #challenge-of-the-day channel to
      participate.
    </p>

    <h2>Primes Whitelist Test</h2>
    <p>
      The Primes Whitelist test took place between Dec 3-5 2021, and
      consisted of 8 questions with varying difficulties.{' '}
      <Link to="/contests/wltest">Click here to learn more.</Link>
    </p>
  </Container>
)
