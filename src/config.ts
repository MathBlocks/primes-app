interface GraphQLEndpoints {
  subgraph: string
}

interface ContractAddresses {
  Primes: string
  PrimesAuctionHouse: string
  WETH: string
}

export interface Config {
  rpcUrl: Partial<Record<number, string>>
  graphqlEndpoints: Partial<Record<number, GraphQLEndpoints>>
  contracts: Partial<Record<number, ContractAddresses>>
}

export const CONFIG = {
  dappId: '4b17c546-62a0-4ccf-a13d-e9b6c360a814',
  rpcUrl: {
    1: 'https://mainnet.infura.io/v3/62bdcedba8ba449d9a795ef6310e713c',
    4: 'https://rinkeby.infura.io/v3/62bdcedba8ba449d9a795ef6310e713c',
  },
  graphqlEndpoints: {
    1: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/jameslefrere/stealth-launch-nft-shhh',
    },
    4: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/jameslefrere/stealth-launch-nft-shhh',
    },
  },
  contracts: {
    1: {
      Primes: '0x652350a0dba48ac04c02e87f1f8d3c2b6b5ad857',
      PrimesAuctionHouse:
        '0x6cc5983d5c6aa01101d825c87526aa8bad5a06c1',
      WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
    4: {
      Primes: '0xbaec44a9c60ed424b09f611b7d600c0847771f98',
      PrimesAuctionHouse:
        '0x3b018181bf16bed1c2fd9e5db38f544038e57e0c',
      WETH: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    },
  },
}
