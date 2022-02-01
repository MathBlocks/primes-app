import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../Home'
import { Community } from '../Community'
import { Prime } from '../Prime'
import { Primes } from '../Primes'
import { Account } from '../Account'
import { Breeding } from '../Breeding'
import { Auction } from '../Auction'
import { BatchAuction } from '../Auction/BatchAuction'
import { PrimeAuction } from '../Auction/PrimeAuction'
import { Contests } from '../Contests'

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
    <Route path="/community" exact>
      <Community />
    </Route>
    <Route path="/contests" exact>
      <Contests />
    </Route>
    <Route
      path="/discord"
      component={() => {
        window.location.href = 'https://discord.gg/2PKH93hFF5'
        return null
      }}
      exact
    />
    <Community />
  </Switch>
)
