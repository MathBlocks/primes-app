import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  .about {
  }
  .batches {
    > div {
      margin-bottom: 2rem;
    }
  }
`

export const Auction: FC = () => {
  return (
    <Container>
      <div className="about">
        <h2>Primes Auction</h2>
        <p>The auctions for Primes are split into three batches.</p>
      </div>
      <div className="batches">
        <div>
          <h3>
            <Link to="/auction/batch/0">
              0. Fermat's Last Choice
            </Link>
          </h3>
          <p>Mint a random Prime in this batch for a fixed price.</p>
          <p>
            For the first 12 hours, only whitelisted users can mint.
          </p>
          <div>
            <span className="monospace">4099...16831</span>
          </div>
          <div>
            <span className="monospace">1336</span> Primes
          </div>
          <div>
            <span className="monospace">0.05</span> ETH
          </div>
        </div>
        <div>
          <h3>
            <Link to="/auction/batch/1">
              1. Eratosthenes's Gold Sieve
            </Link>
          </h3>
          <p>Mint a random Prime in this batch for a fixed price.</p>
          <p>
            For the first 12 hours, only whitelisted users can mint.
          </p>
          <div>
            <span className="monospace">131...4093</span>
          </div>
          <div>
            <span className="monospace">533</span> Primes
          </div>
          <div>
            <span className="monospace">0.075</span> ETH
          </div>
        </div>
        <div>
          <h3>
            <Link to="/auction/batch/2">
              2. Gödel Escher Batch: An Eternal Golden Raid
            </Link>
          </h3>
          <p>
            Each Prime is auctioned off, starting with 127 and ending
            with 2.
          </p>
          <p>There is no whitelisting, and all bids are public.</p>
          <div>
            <span className="monospace">2...127</span>
          </div>
          <div>
            <span className="monospace">31</span> Primes
          </div>
          <div>
            Reserve price starting at{' '}
            <span className="monospace">X</span> ETH
          </div>
        </div>
      </div>
    </Container>
  )
}
