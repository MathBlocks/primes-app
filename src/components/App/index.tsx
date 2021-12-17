import { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { DAppProvider } from '@usedapp/core'

import { config } from '../../config'
import { AppLayout } from './AppLayout'
import { AppRoutes } from './AppRoutes'
import { ApolloProvider } from './ApolloProvider'
import { DAppContext } from './DAppContext'
import { PrimesContext } from './PrimesContext'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #191919;
    color: white;
  }
  
  html, body, #root {
    height: 100%;
  }

  * {
    font-family: 'Space Grotesk', sans-serif;
    box-sizing: border-box;
  }
  
  .monospace {
    font-family: 'Space Mono', monospace;
  }

  a {
    color: white;
    text-decoration: none;
    border-bottom: 1px white solid;
    &:hover, &.active {
      color: orange;
      border-color: orange;
    }
  }

  h1, h2, h3, h4, h5 {
    margin-top: 0;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.6rem;
  }
  
  h4 {
    font-size: 1.3rem;
  }
  
  button {
    appearance: none;
    border: none;
    background: white;
    color: black;
    border-radius: 1rem;
    padding: 0.25rem 1rem;
    text-align: center;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }
`

export const App: FC = () => {
  return (
    <DAppProvider config={config}>
      <DAppContext>
        <ApolloProvider>
          <PrimesContext>
            <Router>
              <AppLayout>
                <GlobalStyle />
                <AppRoutes />
              </AppLayout>
            </Router>
          </PrimesContext>
        </ApolloProvider>
      </DAppContext>
    </DAppProvider>
  )
}
