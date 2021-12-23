import { FC } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'

import { SendTransactionWidget } from '../SendTransactionWidget'
import { usePrimeBatchQuery } from '../../graphql/subgraph/subgraph'
import { useWhitelistProof } from '../../merkleTree'
import { useContracts } from '../App/DAppContext'
import { useOnboard } from '../App/OnboardProvider'
import { AccountLink } from '../AccountLink'

const batchPriceMapping: Record<number, BigNumber> = {
  0: parseEther('0.05'),
  1: parseEther('0.1'),
}

const MintRandomPrimeForm: FC<{ batchId: number }> = ({
  batchId,
}) => {
  const { Primes } = useContracts<true>()
  const { address } = useOnboard()

  const proof = useWhitelistProof(
    `whitelist-batch-${batchId}.json`,
    address as string | undefined,
  )

  return (
    <div>
      <SendTransactionWidget
        contract={Primes}
        functionName="mintRandomPrime"
        args={[
          proof,
          {
            value: batchPriceMapping[batchId],
          },
        ]}
        transactionOptions={{ transactionName: 'Mint random Prime' }}
      />
    </div>
  )
}

const BatchForm: FC<{ batchId: number }> = ({ batchId }) => {
  const contracts = useContracts()
  const { address } = useOnboard()
  return (
    <div className="form">
      {contracts && address && (
        <MintRandomPrimeForm batchId={batchId} />
      )}
    </div>
  )
}

const Container = styled.div`
  .stats {
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    h4 {
      margin: 0;
    }

    > div {
      margin-bottom: 1rem;
    }
  }
`

export const Batch: FC<{ batchId: number }> = ({ batchId }) => {
  const primeBatchQuery = usePrimeBatchQuery({
    variables: { id: batchId.toString() },
  })
  const primeBatch = primeBatchQuery.data?.primeBatch
  return (
    <Container>
      {primeBatch ? (
        <>
          <div className="stats">
            <div>
              <h4>Remaining</h4>
              <div>{primeBatch.remaining}</div>
            </div>
            <div>
              <h4>Active</h4>
              <div>{primeBatch.active ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <h4>Whitelist</h4>
              <div>
                {primeBatch.whitelist
                  ?.split(',')
                  .map((account: string) => (
                    <div key={account}>
                      <AccountLink account={account} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <BatchForm batchId={batchId} />
        </>
      ) : (
        'Loading...'
      )}
    </Container>
  )
}
