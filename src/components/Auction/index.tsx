import { FC } from 'react'
import { Route } from 'react-router-dom'

import { AuctionIndex } from './AuctionIndex'
import { BatchAuction } from './BatchAuction'
import { PrimeAuction } from './PrimeAuction'

export const AuctionRoutes: FC = () => (
  <>
    <Route path="/auction" exact>
      <AuctionIndex />
    </Route>
    <Route path="/auction/batch/:batchId" exact>
      <BatchAuction />
    </Route>
    <Route path="/auction/batch/2/:primeId" exact>
      <PrimeAuction />
    </Route>
  </>
)
