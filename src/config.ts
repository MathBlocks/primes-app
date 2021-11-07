import {
  ChainId,
  Config as BaseConfig,
  useConfig,
  useEthers,
} from '@usedapp/core'

interface GraphQLEndpoints {
  subgraph: string
}

interface ContractAddresses {
  Primes: string
  PrimesAuctionHouse: string
  WETH: string
}

export interface Config extends BaseConfig {
  graphqlEndpoints: Partial<Record<ChainId, GraphQLEndpoints>>
  contracts: Partial<Record<ChainId, ContractAddresses>>
}

export const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      'https://mainnet.infura.io/v3/62bdcedba8ba449d9a795ef6310e713c',
    [ChainId.Rinkeby]:
      'https://rinkeby.infura.io/v3/62bdcedba8ba449d9a795ef6310e713c',
  },
  graphqlEndpoints: {
    [ChainId.Mainnet]: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/jameslefrere/stealth-launch-nft-shhh',
    },
    [ChainId.Rinkeby]: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/jameslefrere/stealth-launch-nft-shhh',
    },
  },
  contracts: {
    [ChainId.Mainnet]: {
      Primes: '0x652350a0dba48ac04c02e87f1f8d3c2b6b5ad857',
      PrimesAuctionHouse: '0x6cc5983d5c6aa01101d825c87526aa8bad5a06c1',
      WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
    [ChainId.Rinkeby]: {
      Primes: '0x652350a0dba48ac04c02e87f1f8d3c2b6b5ad857',
      PrimesAuctionHouse: '0x6cc5983d5c6aa01101d825c87526aa8bad5a06c1',
      WETH: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    },
  },
}

export const useGraphQlEndpoints = (): GraphQLEndpoints | undefined => {
  const { chainId } = useEthers()
  const config = useConfig() as Config
  return chainId ? config.graphqlEndpoints[chainId] : undefined
}

export const useContractAddresses = (): ContractAddresses | undefined => {
  const { chainId } = useEthers()
  const config = useConfig() as Config
  return chainId ? config.contracts[chainId] : undefined
}
