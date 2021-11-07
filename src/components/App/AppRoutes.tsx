import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../Home'
import { Primes } from '../Primes/Primes'

export const AppRoutes: FC = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/primes/:tokenId?" exact>
      <Primes />
    </Route>
  </Switch>
)
