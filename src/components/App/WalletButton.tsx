import React, { FC } from 'react'
import { useEthers } from '@usedapp/core'
import { truncateAddress } from '../../utils'
import styled from 'styled-components'

const Container = styled.div`
  button {
    appearance: none;
    border: 1px white solid;
    border-radius: 1rem;
    padding: 0.25rem 1rem;
    color: white;
    background: none;
    height: 2rem;
    font-size: 1rem;
  }
`

export const WalletButton: FC = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  return (
    <Container>
      <button
        onClick={() => {
          if (account) {
            deactivate()
          } else {
            activateBrowserWallet()
          }
        }}
      >
        {account ? (
          <span className="monospace">
            {truncateAddress(account)}
          </span>
        ) : (
          'Connect'
        )}
      </button>
    </Container>
  )
}
