import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../Home'
import { AuctionRoutes } from '../Auction'
import { Prime } from '../Prime'
import { Primes } from '../Primes'
import { Account } from '../Account'
import { Breeding } from '../Breeding'

export const AppRoutes: FC = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/primes" exact>
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
    <AuctionRoutes />
  </Switch>
)
