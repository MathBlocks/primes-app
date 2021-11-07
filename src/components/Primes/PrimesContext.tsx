import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { createStateContext, useTimeoutFn, useTitle } from 'react-use'
import ReactTooltip from 'react-tooltip'

import { usePrimesFromLastIdQuery } from '../../graphql/subgraph/subgraph'
import { createExclusiveSet } from '../../utils'
import { generateAttributes, Attributes } from '../../attributes'
import { N_MAX } from './constants'

export const [useAttributes, AttributesProvider] = createStateContext<
  Attributes | undefined
>(undefined)

export const [useSelectedAttributes, SelectedAttributesProvider] =
  createStateContext<Partial<Record<keyof Attributes, boolean>>>({})

export const [useSelectedTokenId, SelectedTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

export const [useHoveredTokenId, HoveredTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

export const [useVisible, VisibleProvider] = createStateContext<Set<number>>(
  new Set(),
)

export const [useRouteTokenId, RouteTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

export const [useMintedPrimes, MintedPrimesProvider] = createStateContext<
  Set<number>
>(new Set())

const MintedPrimesUpdater: FC = () => {
  const [lastID, setLastID] = useState<string>('0')
  const [mintedPrimes, setMintedPrimes] = useMintedPrimes()

  // Just get this data cached
  usePrimesFromLastIdQuery({
    variables: { lastID },
    onCompleted: (data) => {
      if (!data.primes) return

      setMintedPrimes(
        new Set([
          ...mintedPrimes.values(),
          ...data.primes.map((p) => parseInt(p.id)),
        ]),
      )

      const last = data.primes[data.primes.length - 1]
      if (last?.id) {
        setLastID(last.id)
      }
    },
  })

  return null
}

const Updater: FC = () => {
  const [attributes, setAttributes] = useAttributes()
  const [selectedAttributes] = useSelectedAttributes()
  const [, setVisible] = useVisible()
  const [routeTokenId, setRouteTokenId] = useRouteTokenId()

  const { tokenId: tokenIdStr } = useParams<{ tokenId?: string }>()

  useTimeoutFn(() => {
    // Delay generating the attributes because it's heavy
    const attrs = generateAttributes()
    console.log(attrs)
    setAttributes(attrs)
  }, 1000)

  useEffect(() => {
    if (!selectedAttributes || !attributes) return

    const visible_ = createExclusiveSet(
      Object.entries(selectedAttributes)
        .filter(([, active]) => active)
        .map(([id]) => attributes[id as keyof Attributes]),
    )
    setVisible(visible_)
  }, [selectedAttributes, attributes, setVisible])

  useEffect(() => {
    const tokenId = tokenIdStr ? parseInt(tokenIdStr) : undefined
    const valid = tokenId && tokenId > 0 && tokenId < N_MAX
    setRouteTokenId(valid ? tokenId : undefined)
  }, [setRouteTokenId, tokenIdStr])

  useTitle(routeTokenId ? `Prime #${routeTokenId}` : 'Primes')

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [attributes])

  return null
}

export const PrimesContext: FC = ({ children }) => (
  <RouteTokenIdProvider>
    <MintedPrimesProvider>
      <AttributesProvider>
        <SelectedAttributesProvider>
          <VisibleProvider>
            <SelectedTokenIdProvider>
              <HoveredTokenIdProvider>
                {children}
                <Updater />
                <MintedPrimesUpdater />
              </HoveredTokenIdProvider>
            </SelectedTokenIdProvider>
          </VisibleProvider>
        </SelectedAttributesProvider>
      </AttributesProvider>
    </MintedPrimesProvider>
  </RouteTokenIdProvider>
)
