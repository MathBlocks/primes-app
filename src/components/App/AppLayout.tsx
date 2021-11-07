import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import ReactTooltip from 'react-tooltip'

import { truncateAddress } from '../../utils'

const LayoutContainer = styled.div`
  height: 100vh;

  header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
  }

  footer {
    height: 6rem;
  }

  header,
  footer,
  main {
    max-width: 100ch;
    margin: 0 auto;
  }

  nav {
    ul {
      display: flex;
      gap: 3rem;
    }
    li {
      list-style: none;
      text-transform: lowercase;
    }
  }

  main {
    height: calc(100% - 12rem);
  }
`

const WalletButton: FC = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  return (
    <li>
      {account && <>Connected: {truncateAddress(account)}</>}
      {account ? (
        <button
          onClick={() => {
            deactivate()
          }}
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => {
            activateBrowserWallet()
          }}
        >
          Connect
        </button>
      )}
    </li>
  )
}

export const AppLayout: FC = ({ children }) => (
  <LayoutContainer>
    <header>
      <NavLink to="/">
        <img src="/primes.svg" alt="Primes" />
      </NavLink>
      <nav>
        <ul>
          <WalletButton />
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <a
              href="https://twitter.com/mathblocks_io"
              rel="noreferrer"
              target="_blank"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/PevSMUMT"
              rel="noreferrer"
              target="_blank"
            >
              Discord
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>{children}</main>
    <footer>Footer</footer>
    <ReactTooltip />
  </LayoutContainer>
)
