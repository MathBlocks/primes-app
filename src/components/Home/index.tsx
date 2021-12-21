import { FC } from 'react'

import { useAuctionStatusQuery } from '../../graphql/subgraph/subgraph'

const AuctionStatus: FC = () => {
  const query = useAuctionStatusQuery({
    // pollInterval: 30e3
  })
  const auctionHouse = query.data?.primesAuctionHouses[0]
  const currentPrimeAuction = auctionHouse?.currentPrimeAuction
  // const primeBatches = query.data?.primeBatches

  return (
    <div>
      <h3>Auction</h3>
      {currentPrimeAuction && (
        <div>
          <h4>Current auction: {currentPrimeAuction.id}</h4>
          <div>
            {currentPrimeAuction.settled
              ? 'Settled'
              : currentPrimeAuction.endTime}
          </div>
        </div>
      )}
      {/*{primeBatches?.map((pb) => (*/}
      {/*  <div key={pb.id}>*/}
      {/*    <div>Batch: {pb.id}</div>*/}
      {/*    <div>Remaining: {pb.remaining}</div>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  )
}

export const Home: FC = () => (
  <div>
    <AuctionStatus />
  </div>
)
