import {
  FC,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import Onboard from 'bnc-onboard'
import {
  API,
  Initialization,
  Wallet,
} from 'bnc-onboard/dist/src/interfaces'
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

import { CONFIG } from '../../config'

interface Options {
  options?: Initialization & { networkId?: number }
  initialData?: Partial<{ address: string; balance: BigNumber }>
}

const SELECTED_WALLET_KEY = 'selectedWallet'

const DEFAULT_CHAIN_ID = 1

const useOnboardBase = (
  { options, initialData }: Options = {
    options: { networkId: DEFAULT_CHAIN_ID },
    initialData: {},
  },
) => {
  const [onboard, setOnboard] = useState<API | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [provider, setProvider] = useState<Web3Provider | null>(null)

  const [isWalletSelected, setIsWalletSelected] = useState<boolean>()

  const [address, setAddress] = useState<string | undefined>(
    initialData?.address?.toLowerCase(),
  )
  const [balance, setBalance] = useState<BigNumber | undefined>(
    initialData?.balance,
  )

  useEffect(() => {
    setOnboard(
      Onboard({
        ...options,
        networkId: options?.networkId ?? DEFAULT_CHAIN_ID,
        subscriptions: {
          ...options?.subscriptions,
          wallet: (wallet) => {
            options?.subscriptions?.wallet?.(wallet)

            if (wallet.provider && wallet.name) {
              setWallet(wallet)

              const ethersProvider = new Web3Provider(
                wallet.provider,
              )

              window.localStorage.setItem(
                SELECTED_WALLET_KEY,
                wallet.name,
              )

              setProvider(ethersProvider)
            } else {
              setProvider(null)
              setWallet(null)
              window.localStorage.removeItem(SELECTED_WALLET_KEY)
            }
          },
          address: (address) => {
            const sanitised = address
              ? address.toLowerCase()
              : undefined
            options?.subscriptions?.address?.(sanitised as string)
            setAddress(sanitised)
          },
          balance: (balance) => {
            options?.subscriptions?.balance?.(balance)
            setBalance(balance ? BigNumber.from(balance) : undefined)
          },
        },
      }),
    )
  }, [options])

  useEffect(() => {
    const previouslySelectedWallet = window.localStorage.getItem(
      SELECTED_WALLET_KEY,
    )

    if (previouslySelectedWallet && onboard) {
      onboard
        .walletSelect(previouslySelectedWallet)
        .then(() => {
          setIsWalletSelected(true)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [onboard])

  const selectWallet = async () => {
    if (!isWalletSelected && onboard) {
      await onboard.walletSelect()
      await onboard.walletCheck()

      setIsWalletSelected(true)

      // onboard.config({
      //   darkMode: options?.darkMode,
      //   networkId: DEFAULT_CHAIN_ID,
      // })
    }
  }

  const disconnectWallet = () => {
    if (onboard) {
      onboard.walletReset()

      setIsWalletSelected(false)
      setProvider(null)
      setWallet(null)
      setBalance(undefined)
      setAddress(undefined)

      window.localStorage.removeItem(SELECTED_WALLET_KEY)
    }
  }

  return {
    onboard,
    wallet,
    address,
    chainId: options?.networkId ?? DEFAULT_CHAIN_ID,
    selectWallet,
    balance,
    isWalletSelected,
    provider,
    disconnectWallet,
  }
}

const onboardCtx = createContext<ReturnType<typeof useOnboardBase>>(
  null as never,
)

export const useOnboard = () => useContext(onboardCtx)

const getOnboardOptions = (
  chainId: number,
  networkName: string,
  rpcUrl: string,
): Parameters<typeof useOnboardBase>[0] => ({
  options: {
    dappId: CONFIG.dappId,
    darkMode: true,
    hideBranding: true,
    networkId: chainId,
    networkName,
    walletSelect: {
      wallets: [
        {
          walletName: 'metamask',
          preferred: true,
        },
        {
          walletName: 'walletConnect',
          rpc: {
            [chainId]: rpcUrl,
          },
          preferred: true,
        },
        {
          walletName: 'ledger',
          rpcUrl,
          preferred: true,
        },
        {
          walletName: 'trezor',
          appUrl: window.location.hostname,
          email: 'info@mathblocks.io',
          rpcUrl,
          preferred: true,
        },
        { walletName: 'xdefi' },
        { walletName: 'trust', rpcUrl },
        { walletName: 'coinbase' },
        { walletName: 'gnosis' },
        {
          walletName: 'lattice',
          rpcUrl,
          appName: 'Primes',
        },
        { walletName: 'authereum' },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'torus' },
        { walletName: 'status' },
        { walletName: 'walletLink', rpcUrl, appName: 'Primes' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey', rpcUrl },
        { walletName: 'huobiwallet', rpcUrl },
        { walletName: 'hyperpay' },
        { walletName: 'wallet.io', rpcUrl },
      ],
    },
  },
})

export const OnboardProvider: FC = ({ children }) => {
  // TODO get chain ID/network name/RPC
  const options = useMemo(
    () =>
      getOnboardOptions(
        4,
        'Rinkeby',
        'https://rinkeby.infura.io/v3/62bdcedba8ba449d9a795ef6310e713c',
      ),
    [],
  )

  const onboard = useOnboardBase(options)

  return (
    <onboardCtx.Provider value={onboard}>
      {children}
    </onboardCtx.Provider>
  )
}
