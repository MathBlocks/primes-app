import { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import { parseEther } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'

import { usePrimeBatchQuery } from '../../graphql/subgraph/subgraph'
import { AccountLink } from '../AccountLink'
import { useContracts } from '../App/DAppContext'
import {
  createTreeWithAccounts,
  getAccountProof,
} from '../../merkleTree'
import { SendTransactionWidget } from '../SendTransactionWidget'

const batchTitleMapping: Record<number, string> = {
  0: `Fermat's Last Choice`,
  1: `Eratosthenes's Gold Sieve`,
  2: `Gödel Escher Batch: An Eternal Golden Raid`,
}

const batchPriceMapping: Record<number, BigNumber> = {
  0: parseEther('0.05'),
  1: parseEther('0.1'),
}

const MintRandomPrimeForm: FC<{ batchId: number }> = ({
  batchId,
}) => {
  const { Primes } = useContracts<true>()
  const { account } = useEthers()

  const merkleProof = useMemo<undefined | string[]>(() => {
    if (!account) return

    // TODO get whitelist and make like a tree
    const whitelistTree = createTreeWithAccounts([account])
    return getAccountProof(whitelistTree, account)
  }, [account])

  return (
    <div>
      <SendTransactionWidget
        contract={Primes}
        functionName="mintRandomPrime"
        args={[
          merkleProof,
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
  const { account } = useEthers()
  return (
    <div className="form">
      {contracts && account && (
        <MintRandomPrimeForm batchId={batchId} />
      )}
    </div>
  )
}

const Batch: FC<{ batchId: number }> = ({ batchId }) => {
  const primeBatchQuery = usePrimeBatchQuery({
    variables: { id: batchId.toString() },
  })
  const primeBatch = primeBatchQuery.data?.primeBatch
  return (
    <div className="batch">
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
                {(primeBatch.whitelist as string | undefined)
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
    </div>
  )
}

const AnEternalGoldenRaid: FC = () => {
  // TODO show a list of all 127 auctions
  return <div>TODO 2</div>
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

export const BatchAuction: FC = () => {
  const { batchId } = useParams<{ batchId: string }>()
  const parsedBatchId = parseInt(batchId)
  return (
    <Container>
      <h2>{batchTitleMapping[parsedBatchId]}</h2>
      {parsedBatchId === 2 ? (
        <AnEternalGoldenRaid />
      ) : (
        <Batch batchId={parsedBatchId} />
      )}
    </Container>
  )
}
