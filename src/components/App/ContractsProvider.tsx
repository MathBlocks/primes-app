import { createContext, FC, useContext, useMemo } from 'react'
import { useEthers } from '@usedapp/core'

import { useContractAddresses } from '../../config'
import {
  Primes,
  Primes__factory,
  PrimesAuctionHouse__factory,
  PrimesAuctionHouse,
  IWETH,
  IWETH__factory,
} from '../../typechain'

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

export const ContractsProvider: FC = ({ children }) => {
  const { library } = useEthers()

  const contractAddresses = useContractAddresses()

  const value = useMemo<Contracts | undefined>(() => {
    if (!contractAddresses || !library) {
      return
    }

    return {
      Primes: Primes__factory.connect(contractAddresses.Primes, library),
      PrimesAuctionHouse: PrimesAuctionHouse__factory.connect(
        contractAddresses.PrimesAuctionHouse,
        library,
      ),
      WETH: IWETH__factory.connect(contractAddresses.WETH, library),
    }
  }, [contractAddresses, library])

  return <contractsCtx.Provider value={value}>{children}</contractsCtx.Provider>
}
