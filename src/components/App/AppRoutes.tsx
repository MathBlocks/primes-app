import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../Home'
import { Dao } from '../Dao'
import { Prime } from '../Prime'
import { Primes } from '../Primes'
import { Account } from '../Account'
import { Breeding } from '../Breeding'
import { Auction } from '../Auction'
import { BatchAuction } from '../Auction/BatchAuction'
import { PrimeAuction } from '../Auction/PrimeAuction'

export const AppRoutes: FC = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/primes/spiral" exact>
      <Primes />
    </Route>
    <Route path="/primes/gallery" exact>
      <Primes />
    </Route>
    <Route path="/primes/breed" exact>
      <Breeding />
    </Route>
    <Route path="/primes/account/:account?" exact>
      <Account />
    </Route>
    <Route path="/primes/auction" exact>
      <Auction />
    </Route>
    <Route path="/primes/auction/batch/:batchId" exact>
      <BatchAuction />
    </Route>
    <Route path="/primes/auction/batch/2/:primeId" exact>
      <PrimeAuction />
    </Route>
    <Route path="/primes/:tokenId" exact>
      <Prime />
    </Route>
    <Route path="/primes" exact>
      <Primes />
    </Route>
    <Route path="/dao" exact>
      <Dao />
    </Route>
  </Switch>
)
