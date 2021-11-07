import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { DAppProvider } from '@usedapp/core'

import { AppLayout } from './AppLayout'
import { AppRoutes } from './AppRoutes'
import { config } from '../../config'
import { ApolloProvider } from './ApolloProvider'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #191919;
    color: white;
  }
  * {
    font-family: 'Roboto', sans-serif;
  }
  a {
    color: white;
    text-decoration: none;
  }
`

export const App: FC = () => {
  return (
    <DAppProvider config={config}>
      <ApolloProvider>
        <Router>
          <GlobalStyle />
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </Router>
      </ApolloProvider>
    </DAppProvider>
  )
}
