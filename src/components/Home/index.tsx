import { FC } from 'react'
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
      <a href="https://hackmd.io/@prism0x/primes#NFT-traits">Primes spec</a> for
      more details on traits.
    </p>
    <h3>About MathBlocks</h3>
    <p>
      We are a{' '}
      <a href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization">
        Decentralized Autonomous Organization
      </a>{' '}
      (DAO) whose mission is to facilitate the creation of{' '}
      <a href="https://en.wikipedia.org/wiki/Open_educational_resources">
        open educational resources
      </a>{' '}
      for self-learning by financially supporting creators (i.e.
      teachers) and open source software that they use to create.
    </p>
    <p>
      Our long-term vision is to create online-first institutions for
      permissionless and free learning.
    </p>
    <p>
      We aim to achieve our mission by helping NFT artists to launch
      collections. The artists donate some of their revenue from NFT
      sales to the DAO treasury, which is then used to support our
      mission. We offer multiple options:
    </p>
    <ul>
      <li>
        Designate a subset of NFTs from an existing or a new
        collection which will be curated by MathBlocks, and 100% of
        sale and/or resale fees from designated NFTs get donated to
        the DAO Treasury.
      </li>
      <li>
        Designate an entire collection for which a smaller percentage
        of sale and/or resale fees are donated to the DAO treasury.
        The collection then gets promoted by MathBlocks.
      </li>
      <li>
        Or propose a new arrangement as long as it advances our
        mission in an altruistic way.
      </li>
    </ul>
    <h4>Primes as governance tokens</h4>
    <p>
      Primes are used to govern MathBlocks DAO, namely vote in
      MathBlocks DAO Proposals (MDPs). All Primes have equal voting
      power.
    </p>
    <p>
      Composites cannot be used to vote on MDPs, as they could be
      minted readily by the owners of smaller Primes and used to
      manipulate the decision making process.
    </p>
    <h4>Beneficiaries</h4>
    <p>
      As stated before, MathBlocks DAO facilitates the creation of
      free self-learning materials, i.e.{' '}
      <a href="https://en.wikipedia.org/wiki/Open_educational_resources">
        open educational resources
      </a>{' '}
      (OERs) by supporting creators and software that they use to
      create.
    </p>
    <p>
      OERs take many forms: videos of lectures, open source books,
      lecture notes, problem sets and so on.
    </p>
    <p>
      Take math OERs on Youtube for example. These exist on a wide
      spectrum that varies from entertainment/curiosity arousal (e.g.{' '}
      <a href="https://www.youtube.com/channel/UCoxcjq-8xIDTYp3uz647V5A">
        Numberphile
      </a>
      ,{' '}
      <a href="https://www.youtube.com/user/standupmaths">
        Standup Maths
      </a>
      ) to pure formal education (e.g.{' '}
      <a href="https://www.khanacademy.org/">KhanAcademy</a>,{' '}
      <a href="https://www.youtube.com/channel/UC_SvYP0k05UKiJ_2ndB02IA">
        Blackpenredpen
      </a>
      ). Then there are some creators who lie in the middle, such as{' '}
      <a href="https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw">
        3blue1brown
      </a>
      .
    </p>
    <p>
      More STEM YouTubers with a relatively high following:{' '}
      <a href="https://www.youtube.com/channel/UCpCSAcbqs-sjEVfk_hMfY9w">
        Zach Star
      </a>
      ,{' '}
      <a href="https://www.youtube.com/c/papaflammy/about">
        Flammable Maths
      </a>
      ,{' '}
      <a href="https://www.youtube.com/channel/UC_SvYP0k05UKiJ_2ndB02IA">
        Blackpenredpen
      </a>
      ,{' '}
      <a href="https://www.youtube.com/c/TheMathSorcerer/">
        The Math Sorcerer
      </a>
      ,{' '}
      <a href="https://www.youtube.com/channel/UCRGXV1QlxZ8aucmE45tRx8w">
        NancyPi
      </a>
      ,{' '}
      <a href="https://www.youtube.com/channel/UCoOjTxz-u5zU0W38zMkQIFw">
        Dr Peyam
      </a>
      ,{' '}
      <a href="https://www.youtube.com/channel/UCJ0yBou72Lz9fqeMXh9mkog">
        Eugene Khutoryansky
      </a>
      .
    </p>
    <p>
      If you are a teacher who are trying to bootstrap a channel and
      would benefit from financial support, you can join our{' '}
      <a href="https://discord.gg/mathblocks">Discord</a> and
      introduce yourself.
    </p>
  </Container>
)
