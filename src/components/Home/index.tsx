import { FC } from 'react'

export const Home: FC = () => (
  <div>
    <h1>
      Primes: a blockchain game that will span <u>decades</u>
    </h1>
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
        withstand hundreds of years of of cultural evolution
      </a>{' '}
      and be recognized by many generations to come:
    </p>
    <img
      src="/primes-13-demo.svg"
      alt="Prime 13 design"
      width="70%"
    />
    <p>
      The Primes Collection will start with the first 1900 prime
      numbers 2,...,16381. There will only be 1900 Primes.
    </p>
    <p>
      Primes are equipped with a special power: they can "breed".
      That means they can be multiplied together, creating
      Composites, i.e.{' '}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://en.wikipedia.org/wiki/Composite_number"
      >
        composite numbers
      </a>
      .
    </p>
    <img
      src="/prime-breeding-demo.svg"
      alt="Prime breeding demo"
      width="70%"
    />
    <p>
      The artwork evolves with each new generation, i.e. rows that
      correspond to prime factors are passed onto the children after
      breeding.
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
        href="https://en.wikipedia.org/wiki/Magic_number"
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
      , etc.
    </p>
  </div>
)
