import { FC } from 'react'
import { useEthers } from '@usedapp/core'
import styled from 'styled-components'

import { truncateAddress } from '../../utils'

import { usePrimesForAccountQuery } from '../../graphql/subgraph/subgraph'

const Container = styled.div`
  > div {
    display: flex;
    gap: 0.5rem;
  }
`

export const Account: FC<{ account?: string }> = ({ account: account_ }) => {
  const { account: myAccount } = useEthers()
  const account = account_ ?? myAccount ?? undefined

  const primesQuery = usePrimesForAccountQuery({
    variables: { account: account?.toLowerCase() as string },
    skip: !account,
  })

  return (
    <Container>
      <h3>{account ? truncateAddress(account) : 'No account'}</h3>
      <div>
        {primesQuery.data &&
          primesQuery.data.primes.map((prime) => (
            <div key={prime.id}>
              <img src={prime.image} alt={prime.id} width="128" height="128" />
            </div>
          ))}
      </div>
    </Container>
  )
}
