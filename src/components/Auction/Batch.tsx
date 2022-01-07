import { FC, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

import { SendTransactionWidget } from '../SendTransactionWidget'
import { usePrimeBatchQuery } from '../../graphql/subgraph/subgraph'
import { useWhitelistProof } from '../../merkleTree'
import { useContracts } from '../App/DAppContext'
import { useOnboard } from '../App/OnboardProvider'

const batchPriceMapping: Record<number, BigNumber> = {
  0: parseEther('0.05'),
  1: parseEther('0.075'),
}

const MintRandomPrimeFormContainer = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background-color: #111;
  > :first-child {
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 4rem;
    margin-bottom: 2rem;
    h4 {
      margin-bottom: 0.5rem;
      span {
        font-size: 0.8rem;
      }
    }
    input[type='range'] {
      min-width: 14rem;
    }
  }
`

const MintRandomPrimeForm: FC<{
  batchId: number
  remaining?: number
}> = ({ batchId, remaining }) => {
  const contracts = useContracts()
  const { address } = useOnboard()

  const whitelistProof = useWhitelistProof(
    address as string | undefined,
  )

  const [count, setCount] = useState<number>(1)

  if (!contracts) return <div>Loading...</div>

  const baseArgs = [
    whitelistProof.batch0Cap,
    whitelistProof.batch1Cap,
    whitelistProof.proof,
    {
      value: batchPriceMapping[batchId].mul(count),
    },
  ]

  const cap =
    whitelistProof[batchId === 0 ? 'batch0Cap' : 'batch1Cap']

  return (
    <MintRandomPrimeFormContainer>
      <div>
        <div>
          <h4>Primes to mint</h4>
          <div>
            <div>{count}</div>
            <input
              defaultValue="1"
              type="range"
              min="1"
              step="1"
              onChange={(el) => {
                setCount(parseInt(el.target.value))
              }}
              max={Math.min(cap || 100, remaining ?? 100).toString()}
            />
          </div>
        </div>
        <div>
          <h4>Whitelist cap</h4>
          <div>{cap}</div>
        </div>
        <div>
          <h4>
            Total cost <span>(excl. gas)</span>
          </h4>
          <div>
            {formatEther(batchPriceMapping[batchId].mul(count))} ETH
          </div>
        </div>
      </div>
      <SendTransactionWidget
        contract={contracts.Primes}
        functionName={
          count > 1 ? 'mintRandomPrimes' : 'mintRandomPrime'
        }
        args={count > 1 ? [count, ...baseArgs] : baseArgs}
        transactionOptions={{
          transactionName:
            count > 1
              ? `Mint ${count} random Primes`
              : 'Mint random Prime',
        }}
      />
    </MintRandomPrimeFormContainer>
  )
}

const BatchForm: FC<{ batchId: number; remaining?: number }> = ({
  batchId,
  remaining,
}) => {
  const contracts = useContracts()
  const { address } = useOnboard()
  return (
    <div className="form">
      {contracts && address && (
        <MintRandomPrimeForm
          batchId={batchId}
          remaining={remaining}
        />
      )}
    </div>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  > :first-child {
    max-width: 14rem;
    img {
      width: 100%;
      height: auto;
    }
  }
  .stats {
    display: flex;
    gap: 4rem;
    justify-content: center;
    text-align: center;

    h4 {
      margin-bottom: 0.5rem;
    }

    > div {
      margin-bottom: 1rem;
    }
  }
`

export const Batch: FC<{ batchId: number }> = ({ batchId }) => {
  const primeBatchQuery = usePrimeBatchQuery({
    variables: { id: batchId.toString() },
    pollInterval: 30e3,
  })
  const primeBatch = primeBatchQuery.data?.primeBatch
  // TODO get whitelist time remaining
  return (
    <Container>
      <div>
        <img alt="Prime box" src="/prime-box.svg" />
        <p>
          The first two auctions will sell off the largest Primes.
          Minting is random with a flat price. Whitelisted users have
          a 12-hour period to mint first.
        </p>
      </div>
      {primeBatch ? (
        <div>
          <div className="stats">
            <div>
              <h4>Primes Remaining</h4>
              <div>{primeBatch.remaining}</div>
            </div>
            <div>
              <h4>Active</h4>
              <div>{primeBatch.active ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <h4>Whitelist time remaining</h4>
              <div>
                {primeBatch.active ? '12 hours' : 'Open to all'}
              </div>
            </div>
            <div>
              <h4>Price</h4>
              <div>{batchId === 0 ? '0.05' : '0.075'} ETH</div>
            </div>
          </div>
          <BatchForm
            batchId={batchId}
            remaining={primeBatch.remaining}
          />
        </div>
      ) : (
        'Loading...'
      )}
    </Container>
  )
}
