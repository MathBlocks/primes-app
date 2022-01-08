import React, { FC } from 'react'
import { useToggle } from 'react-use'
import styled from 'styled-components'

import { useOnboard } from './OnboardProvider'
import { truncateAddress } from '../../utils'
import { Modal } from '../Modal'
import { AccountLink } from '../AccountLink'
import { formatEther } from 'ethers/lib/utils'
import { useHistory } from 'react-router'

const WalletModalContent = styled.div`
  .connection,
  .balance {
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    .red {
      color: red;
    }
  }
`

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
  const {
    address,
    disconnectWallet,
    selectWallet,
    wallet,
    balance,
  } = useOnboard()

  const history = useHistory()
  const [isConnecting, toggleIsConnecting] = useToggle(false)
  const [showWalletModal, toggleShowWalletModal] = useToggle(false)

  return (
    <Container>
      <button
        onClick={() => {
          if (address) {
            toggleShowWalletModal(true)
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
      <Modal
        title="Wallet"
        isOpen={showWalletModal}
        onBackgroundClick={toggleShowWalletModal}
        onEscapeKeydown={toggleShowWalletModal}
      >
        <WalletModalContent>
          {address ? (
            <div className="connection">
              Connected as{' '}
              <AccountLink account={address} etherscan /> via{' '}
              {wallet?.name}
            </div>
          ) : (
            <div>Not connected</div>
          )}
          <div className="balance">
            Balance: {formatEther(balance ?? '0')} ETH
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                history.push('/primes/account')
                toggleShowWalletModal(false)
              }}
            >
              Account
            </button>
            <button onClick={toggleShowWalletModal}>Close</button>
            <button className="red" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        </WalletModalContent>
      </Modal>
    </Container>
  )
}
