import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { useInterval } from 'react-use'
import { formatEther } from 'ethers/lib/utils'
import styled from 'styled-components'
import {
  formatDistanceToNowStrict,
  formatRFC7231,
  fromUnixTime,
} from 'date-fns'

import {
  PrimeAuctionQueryResult,
  useAuctionStatusQuery,
  usePrimeAuctionQuery,
  usePrimeQuery,
} from '../../graphql/subgraph/subgraph'
import { getNowUnix } from '../../utils'
import { AccountLink } from '../AccountLink'
import { PrimeAuctionBidForm } from './PrimeAuctionBidForm'
import { PrimeDetailLists } from '../Prime/PrimeDetailLists'

const Bid: FC<{
  bid: {
    id: string
    sender: { id: string }
    timestamp: string
    value: string
  }
}> = ({ bid: { id, sender, timestamp, value } }) => (
  <div>
    <div>
      <h5>
        <AccountLink account={sender.id} />
      </h5>
      <div>{formatRFC7231(fromUnixTime(parseInt(timestamp)))}</div>
    </div>
    <div>
      <div className="monospace">{formatEther(value)} ETH</div>
    </div>
  </div>
)

const Content: FC<{ tokenId: string }> = ({ tokenId }) => {
  const {
    primeAuction: { bids, endTime: endTime_, winner, bidder },
  } = usePrimeAuctionQuery({
    variables: { id: tokenId },
    fetchPolicy: 'cache-and-network',
    pollInterval: 15e3,
  }).data as NonNullable<
    PrimeAuctionQueryResult['data'] & {
      primeAuction: NonNullable<
        NonNullable<PrimeAuctionQueryResult['data']>['primeAuction']
      >
    }
  >

  const auctionStatusQuery = useAuctionStatusQuery({
    pollInterval: 15e3,
  })
  const primesAuctionHouse =
    auctionStatusQuery.data?.primesAuctionHouses?.[0]

  const primeQuery = usePrimeQuery({
    variables: { tokenId: tokenId },
    pollInterval: 60e3,
  })

  const nowUnix = getNowUnix()
  const endTime = parseInt(endTime_)
  const [remaining, setRemaining] = useState<string>('–')

  useInterval(() => {
    const diff = endTime - nowUnix
    const unit =
      diff < 120 ? 'second' : diff < 3600 ? 'minute' : 'hour'
    setRemaining(
      formatDistanceToNowStrict(fromUnixTime(endTime), { unit }),
    )
  }, 1e3)

  return (
    <>
      <h2>Auction of Primes #{tokenId}</h2>
      <div className="bids current">
        <h4>Current bid</h4>
        <div>
          {bids.length === 0 ? (
            <div>No bids yet</div>
          ) : (
            <Bid bid={bids[0]} />
          )}
        </div>
      </div>
      <div className="prime">
        <div className="prime-image">
          <img
            src={primeQuery.data?.prime?.image ?? ''}
            alt={tokenId}
          />
        </div>
        <div className="prime-auction">
          {endTime > nowUnix && (
            <PrimeAuctionBidForm tokenId={parseInt(tokenId)} />
          )}
          <div>
            <div>
              <div className="auction-time">
                <div>
                  {endTime < nowUnix
                    ? 'Auction ended'
                    : 'Auction in progress'}
                </div>
                <div>
                  {endTime > nowUnix && `${remaining} remaining`}
                </div>
              </div>
            </div>
            <div className="items">
              <div>
                <h4>Auction rules</h4>
                <p>
                  The reserve price is{' '}
                  {formatEther(
                    primesAuctionHouse?.reservePrice ?? '0',
                  )}{' '}
                  ETH.
                </p>
                <p>
                  Each bid must be at least{' '}
                  {primesAuctionHouse?.minBidIncrementPercentage ??
                    '–'}
                  % higher than the previous bid.
                </p>
                <p>
                  The contract only keeps the current highest bid in
                  escrow. If somebody else bids higher than you, you
                  will be automatically refunded immediately.
                </p>
                <p>
                  The highest bidder wins when the auction ends (i.e.
                  a first price auction).
                </p>
              </div>
              {bidder && (
                <div>
                  <h4>Bidder</h4>
                  <p>
                    <AccountLink account={bidder.id} />
                  </p>
                </div>
              )}
              {winner && (
                <div>
                  <h4>Winner</h4>
                  <p>
                    <AccountLink account={winner.id} />
                  </p>
                </div>
              )}
            </div>
          </div>
          <PrimeDetailLists tokenId={parseInt(tokenId)} />
        </div>
      </div>
      {bids.length > 1 ? (
        <div className="bids previous">
          <h4>Previous bids</h4>
          <div>
            {bids.slice(1).map((bid) => (
              <Bid bid={bid} key={bid.id} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

const Container = styled.div`
  margin-bottom: 8rem;

  > .prime {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4rem;
    margin-bottom: 4rem;

    > :last-child {
      min-width: 20rem;
    }
  }

  .auction-time {
    margin-bottom: 2rem;
    > :first-child {
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .items {
    > div {
      margin-bottom: 2rem;
      h4 {
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      p {
        margin: 0 0 0.5rem 0;
      }
    }
  }

  .prime-image {
    border-radius: 0.75rem;
    border: 1px #444 solid;
    overflow: hidden;
    width: 100%;
    max-width: 512px;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .bids {
    margin-bottom: 2rem;
    h4 {
      padding-bottom: 1rem;
      border-bottom: 1px white solid;
      margin-bottom: 1rem;
    }

    h5 {
      font-size: 1.15rem;
      margin: 0;
    }

    > div {
      > div {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        padding: 1rem 0;
        border-bottom: 1px #444 solid;
        &:first-child {
          padding-top: 0;
        }
      }
    }
  }
`

export const PrimeAuction: FC = () => {
  const { primeId } = useParams<{ primeId?: string }>()

  const auctionQuery = usePrimeAuctionQuery({
    variables: { id: primeId as string },
    skip: !primeId,
    pollInterval: 20e3,
  })

  if (!primeId) {
    return <Container>No prime</Container>
  }

  return (
    <Container>
      {auctionQuery.data ? (
        <Content tokenId={primeId} />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  )
}
