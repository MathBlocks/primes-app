import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useOnboard } from '../App/OnboardProvider'

import { usePrimesForAccountQuery } from '../../graphql/subgraph/subgraph'
import { AccountLink } from '../AccountLink'

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
      <h3>
        {account ? (
          <AccountLink account={account} />
        ) : (
          'Not connected'
        )}
      </h3>
      <div>
        <h4>My Primes</h4>
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
