import { FC } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { usePrimeBatchQuery } from '../../graphql/subgraph/subgraph'
import { AccountLink } from '../AccountLink'

const batchTitleMapping: Record<number, string> = {
  0: `Fermat's Last Choice`,
  1: `Eratosthenes's Gold Sieve`,
  2: `Gödel Escher Batch: An Eternal Golden Raid`,
}

const Batch: FC<{ batchId: number }> = ({ batchId }) => {
  const primeBatchQuery = usePrimeBatchQuery({
    variables: { id: batchId.toString() },
  })
  const primeBatch = primeBatchQuery.data?.primeBatch
  return (
    <div>
      {primeBatch ? (
        <>
          <div>
            <div>Remaining</div>
            <div>{primeBatch.remaining}</div>
          </div>
          <div>
            <div>Active</div>
            <div>{primeBatch.active ? 'Yes' : 'No'}</div>
          </div>
          <div>
            <div>Whitelist</div>
            <div>
              {primeBatch.whitelist?.split(',').map((account) => (
                <AccountLink account={account} key={account} />
              ))}
            </div>
          </div>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  )
}

const Batch2: FC = () => {
  return <div>TODO 2</div>
}

const Container = styled.div``

export const BatchAuction: FC = () => {
  const { batchId } = useParams<{ batchId: string }>()
  const parsedBatchId = parseInt(batchId)
  return (
    <Container>
      <h2>{batchTitleMapping[parsedBatchId]}</h2>
      {parsedBatchId === 2 ? (
        <Batch2 />
      ) : (
        <Batch batchId={parsedBatchId} />
      )}
    </Container>
  )
}
