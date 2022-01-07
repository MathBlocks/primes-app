import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Contract } from 'ethers'

import {
  TransactionState,
  useContractFunction,
  useExplorerTransactionLink,
} from '../hooks'

const Row = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

const Container = styled.div<{ status: TransactionState }>`
  border-radius: 1rem;
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
        ? '#265967'
        : '#555'};
  }

  > div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
`

export const SendTransactionWidget: <
  ContractType extends Contract,
  FunctionName extends keyof ContractType['functions'],
  Args extends Parameters<ContractType['functions'][FunctionName]>,
  SendTransactionButtonProps extends {
    contract?: ContractType
    functionName: FunctionName
    args: Args
    transactionOptions?: { transactionName?: string }
    buttonProps?: DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
    check?(): boolean
  },
>(
  props: SendTransactionButtonProps,
) => ReturnType<FC<SendTransactionButtonProps>> = ({
  contract,
  functionName,
  args,
  transactionOptions,
  buttonProps,
  check,
}) => {
  const {
    send,
    state: { status, transaction, errorMessage },
  } = useContractFunction(contract, functionName)

  const explorerTransactionLink = useExplorerTransactionLink(
    transaction?.hash,
  )

  return (
    <Container status={status}>
      <button
        {...buttonProps}
        onClick={() => {
          if (check && !check()) return

          send(...args).catch((error) => {
            console.error(error)
          })
        }}
      >
        {transactionOptions?.transactionName ?? 'Send'}
      </button>
      {(status !== 'None' || transaction?.hash) && (
        <div>
          <Row visible={status !== 'None'}>
            {status}{' '}
            {errorMessage && (
              <span className="error">
                ({errorMessage.replace('execution reverted: ', '')})
              </span>
            )}
          </Row>
          <Row visible={!!transaction?.hash}>
            <a
              target="_blank"
              rel="noreferrer"
              href={explorerTransactionLink}
            >
              View transaction
            </a>
          </Row>
        </div>
      )}
    </Container>
  )
}
