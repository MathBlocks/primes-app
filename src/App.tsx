import React, { FC } from 'react'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

export const App: FC = () => {
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}
