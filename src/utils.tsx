import { FC, ReactElement, ReactNode } from 'react'

import { N_MAX } from './components/Primes/constants'

export const composeComponents = (
  components: FC[],
  subComponent: ReactElement | ReactNode,
): ReactElement =>
  components
    .reverse()
    .reduce(
      (prev, Component) => <Component>{prev}</Component>,
      subComponent,
    ) as ReactElement

export const composedComponent =
  (...components: FC[]): FC =>
  ({ children }) =>
    composeComponents(components, children)

export const createExclusiveSet = (sets: Set<number>[]): Set<number> => {
  const result = new Set<number>()
  for (let i = 1; i <= N_MAX; i++) {
    if (sets.every((set) => set.has(i))) {
      result.add(i)
    }
  }
  return result
}

export const truncateAddress = (address: string): string =>
  `${address.slice(0, 6)}…${address.slice(-4)}`
