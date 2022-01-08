import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { truncateAddress } from '../utils'

const Anchor = styled.a`
  font-weight: bold;
`

export const AccountLink: FC<{
  account: string
  etherscan?: boolean
}> = ({ account, etherscan }) =>
  etherscan ? (
    <Anchor
      className="monospace"
      href={`https://etherscan.io/address/${account}`}
    >
      {truncateAddress(account)}
    </Anchor>
  ) : (
    <Link className="monospace" to={`/primes/account/${account}`}>
      {truncateAddress(account)}
    </Link>
  )
