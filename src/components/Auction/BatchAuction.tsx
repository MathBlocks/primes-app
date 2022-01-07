import { FC } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { Batch } from './Batch'
import { GEBBatch } from './GEB'

const batchTitleMapping: Record<number, string> = {
  0: `Fermat's Last Choice`,
  1: `Eratosthenes's Gold Sieve`,
  2: `Gödel Escher Batch: An Eternal Golden Raid`,
}

const Container = styled.div`
  h2 {
    margin-bottom: 4rem;
  }
`

export const BatchAuction: FC = () => {
  const { batchId } = useParams<{ batchId: string }>()
  const parsedBatchId = parseInt(batchId)
  return (
    <Container>
      <h2>{batchTitleMapping[parsedBatchId]}</h2>
      <div>
        {parsedBatchId === 2 ? (
          <GEBBatch />
        ) : (
          <Batch batchId={parsedBatchId} />
        )}
      </div>
    </Container>
  )
}
