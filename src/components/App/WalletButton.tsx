import React, { FC } from 'react'
import { useToggle } from 'react-use'
import styled from 'styled-components'

import { useOnboard } from './OnboardProvider'
import { truncateAddress } from '../../utils'
import { Modal } from '../Modal'
import { AccountLink } from '../AccountLink'
import { formatEther } from 'ethers/lib/utils'
import { useHistory } from 'react-router'
import { theme } from '../../theme'

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
      color: ${theme.red};
    }
  }
`

const Container = styled.div`
  button {
    appearance: none;
    border: 1px ${theme.grey[0]} solid;
    border-radius: 1rem;
    padding: 0.25rem 1rem;
    color: ${theme.grey[0]};
    background: ${theme.grey[5]};
    height: 2rem;
    line-height: 100%;
    font-size: 1rem;
    min-width: 10rem;
    &:hover {
      background: ${theme.grey[4]};
    }
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
  const [, toggleIsConnecting] = useToggle(false)
  const [showWalletModal, toggleShowWalletModal] = useToggle(false)

  return (
    <Container>
      <button
        onClick={() => {
          if (address) {
            toggleShowWalletModal(true)
          } else {
            toggleIsConnecting(true)
            selectWallet()
              .catch((error) => {
                console.error(error)
                disconnectWallet()
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
              My account
            </button>
            <button className="red" onClick={disconnectWallet}>
              Disconnect
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('apollo-cache-persist')
              }}
            >
              Clear cache
            </button>
            <button onClick={toggleShowWalletModal}>x</button>
          </div>
        </WalletModalContent>
      </Modal>
    </Container>
  )
}
