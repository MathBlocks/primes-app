import { FC } from 'react'
import styled from 'styled-components'

import { truncateAddress } from '../utils'

const Anchor = styled.a`
  font-weight: bold;
`

export const AccountLink: FC<{ account: string }> = ({
  account,
}) => (
  <Anchor
    className="monospace"
    href={`https://etherscan.io/address/${account}`}
  >
    {truncateAddress(account)}
  </Anchor>
)
