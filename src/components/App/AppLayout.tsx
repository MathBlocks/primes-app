import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import ReactTooltip from 'react-tooltip'

const LayoutContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: 120ch;

  main {
    padding: 1rem;
  }

  header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
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
`

export const truncateAddress = (address: string): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`

const WalletButton: FC = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  return (
    <li>
      {account && <>Connected: {truncateAddress(account)} </>}
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
      <img src="/primes.svg" alt="Primes" />
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
