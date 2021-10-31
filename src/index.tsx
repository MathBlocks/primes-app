import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, DAppProvider, Config } from '@usedapp/core'
import { createGlobalStyle } from 'styled-components'

import { App } from './App'
import { Ulam } from './Ulam'

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    [ChainId.Kovan]:
      'https://kovan.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: black;
    color: white;
  }
  
  #root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    max-width: 90ch;
    align-items: center;
  }
`

// <DAppProvider config={config}>
//   <App />
// </DAppProvider>
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <main>
      <Ulam />
    </main>
  </React.StrictMode>,
  document.getElementById('root'),
)
