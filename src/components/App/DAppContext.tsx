import { createContext, FC, useContext, useMemo } from 'react'

import { CONFIG } from '../../config'
import {
  Primes,
  Primes__factory,
  PrimesAuctionHouse__factory,
  PrimesAuctionHouse,
  IWETH,
  IWETH__factory,
} from '../../typechain'
import { useOnboard } from './OnboardProvider'

interface Contracts {
  Primes: Primes
  PrimesAuctionHouse: PrimesAuctionHouse
  WETH: IWETH
}

const contractsCtx = createContext<Contracts | undefined>(undefined)

export const useContracts = <
  T extends Boolean,
  U = T extends true ? Contracts : Contracts | undefined,
>(): U => useContext(contractsCtx) as unknown as U

const ContractsProvider: FC = ({ children }) => {
  const { provider, chainId } = useOnboard()

  const value = useMemo<Contracts | undefined>(() => {
    const contractAddresses =
      CONFIG.contracts[chainId as keyof typeof CONFIG['contracts']]

    if (!contractAddresses || !provider) {
      return
    }

    const signer = provider.getSigner()

    return {
      Primes: Primes__factory.connect(
        contractAddresses.Primes,
        signer,
      ),
      PrimesAuctionHouse: PrimesAuctionHouse__factory.connect(
        contractAddresses.PrimesAuctionHouse,
        signer,
      ),
      WETH: IWETH__factory.connect(contractAddresses.WETH, signer),
    }
  }, [chainId, provider])

  return (
    <contractsCtx.Provider value={value}>
      {children}
    </contractsCtx.Provider>
  )
}

export const DAppContext: FC = ({ children }) => (
  <ContractsProvider>{children}</ContractsProvider>
)
