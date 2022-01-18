import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
`

export const Home: FC = () => (
  <Container>
    <h1>Supporting Pioneers of Open Learning</h1>
    <p>
      We are MathBlocks, a{' '}
      <a href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization">
        Decentralized Autonomous Organization
      </a>{' '}
      (DAO) whose mission is to facilitate the creation of{' '}
      <a href="https://en.wikipedia.org/wiki/Open_educational_resources">
        open educational resources
      </a>{' '}
      for self-learning. That means we support creators (i.e.
      teachers) and open source software that they use to produce
      learning materials.
    </p>
    {/* <p>
      Our long-term vision is to create online-first institutions for
      permissionless and free learning.
    </p> */}
    <p>
      We raise funds by helping NFT artists to launch collections.
      Artists reserve part of their revenue from NFT sales for the
      DAO treasury, which is then used to support our mission.{' '}
      <Link to={`/dao`}>Learn more about this in the DAO page.</Link>
    </p>
    <p>
      MathBlocks DAO has launched Primes, the primary NFT collection
      which will be used to to govern itself:
    </p>

    <h3>
      Primes: a blockchain game that will span <u>decades</u>
    </h3>
    <p>
      The <b>MathBlocks Primes</b> NFT collection is a{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Long-term_experiment"
      >
        long-running experiment
      </a>{' '}
      involving math, art and game theory.
    </p>
    <p>
      Primes are immutable and{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum"
      >
        on-chain generated SVGs
      </a>{' '}
      running on Ethereum. 100% Solidity, no external dependencies on
      IPFS or any other 3rd parties.
    </p>
    <p>
      As long as Ethereum exists, Primes will also exist. Their
      simple design ensures that they will{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Lindy_effect"
      >
        withstand hundreds of years of cultural evolution
      </a>{' '}
      and be recognized by many generations to come:
    </p>
    <img src="/primes-13-demo.svg" alt="Prime 13 design" />
    <p>
      The Primes Collection will start with the first 1900 prime
      numbers 2,...,16381. There will only be 1900 Primes.
    </p>
    <p>
      Primes are equipped with a special power: they can "breed".
      That means they can be multiplied together, creating
      Composites:{'  '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Composite_number"
      >
        composite numbers
      </a>
      .
    </p>
    <img src="/prime-breeding-demo.svg" alt="Prime breeding demo" />
    <p>
      The artwork evolves with each new generation, that is, rows
      that correspond to prime factors are passed onto the child
      after breeding.
    </p>
    <p>
      The goal is to unlock all Composites up to 2¹⁴ = 16384. There
      can only be 14483 Composites, and these will get unlocked over
      the course of decades.
    </p>
    <p>
      Additional rules make the game more interesting and ensure that
      the Composite supply does not grow too fast:
    </p>
    <ul>
      <li>
        <b>Composites are unique:</b> It is not possible for more
        than one of the same Composite to exist at the same time.
      </li>
      <li>
        <b>Composites get burned</b> when they breed with a Prime or
        another Composite, e.g. when 2 and 6 breed, 6 gets burned and
        the owner receives 12. This keeps the supply the same.
      </li>
      <li>
        Similarly, if two Composites breed,{' '}
        <b>both of them get burned</b> and only the child remains.
        This deflates the supply.
      </li>
      <li>
        Primes can breed with themselves to produce their square,
        e.g. owner of 2 can directly obtain 4 through self-breeding.
        Composites cannot do this.
      </li>
      <li>
        <b>Breeding cooldown:</b> A Prime has to wait for 24 hours
        before it can breed again. Similarly, a Composite has to wait
        for 24 hours after it is born before it can breed.
      </li>
    </ul>
    <p>
      <b>Mathematical scarcity instead of artificial scarcity:</b>{' '}
      Primes and Composites will have traits that are derived from 23
      mathematical properties, e.g.{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Perfect_number"
      >
        perfect number
      </a>
      ,{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Fibonacci_number"
      >
        Fibonacci number
      </a>
      ,{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Polydivisible_number"
      >
        magic number
      </a>
      ,{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Taxicab_number"
      >
        taxicab number
      </a>
      , etc. with varying levels of rarity. Check out{' '}
      <a href="https://hackmd.io/@prism0x/primes#NFT-traits">
        Primes spec
      </a>{' '}
      for more details on traits.
    </p>
  </Container>
)
