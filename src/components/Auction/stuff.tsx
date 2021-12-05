import { FC, useMemo } from 'react'
import { useEthers } from '@usedapp/core'

import { useContracts } from '../App/DAppContext'
import {
  createTreeWithAccounts,
  getAccountProof,
} from '../../merkleTree'
import { useContractFunction } from '../../hooks'
import { useAuctionStatusQuery } from '../../graphql/subgraph/subgraph'

const MintRandomPrimeButton: FC = () => {
  const { Primes } = useContracts<true>()
  const { account } = useEthers() as never as { account: string }

  const merkleProof = useMemo<string[]>(() => {
    // TODO get whitelist and make like a tree
    const whitelistTree = createTreeWithAccounts([account])
    return getAccountProof(whitelistTree, account)
  }, [account])

  const { send, state } = useContractFunction(
    Primes,
    'mintRandomPrime',
    {
      transactionName: 'Mint random Prime',
    },
  )

  return (
    <div>
      <button
        onClick={() => {
          send(merkleProof, { value: (1e17).toString() }).catch(
            (error) => {
              console.error(error)
            },
          )
        }}
      >
        Mint random prime
      </button>
      <span>{state.status}</span>
    </div>
  )
}

const RescueSaleButton: FC = () => {
  const { Primes } = useContracts<true>()

  const { send, state } = useContractFunction(Primes, 'rescueSale', {
    transactionName: 'Rescue sale',
  })

  return (
    <div>
      <button
        onClick={() => {
          send().catch((error) => {
            console.error(error)
          })
        }}
      >
        Rescue sale
      </button>
      <span>{state.status}</span>
    </div>
  )
}

const MintRandomPrime: FC = () => {
  const contracts = useContracts()
  const { account } = useEthers()
  return (
    <div>{contracts && account && <MintRandomPrimeButton />}</div>
  )
}

// const AuctionStatus: FC = () => {
//   const query = useAuctionStatusQuery({
//     // pollInterval: 30e3
//   })
//   const auctionHouse = query.data?.primesAuctionHouses[0]
//   const currentPrimeAuction = auctionHouse?.currentPrimeAuction
//   const primeBatches = query.data?.primeBatches
//
//   return (
//     <div>
//       <h3>Auction</h3>
//       {currentPrimeAuction && (
//         <div>
//           <h4>Current auction: {currentPrimeAuction.id}</h4>
//           <div>
//             {currentPrimeAuction.settled
//               ? 'Settled'
//               : currentPrimeAuction.endTime}
//           </div>
//         </div>
//       )}
//       {primeBatches?.map((pb) => (
//         <div key={pb.id}>
//           <div>Batch: {pb.id}</div>
//           <div>Remaining: {pb.remaining}</div>
//         </div>
//       ))}
//     </div>
//   )
// }

export {}
