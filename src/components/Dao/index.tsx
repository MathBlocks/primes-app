import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
`

export const Dao: FC = () => (
  <Container>
    <h1>MathBlocks DAO</h1>
    <p>
      We are a{' '}
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
    <p>
      We raise funds by helping NFT artists to launch collections.
      Artists reserve a portion of their revenue from NFT sales for
      the DAO treasury, which is then used to support our mission. We
      offer multiple options:
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
    <p>
      Our long-term vision is to create online-first institutions for
      permissionless and free learning.
    </p>

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
      ). Some creators lie in the middle, such as{' '}
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
      . Channels like these did not achieve massive success in a day.
      It's a long and arduous process, which might discourage
      talented individuals from attempting to start a career in mass
      tutoring. If you are a teacher who are trying to bootstrap a
      channel and would benefit from financial support, you can join
      our <a href="https://mathblocks.io/discord">Discord</a> and
      introduce yourself.
    </p>
    <h2>Team, Contributors and Advisors </h2>
    <ul>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/prism0x"
        >
          Prismo
        </a>{' '}
        (Founder)
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/JamesLefrere"
        >
          JL
        </a>{' '}
        (Contributor)
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/LeaFilipo"
        >
          Lea Filipo
        </a>{' '}
        (Designer)
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/alsco77"
        >
          alsco77
        </a>{' '}
        (Contributor)
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/sassal0x"
        >
          sassal
        </a>{' '}
        (Advisor)
      </li>
    </ul>
  </Container>
)
