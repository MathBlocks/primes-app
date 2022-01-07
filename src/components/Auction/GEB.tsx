import styled from 'styled-components'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { formatEther } from 'ethers/lib/utils'
import { formatISO9075, fromUnixTime } from 'date-fns'

import { AccountLink } from '../AccountLink'
import {
  AllPrimeAuctionsQueryResult,
  useAllPrimeAuctionsQuery,
} from '../../graphql/subgraph/subgraph'

type PrimeAuctionData = NonNullable<
  AllPrimeAuctionsQueryResult['data']
>['primeAuctions'][number]

const GEBPrimeAuctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  border-top: 1px #777 solid;
  padding: 1rem 0;
  align-items: stretch;

  > div {
    &:first-child {
      display: flex;
      gap: 0.5rem;
      justify-content: space-between;
      font-size: 1.2rem;
    }
    &:last-child {
      > div {
        > :first-child {
          opacity: 0.6;
        }
        display: flex;
        gap: 0.5rem;
      }
    }
  }
  .prime {
    a {
      border-bottom: 0;
      display: flex;
      gap: 1rem;
      align-items: center;
      line-height: 1rem;
      font-size: 3rem;
      font-weight: bold;

      &:hover {
        color: orange;
      }

      span {
        display: block;
        &:first-child {
          border-radius: 0.5rem;
          overflow: hidden;
        }
        &:last-child {
          line-height: 100%;
          border-bottom: 1px white solid;
        }
      }
    }
    img {
      width: 6rem;
      height: auto;
      display: block;
    }
  }
`

const GEBPrimeAuction: FC<PrimeAuctionData> = ({
  id,
  settled,
  amount,
  startTime,
  endTime,
  bidder,
  winner,
  prime,
}) => {
  return (
    <GEBPrimeAuctionContainer key={id}>
      <div>
        <div className="prime">
          <Link
            className="monospace"
            to={`/auction/batch/2/${prime.id}`}
          >
            <span>
              <img src={prime.image} alt={prime.id} />
            </span>
            <span>{prime.id}</span>
          </Link>
        </div>
        <div className="amount monospace">
          {formatEther(parseInt(amount ?? '0'))} ETH
        </div>
      </div>
      <div>
        {settled ? <div>Settled</div> : null}
        <div className="time">
          <div>Duration</div>
          <div>
            {formatISO9075(fromUnixTime(parseInt(startTime)))} to{' '}
            {formatISO9075(fromUnixTime(parseInt(endTime)))}
          </div>
        </div>
        {bidder && (
          <div className="bidder">
            <div>Bidder</div>
            <div>
              <AccountLink account={bidder.id} />
            </div>
          </div>
        )}
        {winner && (
          <div className="winner">
            <div>Winner</div>
            <div>
              <AccountLink account={winner.id} />
            </div>
          </div>
        )}
      </div>
    </GEBPrimeAuctionContainer>
  )
}

export const GEBBatch: FC = () => {
  const allPrimeAuctionsQuery = useAllPrimeAuctionsQuery({
    pollInterval: 60e3,
  })
  const items = allPrimeAuctionsQuery.data?.primeAuctions ?? []

  return (
    <div>
      {items.map(GEBPrimeAuction)}
      {items.length < 32 && <div>More auctions to come...</div>}
    </div>
  )
}
