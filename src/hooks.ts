import { Reducer, useCallback, useReducer } from 'react'
import { BigNumber, Contract, ContractTransaction } from 'ethers'
import {
  TransactionResponse,
  TransactionReceipt,
} from '@ethersproject/abstract-provider'
import { useOnboard } from './components/App/OnboardProvider'

export type TransactionState =
  | 'None'
  | 'Mining'
  | 'Success'
  | 'Fail'
  | 'Exception'

export interface TransactionStatus {
  status: TransactionState
  gasLimit?: BigNumber
  transaction?: TransactionResponse
  receipt?: TransactionReceipt
  chainId?: number
  errorMessage?: string
  originalTransaction?: TransactionResponse
}

type TransactionAction =
  | {
      type: 'START'
    }
  | { type: 'SENT'; payload: TransactionResponse }
  | { type: 'ESTIMATE'; payload: BigNumber }
  | { type: 'FAIL' }
  | { type: 'SUCCESS' }
  | { type: 'RECEIPT'; payload: TransactionReceipt }
  | { type: 'ERROR'; payload: string }

const transactionStatusReducer: Reducer<
  TransactionStatus,
  TransactionAction
> = (state, action) => {
  switch (action.type) {
    case 'START':
      return { status: 'None' }
    case 'SENT':
      return {
        ...state,
        status: 'Mining',
        transaction: action.payload,
      }
    case 'ESTIMATE':
      return { ...state, gasLimit: action.payload }
    case 'RECEIPT':
      return { ...state, receipt: action.payload }
    case 'SUCCESS':
      return { ...state, status: 'Success' }
    case 'FAIL':
      return { ...state, status: 'Fail' }
    case 'ERROR':
      return {
        ...state,
        status: 'Exception',
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export const useContractFunction = <
  ContractType extends Contract,
  Key extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][Key]>,
>(
  contract: ContractType | undefined,
  functionName: Key,
) => {
  const [state, dispatch] = useReducer(transactionStatusReducer, {
    status: 'None',
  })

  const estimate = useCallback(
    async (...args: Args) => {
      if (!contract) return

      try {
        const gasEstimate = await contract.estimateGas[
          functionName as string
        ](...args)
        dispatch({ type: 'ESTIMATE', payload: gasEstimate })
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: `Error estimating gas: ${error}`,
        })
      }
    },
    [contract, functionName],
  )

  const send = useCallback(
    async (gasLimit: BigNumber, ...args: Args) => {
      if (!contract) return

      dispatch({ type: 'START' })

      try {
        let options = { gasLimit }

        // Some txs have value, that's the only extra transaction option set
        const lastArg = args.pop()
        if (lastArg.value) {
          // Add the value to the gasLimit
          options = { ...options, ...lastArg }
        } else {
          // Otherwise add the last arg back
          args.push(lastArg)
        }

        const tx = (await contract[functionName](
          ...args,
          options,
        )) as ContractTransaction

        dispatch({ type: 'SENT', payload: tx })

        const receipt = await tx.wait(1)

        dispatch({ type: 'RECEIPT', payload: receipt })

        if (receipt.status === 1) {
          dispatch({ type: 'SUCCESS' })
        } else {
          dispatch({ type: 'FAIL' })
        }
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload:
            (error as any).error?.message ??
            (error as any).reason ??
            error.message ??
            error.toString(),
        })
      }
    },
    [contract, functionName],
  )

  return {
    send,
    state,
    estimate,
  }
}

export const useExplorerTransactionLink = (hash?: string) => {
  const { chainId } = useOnboard()
  if (!hash) return
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${hash}`
    case 4:
      return `https://rinkeby.etherscan.io/tx/${hash}`
    case 137:
      return `https://polygonscan.com/tx/${hash}`
    default:
      throw new Error(`Unsupported chain ID ${chainId}`)
  }
}
