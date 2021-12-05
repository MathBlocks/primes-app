import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { createStateContext } from 'react-use'
import { BigNumber } from 'ethers'
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

const ContractsProvider: FC = ({ children }) => {
  const { library } = useEthers()

  const contractAddresses = useContractAddresses()

  const value = useMemo<Contracts | undefined>(() => {
    if (!contractAddresses || !library) {
      return
    }

    return {
      Primes: Primes__factory.connect(
        contractAddresses.Primes,
        library,
      ),
      PrimesAuctionHouse: PrimesAuctionHouse__factory.connect(
        contractAddresses.PrimesAuctionHouse,
        library,
      ),
      WETH: IWETH__factory.connect(contractAddresses.WETH, library),
    }
  }, [contractAddresses, library])

  return (
    <contractsCtx.Provider value={value}>
      {children}
    </contractsCtx.Provider>
  )
}

export const [useBalance, BalanceProvider] =
  createStateContext<BigNumber>(BigNumber.from(0))

const BalanceUpdater: FC = () => {
  const { library, account } = useEthers()
  const [, setBalance] = useBalance()
  useEffect(() => {
    if (!library || !account) return
    library
      .getBalance(account)
      .then((_balance) => {
        setBalance(_balance)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [library, account, setBalance])

  return null
}

export const DAppContext: FC = ({ children }) => (
  <ContractsProvider>
    <BalanceProvider>
      {children}
      <BalanceUpdater />
    </BalanceProvider>
  </ContractsProvider>
)
