import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../Home'
import { Prime } from '../Prime'
import { Primes } from '../Primes'
import { Account } from '../Account'
import { Breeding } from '../Breeding'
import { Auction } from '../Auction'
import { BatchAuction } from '../Auction/BatchAuction'
import { PrimeAuction } from '../Auction/PrimeAuction'
import { Playground } from '../Playground'

export const AppRoutes: FC = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/primes" exact>
      <Primes />
    </Route>
    <Route path="/primes/spiral" exact>
      <Primes />
    </Route>
    <Route path="/primes/gallery" exact>
      <Primes />
    </Route>
    <Route path="/primes/:tokenId" exact>
      <Prime />
    </Route>
    <Route path="/breed" exact>
      <Breeding />
    </Route>
    <Route path="/account/:account?" exact>
      <Account />
    </Route>
    <Route path="/auction" exact>
      <Auction />
    </Route>
    <Route path="/auction/batch/:batchId" exact>
      <BatchAuction />
    </Route>
    <Route path="/auction/batch/2/:primeId" exact>
      <PrimeAuction />
    </Route>
    <Route path="/playground" exact>
      <Playground />
    </Route>
  </Switch>
)
