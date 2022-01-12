import React, { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { WalletButton } from './WalletButton'
import { useInterval } from 'react-use'
import { getUnixTime } from 'date-fns'

const NavbarContainer = styled.nav`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ul {
    display: flex;
    gap: 3rem;
  }

  li {
    list-style: none;
  }

  .icon {
    display: block;
    width: 24px;
    height: 24px;
    &.twitter {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='white' d='M24 4.6c-.9.3-1.8.6-2.8.7a5 5 0 0 0 2.1-2.7c-1 .6-2 1-3 1.2a5 5 0 0 0-8.5 4.5A14 14 0 0 1 1.7 3a5 5 0 0 0 1.5 6.6c-.8 0-1.6-.2-2.2-.6A5 5 0 0 0 5 14a5 5 0 0 1-2.3 0 5 5 0 0 0 4.6 3.5 9.9 9.9 0 0 1-7.3 2A14 14 0 0 0 21.5 7.1 10 10 0 0 0 24 4.6z' /%3E%3C/svg%3E");
    }
    &.discord {
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'%3E%3Cpath fill='white' d='M19.5 0C21 0 22 1.1 22 2.5V24l-2.6-2.3-1.4-1.3-1.6-1.5.7 2.3H3.5A2.5 2.5 0 0 1 1 18.7V2.5C1 1 2.1 0 3.5 0h16zM15 15.7c2.7-.1 3.7-1.9 3.7-1.9 0-3.8-1.7-7-1.7-7-1.8-1.2-3.4-1.2-3.4-1.2l-.2.2c2 .6 3 1.5 3 1.5a9.8 9.8 0 0 0-6-1.1H10a9 9 0 0 0-2.8.8l-.7.3s1-1 3.2-1.6l-.1-.1S8 5.6 6.3 6.9c0 0-1.7 3-1.7 7 0 0 1 1.7 3.6 1.8l.8-1a3.7 3.7 0 0 1-2-1.4l.3.2h.1l.9.5c.5.2 1 .4 1.8.5a8.4 8.4 0 0 0 6.2-1.2s-.6 1-2.2 1.4l.8 1zM9.3 10c-.7 0-1.2.6-1.2 1.3 0 .7.6 1.3 1.2 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.6-1.3-1.3-1.3zm4.4 0c-.7 0-1.2.6-1.2 1.3 0 .7.5 1.3 1.2 1.3s1.2-.6 1.2-1.3c0-.7-.5-1.3-1.2-1.3z'/%3E%3C/svg%3E");
    }
  }

  @media (max-width: 480px) {
    display: block;
    ul {
      gap: 1rem;
      &.wallet {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 0;
        padding: 0;
      }
    }
  }
`

const Footer: FC = () => (
  <footer>
    <a href="https://mathblocks.io">mathblocks.io</a>
  </footer>
)

// TODO only show auction when it's active
const Navbar: FC = () => (
  <NavbarContainer>
    <ul>
      <li>
        <NavLink to="/primes/auction">Auction</NavLink>
      </li>
      <li>
        <NavLink to="/primes/gallery">Gallery</NavLink>
      </li>
      {/*TODO reinstate with updated artwork*/}
      {/*<li>*/}
      {/*  <NavLink to="/primes/spiral">Spiral</NavLink>*/}
      {/*</li>*/}
      <li>
        <NavLink to="/primes/breed">Breed</NavLink>
      </li>
      <li>
        <a
          className="icon twitter"
          href="https://twitter.com/mathblocks_io"
          rel="noreferrer"
          target="_blank"
          title="MathBlocks on Twitter"
        />
      </li>
      <li>
        <a
          className="icon discord"
          href="https://discord.gg/PevSMUMT"
          rel="noreferrer"
          target="_blank"
          title="MathBlocks Discord"
        />
      </li>
    </ul>
    <ul className="wallet">
      <li>
        <WalletButton />
      </li>
    </ul>
  </NavbarContainer>
)

const PrimesLogo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  .epoch {
    padding: 1rem 1rem 1rem 0;
    color: dimgrey;
    cursor: help;
    font-size: 0.6rem;
  }
`

const LayoutContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr auto;
  padding: 0 1rem;

  header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    height: 8rem;
    a {
      border-bottom: 0;
    }
    .logo {
      max-width: 5rem;
      height: auto;
    }
  }

  footer {
    padding: 1rem 0;
    border-top: 1px #444 solid;
  }

  header,
  footer,
  main {
    width: 100%;
    max-width: 100ch;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    header {
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      height: auto;
      gap: 0;
      ${PrimesLogo} {
        align-self: center;
        padding-top: 1rem;
        .epoch {
          display: none;
        }
      }
    }
  }
`

const EPOCH_TIME = 1641998587

const Epoch: FC = () => {
  const [time, setTime] = useState<number>()

  useInterval(() => {
    setTime(getUnixTime(Date.now()) - EPOCH_TIME)
  }, 1e3)

  return (
    <div
      className="epoch monospace"
      data-tip="Seconds since Primes began"
    >
      {time}
    </div>
  )
}

export const AppLayout: FC = ({ children }) => {
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])
  return (
    <LayoutContainer>
      <header>
        <PrimesLogo>
          <NavLink to="/">
            <img className="logo" src="/primes.svg" alt="Primes" />
          </NavLink>
          <Epoch />
        </PrimesLogo>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
      <ReactTooltip />
    </LayoutContainer>
  )
}
