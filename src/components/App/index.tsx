import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { DAppProvider } from '@usedapp/core'

import { config } from '../../config'
import { AppLayout } from './AppLayout'
import { AppRoutes } from './AppRoutes'
import { ApolloProvider } from './ApolloProvider'
import { ContractsProvider } from './ContractsProvider'
import { PrimesContext } from './PrimesContext'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #191919;
    color: white;
  }

  * {
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .monospace {
    font-family: 'Space Mono', monospace;
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
        <ContractsProvider>
          <PrimesContext>
            <Router>
              <AppLayout>
                <GlobalStyle />
                <AppRoutes />
              </AppLayout>
            </Router>
          </PrimesContext>
        </ContractsProvider>
      </ApolloProvider>
    </DAppProvider>
  )
}
