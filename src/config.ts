import {
  ChainId,
  Config as BaseConfig,
  useConfig,
  useEthers,
} from '@usedapp/core'

interface GraphQLEndpoints {
  subgraph: string
}

interface Config extends BaseConfig {
  graphqlEndpoints: Partial<Record<ChainId, GraphQLEndpoints>>
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
}

export const useGraphQlEndpoints = (): GraphQLEndpoints | undefined => {
  const { chainId } = useEthers()
  const config = useConfig() as Config
  return chainId ? config.graphqlEndpoints[chainId] : undefined
}
