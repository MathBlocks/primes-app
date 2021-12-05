import { FC } from 'react'
import { useParams } from 'react-router'
import { formatEther } from 'ethers/lib/utils'
import styled from 'styled-components'
import {
  formatDistanceToNow,
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

const Container = styled.div`
  > :first-child {
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
        margin-bottom: 0;
        font-size: 1rem;
      }
      p {
        margin: 0;
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

const nowUnix = getNowUnix()

const Content: FC<{ tokenId: string }> = ({ tokenId }) => {
  const {
    primeAuction: {
      amount = '0',
      bids,
      endTime: endTime_,
      startTime: startTime_,
      winner,
      bidder,
    },
  } = usePrimeAuctionQuery({
    variables: { id: tokenId },
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'cache-only',
    pollInterval: 30e3,
  }).data as NonNullable<
    PrimeAuctionQueryResult['data'] & {
      primeAuction: NonNullable<
        NonNullable<PrimeAuctionQueryResult['data']>['primeAuction']
      >
    }
  >

  const auctionStatusQuery = useAuctionStatusQuery()
  const primesAuctionHouse =
    auctionStatusQuery.data?.primesAuctionHouses?.[0]

  const primeQuery = usePrimeQuery({
    variables: { tokenId: tokenId },
  })

  const startTime = parseInt(startTime_)
  const endTime = parseInt(endTime_)

  return (
    <>
      <div>
        <div className="prime-image">
          <img
            src={primeQuery.data?.prime?.image ?? ''}
            alt={tokenId}
          />
        </div>
        <div className="prime-auction">
          <div>
            <div>
              <h2>Prime #{tokenId}</h2>
              <div className="auction-time">
                <div>
                  {endTime < nowUnix
                    ? 'Auction ended'
                    : startTime < nowUnix
                    ? 'Auction in progress'
                    : 'Auction not started'}
                </div>
                <div>
                  {endTime > nowUnix
                    ? `${formatDistanceToNow(
                        fromUnixTime(
                          startTime < nowUnix ? endTime : startTime,
                        ),
                      )} remaining`
                    : ''}
                </div>
              </div>
            </div>
            <div className="items">
              <div>
                <h4>Current bid</h4>
                <p className="monospace">
                  {amount ? formatEther(amount) : '-'} ETH
                </p>
              </div>
              <div>
                <h4>Reserve price</h4>
                <p className="monospace">
                  {formatEther(
                    primesAuctionHouse?.reservePrice ?? '0',
                  )}{' '}
                  ETH
                </p>
              </div>
              <div>
                <h4>Minimum bid increment</h4>
                <p>
                  {primesAuctionHouse?.minBidIncrementPercentage ??
                    '-'}
                  %
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
          <PrimeAuctionBidForm tokenId={parseInt(tokenId)} />
        </div>
      </div>
      <div className="bids">
        <h4>Bids</h4>
        <div>
          {bids.map(({ value, id, sender, timestamp }) => (
            <div key={id}>
              <div>
                <h5>
                  <AccountLink account={sender.id} />
                </h5>
                <div>
                  {formatRFC7231(fromUnixTime(parseInt(timestamp)))}
                </div>
              </div>
              <div>
                <div className="monospace">
                  {formatEther(value)} ETH
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const PrimeAuction: FC = () => {
  const { primeId } = useParams<{ primeId?: string }>()

  const auctionQuery = usePrimeAuctionQuery({
    variables: { id: primeId as string },
    skip: !primeId,
    pollInterval: 30e3,
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
