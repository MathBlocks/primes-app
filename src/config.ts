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
    1: 'https://mainnet.infura.io/v3/84c26c063d1f447093e3333b74674ec3',
    4: 'https://rinkeby.infura.io/v3/84c26c063d1f447093e3333b74674ec3',
  },
  graphqlEndpoints: {
    1: {
      subgraph:
        // FIXME
        // 'https://api.thegraph.com/subgraphs/name/jameslefrere/primes',
        'https://api.thegraph.com/subgraphs/name/jameslefrere/stealth-launch-nft-shhh',
    },
    4: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/jameslefrere/stealth-launch-nft-shhh',
    },
  },
  contracts: {
    1: {
      Primes: '0xBDA937F5C5f4eFB2261b6FcD25A71A1C350FdF20',
      PrimesAuctionHouse:
        '0xBDA937F5C5f4eFB2261b6FcD25A71A1C350FdF20', // FIXME wait for deploy
      WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
    4: {
      Primes: '0x43a8afe3b4d3b792e38545b3dd4504ba532f5707',
      PrimesAuctionHouse:
        '0x67b5657538ebba1860adc584c9a2785f0bec8f16',
      WETH: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    },
  },
}
