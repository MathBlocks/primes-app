import { FC } from 'react'
import Latex from 'react-latex-next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 65ch;
  margin: 0 auto;

  p {
    line-height: 1.5rem;
  }
  th {
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
  }
  td {
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
  }
  .center {
    margin-left: auto;
    margin-right: auto;
  }
  .sale-text {
    text-align: center;
    font-size: 120%;
    margin-top: 2em;
    margin-bottom: 2em;
  }
  #trait-table {
    margin-top: 1em;
    margin-bottom: 1em;
    img {
      width: 2em;
    }
    td {
      padding-top: 2px;
    }
  }
  #shadowBox {
      background-color: rgb(0, 0, 0);
      /* Fallback color */
      background-color: rgba(0, 0, 0, 0.2);
      /* Black w/opacity/see-through */
      border: 3px solid;
  }

  .rainbow {
      // text-align: center;
      text-decoration: underline;
      // font-size: 32px;
      // font-family: monospace;
      // letter-spacing: 5px;
  }
  .rainbow:hover {
    background: linear-gradient(to right, #bfdcf4, #f4c2c2, #f4e7b2, #b5e6cc, #cfc9e2);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: rainbow_animation 6s ease-in-out infinite;
    background-size: 400% 100%;
  }
  .rainbow_text_animated {
      // background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
      background: linear-gradient(to right, #4d9de0, #e15554, #e1bc29, #3bb273, #7768ae);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: rainbow_animation 6s ease-in-out infinite;
      background-size: 400% 100%;
  }

  @keyframes rainbow_animation {
      0%,100% {
          background-position: 0 0;
      }

      50% {
          background-position: 100% 0;
      }
  }
`

export const Home: FC = () => (
  <Container>
    <h1>Supporting Pioneers of Open Learning</h1>
    <p>
      We are MathBlocks, a community whose mission is to facilitate
      the creation of{' '}
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
      Artists donate a portion of their revenue from NFT sales to the
      MathBlocks Treasury, which is then used to support our mission.{' '}
      <Link to={`/community`}>
        Learn more in the Community page.
      </Link>
    </p>
    <p>
      MathBlocks has launched Primes, its primary NFT collection.
      Primes will be used by community members to vote on proposals,
      i.e. govern the community.
    </p>
    <div className="sale-text ">
      <a href="http://localhost:3000/primes/auction/batch/0" className="rainbow rainbow_text_animated">
        Primes Public Sale has begun. Click here to mint.
      </a>
    </div>

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
      The Primes Collection started with the first 1900 prime
      numbers: 2,...,16381. There will only be 1900 Primes.
    </p>
    <p>
      Primes are equipped with a special power: they can
      &ldquo;breed&rdquo;. That means they can be multiplied
      together, creating Composites:{'  '}
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
      can only be 14482 Composites, and these will get unlocked over
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
    <h4>Mathematical scarcity instead of artificial scarcity</h4>
    <p>
      Primes and Composites have traits that are derived from 23
      mathematical properties from number theory, e.g.{' '}
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
      , etc. with varying levels of rarity. You can see how many
      times these properties come up for numbers 1, ..., 16384:
    </p>

    <table id="trait-table" className="center">
      <thead>
        <tr>
          <th>Property/Trait</th>
          <th># of occurrences</th>
          <th>Symbol</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Taxicab_number"
            >
              Taxicab*
            </a>
          </td>
          <td>3</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/taxicab.svg"
              style={{ width: '2em' }}
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Perfect_number"
            >
              Perfect
            </a>
          </td>
          <td>4</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/perfect.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Lucky_numbers_of_Euler"
            >
              Euler&#39;s Lucky Number
            </a>
          </td>
          <td>6</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/euler.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Unique_prime_number"
            >
              Unique Prime
            </a>
          </td>
          <td>6</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/unique_prime.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Colossally_abundant_number"
            >
              Colossally Abundant
            </a>
          </td>
          <td>8</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/colossally_abundant.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Fibonacci_number"
            >
              Fibonacci
            </a>
          </td>
          <td>21</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/fibonacci.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Weird_number"
            >
              Weird
            </a>
          </td>
          <td>25</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/weird.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Repdigit"
            >
              Repdigit
            </a>
          </td>
          <td>38</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/repdigit.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Friendly_number"
            >
              Friendly
            </a>
          </td>
          <td>55</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/friendly.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Triangular_number"
            >
              Triangular
            </a>
          </td>
          <td>181</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/triangular.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Safe_and_Sophie_Germain_primes"
            >
              Sophie-Germain Prime
            </a>
          </td>
          <td>281</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/sophie_germain.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Strong_prime"
            >
              Strong Prime
            </a>
          </td>
          <td>881</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/strong_prime.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Frugal_number"
            >
              Frugal
            </a>
          </td>
          <td>138</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/frugal.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Square_number"
            >
              Square
            </a>
          </td>
          <td>129</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/square.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Emirp"
            >
              Emirp
            </a>
          </td>
          <td>496</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/emirp.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Polydivisible_number"
            >
              Magic
            </a>
          </td>
          <td>636</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/magic.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Good_prime"
            >
              Good Prime
            </a>
          </td>
          <td>982</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/good_prime.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Lucky_number"
            >
              Lucky
            </a>
          </td>
          <td>1732</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/lucky.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Happy_number"
            >
              Happy
            </a>
          </td>
          <td>2503</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/happy.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Untouchable_number"
            >
              Untouchable
            </a>
          </td>
          <td>2064</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/untouchable.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Semiperfect_number"
            >
              Semiperfect
            </a>
          </td>
          <td>4041</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/semiperfect.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Harshad_number"
            >
              Harshad
            </a>
          </td>
          <td>2549</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/harshad.svg"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Evil_number"
            >
              Evil
            </a>
          </td>
          <td>8192</td>
          <td>
            <img
              src="https://raw.githubusercontent.com/prism0x/primes-artwork/master/trait-symbols/white/evil.svg"
              alt=""
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            *Sloane's definition from{' '}
            <a href="https://oeis.org/A001235">OEIS A001325</a>.
          </td>
        </tr>
      </tfoot>
    </table>
    <p>
      You can see which traits your Prime or Composite <code>X</code>{' '}
      has on its own page <code>https://mathblocks.io/primes/X</code>
      , or you can view your NFTs by clicking your address on the top
      right, and then clicking "My Account". Check out the{' '}
      <a href="https://hackmd.io/@prism0x/primes#NFT-traits">
        Primes spec
      </a>{' '}
      for more details on traits.
    </p>
    <p>
      Traits do not show up on the artwork right away after minting
      and need to be &ldquo;revealed&rdquo;, i.e. submitted on-chain
      for them to be stored permanently on Ethereum. That is because
      it is very costly to store the data for all numbers on
      Ethereum, and it is better for us to distribute those costs
      among NFT owners.
    </p>

    <h4>Breeding opportunities</h4>
    <p>
      Whereas Composites get burned when they breed, Primes will have
      the opportunity to breed many, many times over the course of
      decades. The value of the Prime will influence how many times
      it can breed—the smaller its value, the more it can breed. It
      is not possible for anyone to predict exactly how many times a
      Prime will breed on the way to unlocking all composites.{' '}
    </p>
    <p>
      Nevertheless, we can calculate a range, i.e. a minimum and a
      maximum number of times a Prime can breed, assuming that nobody
      loses access to their Prime and all 14483 Composites eventually
      get minted.
    </p>

    <table className="center">
      <thead>
        <tr>
          <th>Batch</th>
          <th>Prime</th>
          <th>
            Minimum number of
            <br /> breeding opportunities
          </th>
          <th>
            Maximum number of
            <br /> breeding opportunities
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GEB</td>
          <td>2</td>
          <td>3331</td>
          <td>16383</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>3</td>
          <td>1414</td>
          <td>8191</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>5</td>
          <td>672</td>
          <td>4095</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>7</td>
          <td>449</td>
          <td>2729</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>11</td>
          <td>279</td>
          <td>1637</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>13</td>
          <td>237</td>
          <td>1364</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>17</td>
          <td>182</td>
          <td>1023</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>19</td>
          <td>165</td>
          <td>909</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>23</td>
          <td>137</td>
          <td>743</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>29</td>
          <td>111</td>
          <td>584</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>31</td>
          <td>106</td>
          <td>545</td>
        </tr>
        <tr>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
        </tr>
        <tr>
          <td>GEB</td>
          <td>127</td>
          <td>31</td>
          <td>129</td>
        </tr>
        <tr>
          <td>EGS</td>
          <td>131</td>
          <td>30</td>
          <td>125</td>
        </tr>
        <tr>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
        </tr>
        <tr>
          <td>EGS</td>
          <td>4093</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>FLC</td>
          <td>4099</td>
          <td>2</td>
          <td>2</td>
        </tr>
        <tr>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
        </tr>
        <tr>
          <td>FLC</td>
          <td>8191</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>FLC</td>
          <td>8209</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
          <td>⁞</td>
        </tr>
        <tr>
          <td>FLC</td>
          <td>16381</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    <p>
      Check out the{' '}
      <a href="https://hackmd.io/@prism0x/primes#Breeding-and-rental-value">
        Primes spec
      </a>{' '}
      to find out how we computed these numbers. For a Prime to
      produce thousands of Composites means that it is that many
      times more valuable than the least valuable NFT in the
      collection.
    </p>
    <p>
      However, one should also consider 3 factors when valuing
      Primes: time discounting caused by the breeding cooldown (i.e.
      breeding can happen at minimum 24 hour intervals, and only if
      there is an opportunity to breed), appreciation of the overall
      collection, and the inflation of the supply due to new
      Composites over the decades. We will publish a more detailed
      way of valuing Primes soon.
    </p>

    {/* <h4>Valuing Primes and Composites</h4>
    <p>
      Items from the Primes collection will be valued according to a
      combination of 6 different factors
    </p>
    <Latex>
      {`$$\\begin{gather*}
\\text{Prime or Composite Value}
\\\\=
\\\\\\text{Breeding value (for Primes)}
\\\\+
\\\\\\text{Burn value (for Composites)}
\\\\+
\\\\\\text{Meme value}
\\\\+
\\\\\\text{Lindy value}
\\\\+
\\\\\\text{Rarity value}
\\\\+
\\\\\\text{Governance value}
\\end{gather*}$$`}
    </Latex> */}
  </Container>
)
