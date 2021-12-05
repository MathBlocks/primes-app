import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Contract } from 'ethers'
import {
  TransactionOptions,
  getExplorerTransactionLink,
  TransactionState,
} from '@usedapp/core'

import { useContractFunction } from '../hooks'

const Container = styled.div<{ status: TransactionState }>`
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0;

  background-color: ${({ status }) =>
    status === 'Fail' || status === 'Exception'
      ? '#4a2323'
      : status === 'Success'
      ? '#293f26'
      : status === 'Mining'
      ? '#fff'
      : '#333'};

  button {
    width: 100%;
    color: white;
    font-weight: bold;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    border: none;

    &:hover {
      background: #888;
    }
    background: ${({ status }) =>
      status === 'Fail' || status === 'Exception'
        ? '#ae5656'
        : status === 'Success'
        ? '#3e5b38'
        : status === 'Mining'
        ? '#fff'
        : '#555'};
  }

  > div {
    padding: 0 1rem;
    &:last-child {
      padding-bottom: 1rem;
    }
  }
`

export const SendTransactionWidget: <
  ContractType extends Contract,
  FunctionName extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][FunctionName]>,
  SendTransactionButtonProps extends {
    contract: ContractType
    functionName: FunctionName
    args: Args
    transactionOptions?: TransactionOptions
    buttonProps?: DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  },
>(
  props: SendTransactionButtonProps,
) => ReturnType<FC<SendTransactionButtonProps>> = ({
  contract,
  functionName,
  args,
  transactionOptions,
  buttonProps,
}) => {
  const {
    send,
    state: { status, transaction, chainId = 1, errorMessage },
  } = useContractFunction(contract, functionName, transactionOptions)

  return (
    <Container status={status}>
      <button
        {...buttonProps}
        onClick={async () => {
          await send(...args)
        }}
      >
        {transactionOptions?.transactionName ?? 'Send'}
      </button>
      <div>
        {status === 'None' ? '–' : status}{' '}
        {errorMessage && (
          <span className="error">
            ({errorMessage.replace('execution reverted: ', '')})
          </span>
        )}
      </div>
      <div>
        {transaction?.hash ? (
          <a
            href={getExplorerTransactionLink(
              transaction.hash,
              chainId,
            )}
          >
            View transaction
          </a>
        ) : (
          '–'
        )}
      </div>
    </Container>
  )
}
