import { FC } from 'react'
import { useRouteTokenId } from './PrimesContext'

export const SelectedPrimeSidebar: FC = () => {
  const [tokenId] = useRouteTokenId()
  return <div>{tokenId}</div>
}
