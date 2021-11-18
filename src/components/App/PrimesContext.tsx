import { FC, useEffect, useRef, useState } from 'react'
import { createStateContext, useEffectOnce } from 'react-use'
import ReactTooltip from 'react-tooltip'
import { useEthers } from '@usedapp/core'

import {
  usePrimesForAccountQuery,
  usePrimesFromLastIdQuery,
} from '../../graphql/subgraph/subgraph'
import { createExclusiveSet } from '../../utils'
import { generateAttributes, Attributes } from '../../attributes'

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

export const [useMyPrimes, MyPrimesProvider] = createStateContext<{
  enabled: boolean
  set: Set<number>
}>({ enabled: false, set: new Set() })

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

const MyPrimesUpdater: FC = () => {
  const { account } = useEthers()
  const { data } = usePrimesForAccountQuery({
    variables: { account: account?.toLowerCase() as string },
    skip: !account,
  })
  const [myPrimes, setMyPrimes] = useMyPrimes()
  const myPrimes_ = useRef(myPrimes)

  useEffect(() => {
    const items: number[] = (data?.primes ?? []).map((p) => parseInt(p.id))

    setMyPrimes({
      enabled: myPrimes_.current.enabled,
      set: new Set<number>(items),
    })
  }, [setMyPrimes, data])

  return null
}

const Updater: FC = () => {
  const [attributes, setAttributes] = useAttributes()
  const [selectedAttributes] = useSelectedAttributes()
  const [myPrimes] = useMyPrimes()
  const [, setVisible] = useVisible()

  // Get attributes from localStorage, or generate and store them
  useEffectOnce(() => {
    let attributes_: Attributes

    const item = localStorage.getItem('attributes')
    if (item) {
      const jsonEntries = JSON.parse(item) as [keyof Attributes, number[]][]
      const setEntries = jsonEntries.map<[keyof Attributes, Set<number>]>(
        ([key, numbers]) => [key, new Set<number>(numbers)],
      )
      attributes_ = Object.fromEntries(setEntries) as unknown as Attributes
    } else {
      attributes_ = generateAttributes()
      localStorage.setItem(
        'attributes',
        JSON.stringify(
          Object.entries(attributes_).map(([key, set]) => [
            key,
            [...set.values()],
          ]),
        ),
      )
    }
    // (window as any).attributes = attributes_
    setAttributes(attributes_)
  })

  useEffect(() => {
    if (!selectedAttributes || !attributes) return

    const sets = Object.entries(selectedAttributes)
      .filter(([, active]) => active)
      .map(([id]) => attributes[id as keyof Attributes])

    if (myPrimes.enabled) sets.push(myPrimes.set)

    const visible_ = createExclusiveSet(sets)

    setVisible(visible_)
  }, [selectedAttributes, attributes, setVisible, myPrimes])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [attributes])

  return null
}

export const PrimesContext: FC = ({ children }) => (
  <MintedPrimesProvider>
    <AttributesProvider>
      <SelectedAttributesProvider>
        <VisibleProvider>
          <MyPrimesProvider>
            <SelectedTokenIdProvider>
              <HoveredTokenIdProvider>
                {children}
                <Updater />
                <MintedPrimesUpdater />
                <MyPrimesUpdater />
              </HoveredTokenIdProvider>
            </SelectedTokenIdProvider>
          </MyPrimesProvider>
        </VisibleProvider>
      </SelectedAttributesProvider>
    </AttributesProvider>
  </MintedPrimesProvider>
)
