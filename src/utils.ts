import { N_MAX } from './components/Primes/constants'

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
