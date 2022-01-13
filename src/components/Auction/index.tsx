import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../theme'
import { useAuctionStatusQuery } from '../../graphql/subgraph/subgraph'

const Container = styled.div`
  .about {
  }
  .active-batch {
    padding: 1rem 0 2rem 0;
    font-size: 1.5rem;
  }
  .batches {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    > div {
      max-width: 20rem;
      margin-bottom: 2rem;
      background-color: ${theme.grey[0]};
      ${theme.dropShadow2};
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px transparent solid;

      display: flex;
      justify-content: space-between;
      flex-direction: column;

      cursor: pointer;

      &.active {
        border-color: ${theme.purple};
      }

      &:hover {
        border-color: white;
      }

      h2 {
        font-size: 1rem;
      }

      .details {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        align-items: flex-end;
      }
      button {
        font-size: 0.9rem;
        a {
          color: white;
        }
        border: 1px white solid;
        height: 1.5rem;
        line-height: 100%;
        background-color: black;
        &:hover {
          a {
            color: black;
          }
          border-color: white;
          background: white;
        }
      }
    }

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
`

export const Auction: FC = () => {
  const auctionStatusQuery = useAuctionStatusQuery()
  const activeBatchId = auctionStatusQuery.data?.primeBatches?.find(
    (p) => p.active,
  )?.id
  return (
    <Container>
      <div className="about">
        <h2>Primes Auction</h2>
        <p>The auctions for Primes are split into three batches.</p>
      </div>
      <div className="active-batch">
        Current sale:{' '}
        {activeBatchId === '0'
          ? `Fermat's Last Choice`
          : activeBatchId === '1'
          ? `Erasthosthenes's Golden Sieve`
          : `Gödel Escher Batch: An Eternal Golden Raid`}
      </div>
      <div className="batches">
        <div className={activeBatchId === '0' ? 'active' : ''}>
          <div>
            <h3>
              <Link to="/primes/auction/batch/0">
                0. Fermat's Last Choice
              </Link>
            </h3>
            <p>
              Mint a random Prime in this batch for a fixed price.
            </p>
            <p>
              For the first 24 hours, only whitelisted users can
              mint.
            </p>
          </div>
          <div className="details">
            <div>
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
            <button>
              <Link to="/primes/auction/batch/0">Go to auction</Link>
            </button>
          </div>
        </div>
        <div className={activeBatchId === '1' ? 'active' : ''}>
          <div>
            <h3>
              <Link to="/primes/auction/batch/1">
                1. Eratosthenes's Gold Sieve
              </Link>
            </h3>
            <p>
              Mint a random Prime in this batch for a fixed price.
            </p>
            <p>
              For the first 24 hours, only whitelisted users can
              mint.
            </p>
          </div>
          <div className="details">
            <div>
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
            <button>
              <Link to="/primes/auction/batch/1">Go to auction</Link>
            </button>
          </div>
        </div>
        <div className={activeBatchId === '2' ? 'active' : ''}>
          <div>
            <h3>
              <Link to="/primes/auction/batch/2">
                2. Gödel Escher Batch: An Eternal Golden Raid
              </Link>
            </h3>
            <p>
              Each Prime is auctioned off, starting with 127 and
              ending with 2.
            </p>
            <p>There is no whitelisting, and all bids are public.</p>
          </div>
          <div className="details">
            <div>
              <div>
                <span className="monospace">2...127</span>
              </div>
              <div>
                <span className="monospace">31</span> Primes
              </div>
              <div>
                Reserve <span className="monospace">0.1</span> ETH
              </div>
            </div>
            <button>
              <Link to="/primes/auction/batch/2">Go to auction</Link>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
