import { FC, useMemo } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import { formatISO9075, fromUnixTime } from 'date-fns'

import {
  AllPrimeAuctionsQueryResult,
  useAllPrimeAuctionsQuery,
  usePrimeBatchQuery,
} from '../../graphql/subgraph/subgraph'
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

type PrimeAuctionData = NonNullable<
  AllPrimeAuctionsQueryResult['data']
>['primeAuctions'][number]

const GEBPrimeAuctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
  border-top: 1px #777 solid;
  padding: 1rem 0;
  align-items: stretch;

  > div {
    &:first-child {
      display: flex;
      gap: 0.5rem;
      justify-content: space-between;
      font-size: 1.2rem;
    }
    &:last-child {
      > div {
        > :first-child {
          opacity: 0.6;
        }
        display: flex;
        gap: 0.5rem;
      }
    }
  }
  .prime {
    a {
      display: flex;
      gap: 1rem;
      align-items: center;
      line-height: 1rem;
      font-size: 3rem;
      font-weight: bold;

      &:hover {
        color: orange;
      }

      span {
        display: block;
        &:first-child {
          border-radius: 0.5rem;
          overflow: hidden;
        }
      }
    }
    img {
      width: 6rem;
      height: auto;
      display: block;
    }
  }
`

const GEBPrimeAuction: FC<PrimeAuctionData> = ({
  id,
  settled,
  amount,
  startTime,
  endTime,
  bidder,
  winner,
  prime,
}) => {
  return (
    <GEBPrimeAuctionContainer key={id}>
      <div>
        <div className="prime">
          <Link
            className="monospace"
            to={`/auction/batch/2/${prime.id}`}
          >
            <span>
              <img src={prime.image} />
            </span>
            <span>{prime.id}</span>
          </Link>
        </div>
        <div className="amount monospace">
          {formatEther(parseInt(amount ?? '0'))} ETH
        </div>
      </div>
      <div>
        {settled ? <div>Settled</div> : null}
        <div className="time">
          <div>Duration</div>
          <div>
            {formatISO9075(fromUnixTime(parseInt(startTime)))} to{' '}
            {formatISO9075(fromUnixTime(parseInt(endTime)))}
          </div>
        </div>
        {bidder ? (
          <div className="bidder">
            <div>Bidder</div>
            <div>
              <AccountLink account={bidder.id} />
            </div>
          </div>
        ) : null}
        {winner ? (
          <div className="winner">
            <div>Winner</div>
            <div>
              <AccountLink account={winner.id} />
            </div>
          </div>
        ) : null}
      </div>
    </GEBPrimeAuctionContainer>
  )
}

const GEBBatch: FC = () => {
  // TODO show a list of all 32(?) auctions
  const allPrimeAuctionsQuery = useAllPrimeAuctionsQuery()
  const items = allPrimeAuctionsQuery.data?.primeAuctions ?? []

  return (
    <div>
      {items.map(GEBPrimeAuction)}
      {items.length < 32 && <div>More auctions to come...</div>}
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

export const BatchAuction: FC = () => {
  const { batchId } = useParams<{ batchId: string }>()
  const parsedBatchId = parseInt(batchId)
  return (
    <Container>
      <h2>{batchTitleMapping[parsedBatchId]}</h2>
      {parsedBatchId === 2 ? (
        <GEBBatch />
      ) : (
        <Batch batchId={parsedBatchId} />
      )}
    </Container>
  )
}
