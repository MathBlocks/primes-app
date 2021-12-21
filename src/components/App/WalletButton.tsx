import React, { FC } from 'react'
import { useToggle } from 'react-use'
import styled from 'styled-components'

import { useOnboard } from './OnboardProvider'
import { truncateAddress } from '../../utils'

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
    min-width: 10rem;
  }
`

export const WalletButton: FC = () => {
  const { address, disconnectWallet, selectWallet } = useOnboard()
  const [isConnecting, toggleIsConnecting] = useToggle(false)
  return (
    <Container>
      <button
        onClick={() => {
          if (address) {
            disconnectWallet()
          } else if (!isConnecting) {
            toggleIsConnecting(true)
            selectWallet()
              .catch((error) => {
                console.error(error)
                toggleIsConnecting(false)
              })
              .then(() => {
                toggleIsConnecting(false)
              })
          }
        }}
      >
        {address ? (
          <span className="monospace">
            {truncateAddress(address)}
          </span>
        ) : (
          'Connect'
        )}
      </button>
    </Container>
  )
}
