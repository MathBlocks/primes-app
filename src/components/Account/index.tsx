import { FC } from 'react'
import styled from 'styled-components'

import { useOnboard } from '../App/OnboardProvider'
import { truncateAddress } from '../../utils'

import { usePrimesForAccountQuery } from '../../graphql/subgraph/subgraph'

const Container = styled.div`
  > div {
    display: flex;
    gap: 0.5rem;
  }
`

export const Account: FC<{ account?: string }> = ({
  account: account_,
}) => {
  const { address: myAccount } = useOnboard()
  const account = account_ ?? myAccount ?? undefined

  const primesQuery = usePrimesForAccountQuery({
    variables: { account: account as string },
    skip: !account,
  })

  return (
    <Container>
      <h3>{account ? truncateAddress(account) : 'No account'}</h3>
      <div>
        {primesQuery.data &&
          primesQuery.data.primes.map((prime) => (
            <div key={prime.id}>
              <img
                src={prime.image}
                alt={prime.id}
                width="128"
                height="128"
              />
            </div>
          ))}
      </div>
    </Container>
  )
}
