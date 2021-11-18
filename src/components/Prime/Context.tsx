import { createStateContext, useTitle } from 'react-use'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { N_MAX } from '../Primes/constants'

export const [useRouteTokenId, RouteTokenIdProvider] =
  createStateContext<number>(404)

const Updater: FC = () => {
  const [routeTokenId, setRouteTokenId] = useRouteTokenId()

  const { tokenId: tokenIdStr } = useParams<{ tokenId: string }>()

  useEffect(() => {
    const tokenId = parseInt(tokenIdStr)
    const valid = tokenId && tokenId > 0 && tokenId < N_MAX
    setRouteTokenId(valid ? tokenId : 404)
  }, [setRouteTokenId, tokenIdStr])

  useTitle(routeTokenId ? `Prime #${routeTokenId}` : 'Primes')

  return null
}

export const Context: FC = ({ children }) => (
  <RouteTokenIdProvider>
    <Updater />
    {children}
  </RouteTokenIdProvider>
)
