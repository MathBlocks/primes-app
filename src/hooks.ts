import {
  TransactionStatus,
  useContractFunction as useDappUseContractFunction,
} from '@usedapp/core'
import { Contract } from 'ethers'
import { TransactionOptions } from '@usedapp/core/src/index'

interface UseContractFunctionReturnType<
  ContractType extends Contract,
  Key extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][Key]>,
> {
  send: (...args: Args) => Promise<void>
  state: TransactionStatus
}

export function useContractFunction<
  ContractType extends Contract,
  Key extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][Key]>,
>(
  contract: ContractType,
  functionName: Key,
  options?: TransactionOptions,
): UseContractFunctionReturnType<ContractType, Key, Args> {
  const { send, state } = useDappUseContractFunction(
    contract as never,
    functionName as string,
    options,
  )
  return { send: (...args: Args) => send(...args), state }
}
