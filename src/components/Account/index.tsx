import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useOnboard } from '../App/OnboardProvider'

import { usePrimesForAccountQuery } from '../../graphql/subgraph/subgraph'
import { AccountLink } from '../AccountLink'
import { useParams } from 'react-router'

const Container = styled.div`
  .primes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .prime {
    a {
      border-bottom: 0;
    }
    img {
      max-width: 175px;
      height: auto;
    }
  }
`

export const Account: FC = () => {
  const { account: accountParam } = useParams<{ account?: string }>()
  const { address: myAccount } = useOnboard()
  const account = accountParam ?? myAccount ?? undefined

  const primesQuery = usePrimesForAccountQuery({
    variables: { account: (account as string).toLowerCase() },
    skip: !account,
  })

  return (
    <Container>
      <div>
        <h3>
          Primes owned{' '}
          {account && (
            <>
              by <AccountLink account={account} />
            </>
          )}
        </h3>
        <div className="primes">
          {primesQuery.data &&
            primesQuery.data.primes.map((prime) => (
              <div className="prime" key={prime.id}>
                <Link to={`/primes/${prime.id}`}>
                  <img src={prime.image} alt={prime.id} />
                  <div>{prime.id}</div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Container>
  )
}
