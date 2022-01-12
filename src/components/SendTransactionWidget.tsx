import { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import { usePrevious } from 'react-use'
import styled from 'styled-components'
import { BigNumber, Contract } from 'ethers'

import { theme } from '../theme'
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

  background-color: ${theme.grey[1]};

  button {
    width: 100%;
    color: white;
    font-weight: bold;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    border: none;

    &:hover {
      background: ${theme.grey[3]};
    }
    background: ${({ status }) =>
      status === 'Fail' || status === 'Exception'
        ? theme.red
        : status === 'Success'
        ? theme.green
        : status === 'Mining'
        ? theme.purple
        : theme.grey[2]};
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
    estimate,
    state: { status, transaction, errorMessage, gasLimit },
  } = useContractFunction(contract, functionName)

  const explorerTransactionLink = useExplorerTransactionLink(
    transaction?.hash,
  )

  const prevArgs = usePrevious(args)

  return (
    <Container status={status}>
      <button
        {...buttonProps}
        onClick={() => {
          const needsEstimate =
            !gasLimit ||
            (args &&
              prevArgs &&
              !args.every((arg, idx) => prevArgs[idx] === arg))

          if (needsEstimate) {
            estimate(...args).catch((error) => {
              console.error(error)
            })
          }

          if (!gasLimit) return

          let adjustedGasLimit = gasLimit

          if (
            (functionName as string).startsWith('mintRandomPrime')
          ) {
            let count: number = 1
            if ((functionName as string) === 'mintRandomPrimes') {
              count = args[0] as number
            }
            // 170000 => safe mint cost for a Prime
            const safeGasLimit = BigNumber.from(170000).mul(count)
            if (gasLimit.lt(safeGasLimit)) {
              adjustedGasLimit = safeGasLimit
            }
          }

          if (check && !check()) return

          send(adjustedGasLimit, ...args).catch((error) => {
            console.error(error)
          })
        }}
      >
        {`${!gasLimit ? 'Estimate' : ''} ${
          transactionOptions?.transactionName ?? 'Send'
        }`}
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
