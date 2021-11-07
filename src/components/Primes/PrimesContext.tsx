import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { createStateContext, useTimeoutFn, useTitle } from 'react-use'
import ReactTooltip from 'react-tooltip'

import { generateAttributes, Attributes } from '../../attributes'
import { N_MAX } from './constants'

const createExclusiveSet = (sets: Set<number>[]): Set<number> => {
  const result = new Set<number>()
  for (let i = 1; i <= N_MAX; i++) {
    if (sets.every((set) => set.has(i))) {
      result.add(i)
    }
  }
  return result
}

export const [useAttributes, AttributesProvider] = createStateContext<
  Attributes | undefined
>(undefined)

export const [useSelectedAttributes, SelectedAttributesProvider] =
  createStateContext<Partial<Record<keyof Attributes, boolean>>>({})

export const [useSelectedTokenId, SelectedTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

export const [useVisible, VisibleProvider] = createStateContext<Set<number>>(
  new Set(),
)

export const [useRouteTokenId, RouteTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

const Updater: FC = () => {
  const [attributes, setAttributes] = useAttributes()
  const [selectedAttributes] = useSelectedAttributes()
  const [, setVisible] = useVisible()
  const [routeTokenId, setRouteTokenId] = useRouteTokenId()

  const { tokenId: tokenIdStr } = useParams<{ tokenId?: string }>()

  useTimeoutFn(() => {
    // Delay generating the attributes because it's heavy
    setAttributes(generateAttributes())
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
    <AttributesProvider>
      <SelectedAttributesProvider>
        <VisibleProvider>
          <SelectedTokenIdProvider>
            {children}
            <Updater />
          </SelectedTokenIdProvider>
        </VisibleProvider>
      </SelectedAttributesProvider>
    </AttributesProvider>
  </RouteTokenIdProvider>
)
