import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: string;
  Bytes: string;
};

export type Account = {
  address: Scalars['Bytes'];
  id: Scalars['ID'];
  primeAuctionBids: Array<PrimeAuctionBid>;
  primes: Array<Prime>;
};


export type AccountPrimeAuctionBidsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeAuctionBid_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PrimeAuctionBid_Filter>;
};


export type AccountPrimesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};

export type Account_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Account_OrderBy {
  Address = 'address',
  Id = 'id',
  PrimeAuctionBids = 'primeAuctionBids',
  Primes = 'primes'
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Prime = {
  childrenAsParent1: Array<Prime>;
  childrenAsParent2: Array<Prime>;
  claimed: Scalars['Boolean'];
  colossallyAbundantNumber: Scalars['Boolean'];
  cousins: Array<Prime>;
  deadline?: Maybe<Scalars['BigInt']>;
  emirp: Scalars['Boolean'];
  eulersLuckyNumber: Scalars['Boolean'];
  evilNumber: Scalars['Boolean'];
  fibonacciNumber: Scalars['Boolean'];
  friendlyNumber: Scalars['Boolean'];
  frugalNumber: Scalars['Boolean'];
  goodPrime: Scalars['Boolean'];
  happyNumber: Scalars['Boolean'];
  harshadNumber: Scalars['Boolean'];
  id: Scalars['ID'];
  image: Scalars['String'];
  isListed: Scalars['Boolean'];
  isPrime: Scalars['Boolean'];
  isRentable: Scalars['Boolean'];
  lastBred: Scalars['BigInt'];
  luckyNumber: Scalars['Boolean'];
  magicNumber: Scalars['Boolean'];
  number: Scalars['Int'];
  owner: Account;
  parent1?: Maybe<Prime>;
  parent2?: Maybe<Prime>;
  perfectNumber: Scalars['Boolean'];
  primeFactorCount: Scalars['Int'];
  primeFactors: Array<Scalars['Int']>;
  primeIndex?: Maybe<Scalars['Int']>;
  repdigitNumber: Scalars['Boolean'];
  semiperfectNumber: Scalars['Boolean'];
  sexyPrimes: Array<Prime>;
  sophieGermainPrime: Scalars['Boolean'];
  squareNumber: Scalars['Boolean'];
  strongPrime: Scalars['Boolean'];
  studFee?: Maybe<Scalars['BigInt']>;
  suitors: Array<Prime>;
  taxicabNumber: Scalars['Boolean'];
  triangularNumber: Scalars['Boolean'];
  twins: Array<Prime>;
  uniquePrime: Scalars['Boolean'];
  untouchableNumber: Scalars['Boolean'];
  weirdNumber: Scalars['Boolean'];
  whitelistOnly: Scalars['Boolean'];
};


export type PrimeChildrenAsParent1Args = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};


export type PrimeChildrenAsParent2Args = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};


export type PrimeCousinsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};


export type PrimeSexyPrimesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};


export type PrimeSuitorsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};


export type PrimeTwinsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Prime_Filter>;
};

export type PrimeAuction = {
  amount?: Maybe<Scalars['BigInt']>;
  bidder?: Maybe<Account>;
  bids: Array<PrimeAuctionBid>;
  endTime: Scalars['BigInt'];
  extended: Scalars['Boolean'];
  id: Scalars['ID'];
  prime: Prime;
  settled: Scalars['Boolean'];
  startTime: Scalars['BigInt'];
  winner?: Maybe<Account>;
};


export type PrimeAuctionBidsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeAuctionBid_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PrimeAuctionBid_Filter>;
};

export type PrimeAuctionBid = {
  id: Scalars['ID'];
  primeAuction: PrimeAuction;
  sender: Account;
  timestamp: Scalars['BigInt'];
  value: Scalars['BigInt'];
};

export type PrimeAuctionBid_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  primeAuction?: Maybe<Scalars['String']>;
  primeAuction_contains?: Maybe<Scalars['String']>;
  primeAuction_ends_with?: Maybe<Scalars['String']>;
  primeAuction_gt?: Maybe<Scalars['String']>;
  primeAuction_gte?: Maybe<Scalars['String']>;
  primeAuction_in?: Maybe<Array<Scalars['String']>>;
  primeAuction_lt?: Maybe<Scalars['String']>;
  primeAuction_lte?: Maybe<Scalars['String']>;
  primeAuction_not?: Maybe<Scalars['String']>;
  primeAuction_not_contains?: Maybe<Scalars['String']>;
  primeAuction_not_ends_with?: Maybe<Scalars['String']>;
  primeAuction_not_in?: Maybe<Array<Scalars['String']>>;
  primeAuction_not_starts_with?: Maybe<Scalars['String']>;
  primeAuction_starts_with?: Maybe<Scalars['String']>;
  sender?: Maybe<Scalars['String']>;
  sender_contains?: Maybe<Scalars['String']>;
  sender_ends_with?: Maybe<Scalars['String']>;
  sender_gt?: Maybe<Scalars['String']>;
  sender_gte?: Maybe<Scalars['String']>;
  sender_in?: Maybe<Array<Scalars['String']>>;
  sender_lt?: Maybe<Scalars['String']>;
  sender_lte?: Maybe<Scalars['String']>;
  sender_not?: Maybe<Scalars['String']>;
  sender_not_contains?: Maybe<Scalars['String']>;
  sender_not_ends_with?: Maybe<Scalars['String']>;
  sender_not_in?: Maybe<Array<Scalars['String']>>;
  sender_not_starts_with?: Maybe<Scalars['String']>;
  sender_starts_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  value?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PrimeAuctionBid_OrderBy {
  Id = 'id',
  PrimeAuction = 'primeAuction',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Value = 'value'
}

export type PrimeAuction_Filter = {
  amount?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_not?: Maybe<Scalars['BigInt']>;
  amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  bidder?: Maybe<Scalars['String']>;
  bidder_contains?: Maybe<Scalars['String']>;
  bidder_ends_with?: Maybe<Scalars['String']>;
  bidder_gt?: Maybe<Scalars['String']>;
  bidder_gte?: Maybe<Scalars['String']>;
  bidder_in?: Maybe<Array<Scalars['String']>>;
  bidder_lt?: Maybe<Scalars['String']>;
  bidder_lte?: Maybe<Scalars['String']>;
  bidder_not?: Maybe<Scalars['String']>;
  bidder_not_contains?: Maybe<Scalars['String']>;
  bidder_not_ends_with?: Maybe<Scalars['String']>;
  bidder_not_in?: Maybe<Array<Scalars['String']>>;
  bidder_not_starts_with?: Maybe<Scalars['String']>;
  bidder_starts_with?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['BigInt']>;
  endTime_gt?: Maybe<Scalars['BigInt']>;
  endTime_gte?: Maybe<Scalars['BigInt']>;
  endTime_in?: Maybe<Array<Scalars['BigInt']>>;
  endTime_lt?: Maybe<Scalars['BigInt']>;
  endTime_lte?: Maybe<Scalars['BigInt']>;
  endTime_not?: Maybe<Scalars['BigInt']>;
  endTime_not_in?: Maybe<Array<Scalars['BigInt']>>;
  extended?: Maybe<Scalars['Boolean']>;
  extended_in?: Maybe<Array<Scalars['Boolean']>>;
  extended_not?: Maybe<Scalars['Boolean']>;
  extended_not_in?: Maybe<Array<Scalars['Boolean']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  prime?: Maybe<Scalars['String']>;
  prime_contains?: Maybe<Scalars['String']>;
  prime_ends_with?: Maybe<Scalars['String']>;
  prime_gt?: Maybe<Scalars['String']>;
  prime_gte?: Maybe<Scalars['String']>;
  prime_in?: Maybe<Array<Scalars['String']>>;
  prime_lt?: Maybe<Scalars['String']>;
  prime_lte?: Maybe<Scalars['String']>;
  prime_not?: Maybe<Scalars['String']>;
  prime_not_contains?: Maybe<Scalars['String']>;
  prime_not_ends_with?: Maybe<Scalars['String']>;
  prime_not_in?: Maybe<Array<Scalars['String']>>;
  prime_not_starts_with?: Maybe<Scalars['String']>;
  prime_starts_with?: Maybe<Scalars['String']>;
  settled?: Maybe<Scalars['Boolean']>;
  settled_in?: Maybe<Array<Scalars['Boolean']>>;
  settled_not?: Maybe<Scalars['Boolean']>;
  settled_not_in?: Maybe<Array<Scalars['Boolean']>>;
  startTime?: Maybe<Scalars['BigInt']>;
  startTime_gt?: Maybe<Scalars['BigInt']>;
  startTime_gte?: Maybe<Scalars['BigInt']>;
  startTime_in?: Maybe<Array<Scalars['BigInt']>>;
  startTime_lt?: Maybe<Scalars['BigInt']>;
  startTime_lte?: Maybe<Scalars['BigInt']>;
  startTime_not?: Maybe<Scalars['BigInt']>;
  startTime_not_in?: Maybe<Array<Scalars['BigInt']>>;
  winner?: Maybe<Scalars['String']>;
  winner_contains?: Maybe<Scalars['String']>;
  winner_ends_with?: Maybe<Scalars['String']>;
  winner_gt?: Maybe<Scalars['String']>;
  winner_gte?: Maybe<Scalars['String']>;
  winner_in?: Maybe<Array<Scalars['String']>>;
  winner_lt?: Maybe<Scalars['String']>;
  winner_lte?: Maybe<Scalars['String']>;
  winner_not?: Maybe<Scalars['String']>;
  winner_not_contains?: Maybe<Scalars['String']>;
  winner_not_ends_with?: Maybe<Scalars['String']>;
  winner_not_in?: Maybe<Array<Scalars['String']>>;
  winner_not_starts_with?: Maybe<Scalars['String']>;
  winner_starts_with?: Maybe<Scalars['String']>;
};

export enum PrimeAuction_OrderBy {
  Amount = 'amount',
  Bidder = 'bidder',
  Bids = 'bids',
  EndTime = 'endTime',
  Extended = 'extended',
  Id = 'id',
  Prime = 'prime',
  Settled = 'settled',
  StartTime = 'startTime',
  Winner = 'winner'
}

export type PrimeBatch = {
  active: Scalars['Boolean'];
  id: Scalars['ID'];
  remaining: Scalars['Int'];
  whitelist?: Maybe<Scalars['Bytes']>;
};

export type PrimeBatch_Filter = {
  active?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  remaining?: Maybe<Scalars['Int']>;
  remaining_gt?: Maybe<Scalars['Int']>;
  remaining_gte?: Maybe<Scalars['Int']>;
  remaining_in?: Maybe<Array<Scalars['Int']>>;
  remaining_lt?: Maybe<Scalars['Int']>;
  remaining_lte?: Maybe<Scalars['Int']>;
  remaining_not?: Maybe<Scalars['Int']>;
  remaining_not_in?: Maybe<Array<Scalars['Int']>>;
  whitelist?: Maybe<Scalars['Bytes']>;
  whitelist_contains?: Maybe<Scalars['Bytes']>;
  whitelist_in?: Maybe<Array<Scalars['Bytes']>>;
  whitelist_not?: Maybe<Scalars['Bytes']>;
  whitelist_not_contains?: Maybe<Scalars['Bytes']>;
  whitelist_not_in?: Maybe<Array<Scalars['Bytes']>>;
};

export enum PrimeBatch_OrderBy {
  Active = 'active',
  Id = 'id',
  Remaining = 'remaining',
  Whitelist = 'whitelist'
}

export type Prime_Filter = {
  claimed?: Maybe<Scalars['Boolean']>;
  claimed_in?: Maybe<Array<Scalars['Boolean']>>;
  claimed_not?: Maybe<Scalars['Boolean']>;
  claimed_not_in?: Maybe<Array<Scalars['Boolean']>>;
  colossallyAbundantNumber?: Maybe<Scalars['Boolean']>;
  colossallyAbundantNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  colossallyAbundantNumber_not?: Maybe<Scalars['Boolean']>;
  colossallyAbundantNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  cousins?: Maybe<Array<Scalars['String']>>;
  cousins_contains?: Maybe<Array<Scalars['String']>>;
  cousins_not?: Maybe<Array<Scalars['String']>>;
  cousins_not_contains?: Maybe<Array<Scalars['String']>>;
  deadline?: Maybe<Scalars['BigInt']>;
  deadline_gt?: Maybe<Scalars['BigInt']>;
  deadline_gte?: Maybe<Scalars['BigInt']>;
  deadline_in?: Maybe<Array<Scalars['BigInt']>>;
  deadline_lt?: Maybe<Scalars['BigInt']>;
  deadline_lte?: Maybe<Scalars['BigInt']>;
  deadline_not?: Maybe<Scalars['BigInt']>;
  deadline_not_in?: Maybe<Array<Scalars['BigInt']>>;
  emirp?: Maybe<Scalars['Boolean']>;
  emirp_in?: Maybe<Array<Scalars['Boolean']>>;
  emirp_not?: Maybe<Scalars['Boolean']>;
  emirp_not_in?: Maybe<Array<Scalars['Boolean']>>;
  eulersLuckyNumber?: Maybe<Scalars['Boolean']>;
  eulersLuckyNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  eulersLuckyNumber_not?: Maybe<Scalars['Boolean']>;
  eulersLuckyNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  evilNumber?: Maybe<Scalars['Boolean']>;
  evilNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  evilNumber_not?: Maybe<Scalars['Boolean']>;
  evilNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  fibonacciNumber?: Maybe<Scalars['Boolean']>;
  fibonacciNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  fibonacciNumber_not?: Maybe<Scalars['Boolean']>;
  fibonacciNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  friendlyNumber?: Maybe<Scalars['Boolean']>;
  friendlyNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  friendlyNumber_not?: Maybe<Scalars['Boolean']>;
  friendlyNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  frugalNumber?: Maybe<Scalars['Boolean']>;
  frugalNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  frugalNumber_not?: Maybe<Scalars['Boolean']>;
  frugalNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  goodPrime?: Maybe<Scalars['Boolean']>;
  goodPrime_in?: Maybe<Array<Scalars['Boolean']>>;
  goodPrime_not?: Maybe<Scalars['Boolean']>;
  goodPrime_not_in?: Maybe<Array<Scalars['Boolean']>>;
  happyNumber?: Maybe<Scalars['Boolean']>;
  happyNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  happyNumber_not?: Maybe<Scalars['Boolean']>;
  happyNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  harshadNumber?: Maybe<Scalars['Boolean']>;
  harshadNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  harshadNumber_not?: Maybe<Scalars['Boolean']>;
  harshadNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  image?: Maybe<Scalars['String']>;
  image_contains?: Maybe<Scalars['String']>;
  image_ends_with?: Maybe<Scalars['String']>;
  image_gt?: Maybe<Scalars['String']>;
  image_gte?: Maybe<Scalars['String']>;
  image_in?: Maybe<Array<Scalars['String']>>;
  image_lt?: Maybe<Scalars['String']>;
  image_lte?: Maybe<Scalars['String']>;
  image_not?: Maybe<Scalars['String']>;
  image_not_contains?: Maybe<Scalars['String']>;
  image_not_ends_with?: Maybe<Scalars['String']>;
  image_not_in?: Maybe<Array<Scalars['String']>>;
  image_not_starts_with?: Maybe<Scalars['String']>;
  image_starts_with?: Maybe<Scalars['String']>;
  isListed?: Maybe<Scalars['Boolean']>;
  isListed_in?: Maybe<Array<Scalars['Boolean']>>;
  isListed_not?: Maybe<Scalars['Boolean']>;
  isListed_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isPrime?: Maybe<Scalars['Boolean']>;
  isPrime_in?: Maybe<Array<Scalars['Boolean']>>;
  isPrime_not?: Maybe<Scalars['Boolean']>;
  isPrime_not_in?: Maybe<Array<Scalars['Boolean']>>;
  isRentable?: Maybe<Scalars['Boolean']>;
  isRentable_in?: Maybe<Array<Scalars['Boolean']>>;
  isRentable_not?: Maybe<Scalars['Boolean']>;
  isRentable_not_in?: Maybe<Array<Scalars['Boolean']>>;
  lastBred?: Maybe<Scalars['BigInt']>;
  lastBred_gt?: Maybe<Scalars['BigInt']>;
  lastBred_gte?: Maybe<Scalars['BigInt']>;
  lastBred_in?: Maybe<Array<Scalars['BigInt']>>;
  lastBred_lt?: Maybe<Scalars['BigInt']>;
  lastBred_lte?: Maybe<Scalars['BigInt']>;
  lastBred_not?: Maybe<Scalars['BigInt']>;
  lastBred_not_in?: Maybe<Array<Scalars['BigInt']>>;
  luckyNumber?: Maybe<Scalars['Boolean']>;
  luckyNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  luckyNumber_not?: Maybe<Scalars['Boolean']>;
  luckyNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  magicNumber?: Maybe<Scalars['Boolean']>;
  magicNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  magicNumber_not?: Maybe<Scalars['Boolean']>;
  magicNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  number?: Maybe<Scalars['Int']>;
  number_gt?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
  number_in?: Maybe<Array<Scalars['Int']>>;
  number_lt?: Maybe<Scalars['Int']>;
  number_lte?: Maybe<Scalars['Int']>;
  number_not?: Maybe<Scalars['Int']>;
  number_not_in?: Maybe<Array<Scalars['Int']>>;
  owner?: Maybe<Scalars['String']>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  parent1?: Maybe<Scalars['String']>;
  parent1_contains?: Maybe<Scalars['String']>;
  parent1_ends_with?: Maybe<Scalars['String']>;
  parent1_gt?: Maybe<Scalars['String']>;
  parent1_gte?: Maybe<Scalars['String']>;
  parent1_in?: Maybe<Array<Scalars['String']>>;
  parent1_lt?: Maybe<Scalars['String']>;
  parent1_lte?: Maybe<Scalars['String']>;
  parent1_not?: Maybe<Scalars['String']>;
  parent1_not_contains?: Maybe<Scalars['String']>;
  parent1_not_ends_with?: Maybe<Scalars['String']>;
  parent1_not_in?: Maybe<Array<Scalars['String']>>;
  parent1_not_starts_with?: Maybe<Scalars['String']>;
  parent1_starts_with?: Maybe<Scalars['String']>;
  parent2?: Maybe<Scalars['String']>;
  parent2_contains?: Maybe<Scalars['String']>;
  parent2_ends_with?: Maybe<Scalars['String']>;
  parent2_gt?: Maybe<Scalars['String']>;
  parent2_gte?: Maybe<Scalars['String']>;
  parent2_in?: Maybe<Array<Scalars['String']>>;
  parent2_lt?: Maybe<Scalars['String']>;
  parent2_lte?: Maybe<Scalars['String']>;
  parent2_not?: Maybe<Scalars['String']>;
  parent2_not_contains?: Maybe<Scalars['String']>;
  parent2_not_ends_with?: Maybe<Scalars['String']>;
  parent2_not_in?: Maybe<Array<Scalars['String']>>;
  parent2_not_starts_with?: Maybe<Scalars['String']>;
  parent2_starts_with?: Maybe<Scalars['String']>;
  perfectNumber?: Maybe<Scalars['Boolean']>;
  perfectNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  perfectNumber_not?: Maybe<Scalars['Boolean']>;
  perfectNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  primeFactorCount?: Maybe<Scalars['Int']>;
  primeFactorCount_gt?: Maybe<Scalars['Int']>;
  primeFactorCount_gte?: Maybe<Scalars['Int']>;
  primeFactorCount_in?: Maybe<Array<Scalars['Int']>>;
  primeFactorCount_lt?: Maybe<Scalars['Int']>;
  primeFactorCount_lte?: Maybe<Scalars['Int']>;
  primeFactorCount_not?: Maybe<Scalars['Int']>;
  primeFactorCount_not_in?: Maybe<Array<Scalars['Int']>>;
  primeFactors?: Maybe<Array<Scalars['Int']>>;
  primeFactors_contains?: Maybe<Array<Scalars['Int']>>;
  primeFactors_not?: Maybe<Array<Scalars['Int']>>;
  primeFactors_not_contains?: Maybe<Array<Scalars['Int']>>;
  primeIndex?: Maybe<Scalars['Int']>;
  primeIndex_gt?: Maybe<Scalars['Int']>;
  primeIndex_gte?: Maybe<Scalars['Int']>;
  primeIndex_in?: Maybe<Array<Scalars['Int']>>;
  primeIndex_lt?: Maybe<Scalars['Int']>;
  primeIndex_lte?: Maybe<Scalars['Int']>;
  primeIndex_not?: Maybe<Scalars['Int']>;
  primeIndex_not_in?: Maybe<Array<Scalars['Int']>>;
  repdigitNumber?: Maybe<Scalars['Boolean']>;
  repdigitNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  repdigitNumber_not?: Maybe<Scalars['Boolean']>;
  repdigitNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  semiperfectNumber?: Maybe<Scalars['Boolean']>;
  semiperfectNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  semiperfectNumber_not?: Maybe<Scalars['Boolean']>;
  semiperfectNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  sexyPrimes?: Maybe<Array<Scalars['String']>>;
  sexyPrimes_contains?: Maybe<Array<Scalars['String']>>;
  sexyPrimes_not?: Maybe<Array<Scalars['String']>>;
  sexyPrimes_not_contains?: Maybe<Array<Scalars['String']>>;
  sophieGermainPrime?: Maybe<Scalars['Boolean']>;
  sophieGermainPrime_in?: Maybe<Array<Scalars['Boolean']>>;
  sophieGermainPrime_not?: Maybe<Scalars['Boolean']>;
  sophieGermainPrime_not_in?: Maybe<Array<Scalars['Boolean']>>;
  squareNumber?: Maybe<Scalars['Boolean']>;
  squareNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  squareNumber_not?: Maybe<Scalars['Boolean']>;
  squareNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  strongPrime?: Maybe<Scalars['Boolean']>;
  strongPrime_in?: Maybe<Array<Scalars['Boolean']>>;
  strongPrime_not?: Maybe<Scalars['Boolean']>;
  strongPrime_not_in?: Maybe<Array<Scalars['Boolean']>>;
  studFee?: Maybe<Scalars['BigInt']>;
  studFee_gt?: Maybe<Scalars['BigInt']>;
  studFee_gte?: Maybe<Scalars['BigInt']>;
  studFee_in?: Maybe<Array<Scalars['BigInt']>>;
  studFee_lt?: Maybe<Scalars['BigInt']>;
  studFee_lte?: Maybe<Scalars['BigInt']>;
  studFee_not?: Maybe<Scalars['BigInt']>;
  studFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  suitors?: Maybe<Array<Scalars['String']>>;
  suitors_contains?: Maybe<Array<Scalars['String']>>;
  suitors_not?: Maybe<Array<Scalars['String']>>;
  suitors_not_contains?: Maybe<Array<Scalars['String']>>;
  taxicabNumber?: Maybe<Scalars['Boolean']>;
  taxicabNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  taxicabNumber_not?: Maybe<Scalars['Boolean']>;
  taxicabNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  triangularNumber?: Maybe<Scalars['Boolean']>;
  triangularNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  triangularNumber_not?: Maybe<Scalars['Boolean']>;
  triangularNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  twins?: Maybe<Array<Scalars['String']>>;
  twins_contains?: Maybe<Array<Scalars['String']>>;
  twins_not?: Maybe<Array<Scalars['String']>>;
  twins_not_contains?: Maybe<Array<Scalars['String']>>;
  uniquePrime?: Maybe<Scalars['Boolean']>;
  uniquePrime_in?: Maybe<Array<Scalars['Boolean']>>;
  uniquePrime_not?: Maybe<Scalars['Boolean']>;
  uniquePrime_not_in?: Maybe<Array<Scalars['Boolean']>>;
  untouchableNumber?: Maybe<Scalars['Boolean']>;
  untouchableNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  untouchableNumber_not?: Maybe<Scalars['Boolean']>;
  untouchableNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  weirdNumber?: Maybe<Scalars['Boolean']>;
  weirdNumber_in?: Maybe<Array<Scalars['Boolean']>>;
  weirdNumber_not?: Maybe<Scalars['Boolean']>;
  weirdNumber_not_in?: Maybe<Array<Scalars['Boolean']>>;
  whitelistOnly?: Maybe<Scalars['Boolean']>;
  whitelistOnly_in?: Maybe<Array<Scalars['Boolean']>>;
  whitelistOnly_not?: Maybe<Scalars['Boolean']>;
  whitelistOnly_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum Prime_OrderBy {
  ChildrenAsParent1 = 'childrenAsParent1',
  ChildrenAsParent2 = 'childrenAsParent2',
  Claimed = 'claimed',
  ColossallyAbundantNumber = 'colossallyAbundantNumber',
  Cousins = 'cousins',
  Deadline = 'deadline',
  Emirp = 'emirp',
  EulersLuckyNumber = 'eulersLuckyNumber',
  EvilNumber = 'evilNumber',
  FibonacciNumber = 'fibonacciNumber',
  FriendlyNumber = 'friendlyNumber',
  FrugalNumber = 'frugalNumber',
  GoodPrime = 'goodPrime',
  HappyNumber = 'happyNumber',
  HarshadNumber = 'harshadNumber',
  Id = 'id',
  Image = 'image',
  IsListed = 'isListed',
  IsPrime = 'isPrime',
  IsRentable = 'isRentable',
  LastBred = 'lastBred',
  LuckyNumber = 'luckyNumber',
  MagicNumber = 'magicNumber',
  Number = 'number',
  Owner = 'owner',
  Parent1 = 'parent1',
  Parent2 = 'parent2',
  PerfectNumber = 'perfectNumber',
  PrimeFactorCount = 'primeFactorCount',
  PrimeFactors = 'primeFactors',
  PrimeIndex = 'primeIndex',
  RepdigitNumber = 'repdigitNumber',
  SemiperfectNumber = 'semiperfectNumber',
  SexyPrimes = 'sexyPrimes',
  SophieGermainPrime = 'sophieGermainPrime',
  SquareNumber = 'squareNumber',
  StrongPrime = 'strongPrime',
  StudFee = 'studFee',
  Suitors = 'suitors',
  TaxicabNumber = 'taxicabNumber',
  TriangularNumber = 'triangularNumber',
  Twins = 'twins',
  UniquePrime = 'uniquePrime',
  UntouchableNumber = 'untouchableNumber',
  WeirdNumber = 'weirdNumber',
  WhitelistOnly = 'whitelistOnly'
}

export type PrimesAuctionHouse = {
  address: Scalars['Bytes'];
  breedingCooldown: Scalars['BigInt'];
  currentPrimeAuction?: Maybe<PrimeAuction>;
  id: Scalars['ID'];
  minBidIncrementPercentage: Scalars['BigInt'];
  paused: Scalars['Boolean'];
  primes: Scalars['Bytes'];
  reservePrice: Scalars['BigInt'];
  timeBuffer: Scalars['BigInt'];
};

export type PrimesAuctionHouse_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  breedingCooldown?: Maybe<Scalars['BigInt']>;
  breedingCooldown_gt?: Maybe<Scalars['BigInt']>;
  breedingCooldown_gte?: Maybe<Scalars['BigInt']>;
  breedingCooldown_in?: Maybe<Array<Scalars['BigInt']>>;
  breedingCooldown_lt?: Maybe<Scalars['BigInt']>;
  breedingCooldown_lte?: Maybe<Scalars['BigInt']>;
  breedingCooldown_not?: Maybe<Scalars['BigInt']>;
  breedingCooldown_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentPrimeAuction?: Maybe<Scalars['String']>;
  currentPrimeAuction_contains?: Maybe<Scalars['String']>;
  currentPrimeAuction_ends_with?: Maybe<Scalars['String']>;
  currentPrimeAuction_gt?: Maybe<Scalars['String']>;
  currentPrimeAuction_gte?: Maybe<Scalars['String']>;
  currentPrimeAuction_in?: Maybe<Array<Scalars['String']>>;
  currentPrimeAuction_lt?: Maybe<Scalars['String']>;
  currentPrimeAuction_lte?: Maybe<Scalars['String']>;
  currentPrimeAuction_not?: Maybe<Scalars['String']>;
  currentPrimeAuction_not_contains?: Maybe<Scalars['String']>;
  currentPrimeAuction_not_ends_with?: Maybe<Scalars['String']>;
  currentPrimeAuction_not_in?: Maybe<Array<Scalars['String']>>;
  currentPrimeAuction_not_starts_with?: Maybe<Scalars['String']>;
  currentPrimeAuction_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  minBidIncrementPercentage?: Maybe<Scalars['BigInt']>;
  minBidIncrementPercentage_gt?: Maybe<Scalars['BigInt']>;
  minBidIncrementPercentage_gte?: Maybe<Scalars['BigInt']>;
  minBidIncrementPercentage_in?: Maybe<Array<Scalars['BigInt']>>;
  minBidIncrementPercentage_lt?: Maybe<Scalars['BigInt']>;
  minBidIncrementPercentage_lte?: Maybe<Scalars['BigInt']>;
  minBidIncrementPercentage_not?: Maybe<Scalars['BigInt']>;
  minBidIncrementPercentage_not_in?: Maybe<Array<Scalars['BigInt']>>;
  paused?: Maybe<Scalars['Boolean']>;
  paused_in?: Maybe<Array<Scalars['Boolean']>>;
  paused_not?: Maybe<Scalars['Boolean']>;
  paused_not_in?: Maybe<Array<Scalars['Boolean']>>;
  primes?: Maybe<Scalars['Bytes']>;
  primes_contains?: Maybe<Scalars['Bytes']>;
  primes_in?: Maybe<Array<Scalars['Bytes']>>;
  primes_not?: Maybe<Scalars['Bytes']>;
  primes_not_contains?: Maybe<Scalars['Bytes']>;
  primes_not_in?: Maybe<Array<Scalars['Bytes']>>;
  reservePrice?: Maybe<Scalars['BigInt']>;
  reservePrice_gt?: Maybe<Scalars['BigInt']>;
  reservePrice_gte?: Maybe<Scalars['BigInt']>;
  reservePrice_in?: Maybe<Array<Scalars['BigInt']>>;
  reservePrice_lt?: Maybe<Scalars['BigInt']>;
  reservePrice_lte?: Maybe<Scalars['BigInt']>;
  reservePrice_not?: Maybe<Scalars['BigInt']>;
  reservePrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timeBuffer?: Maybe<Scalars['BigInt']>;
  timeBuffer_gt?: Maybe<Scalars['BigInt']>;
  timeBuffer_gte?: Maybe<Scalars['BigInt']>;
  timeBuffer_in?: Maybe<Array<Scalars['BigInt']>>;
  timeBuffer_lt?: Maybe<Scalars['BigInt']>;
  timeBuffer_lte?: Maybe<Scalars['BigInt']>;
  timeBuffer_not?: Maybe<Scalars['BigInt']>;
  timeBuffer_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PrimesAuctionHouse_OrderBy {
  Address = 'address',
  BreedingCooldown = 'breedingCooldown',
  CurrentPrimeAuction = 'currentPrimeAuction',
  Id = 'id',
  MinBidIncrementPercentage = 'minBidIncrementPercentage',
  Paused = 'paused',
  Primes = 'primes',
  ReservePrice = 'reservePrice',
  TimeBuffer = 'timeBuffer'
}

export type Query = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  prime?: Maybe<Prime>;
  primeAuction?: Maybe<PrimeAuction>;
  primeAuctionBid?: Maybe<PrimeAuctionBid>;
  primeAuctionBids: Array<PrimeAuctionBid>;
  primeAuctions: Array<PrimeAuction>;
  primeBatch?: Maybe<PrimeBatch>;
  primeBatches: Array<PrimeBatch>;
  primes: Array<Prime>;
  primesAuctionHouse?: Maybe<PrimesAuctionHouse>;
  primesAuctionHouses: Array<PrimesAuctionHouse>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Account_Filter>;
};


export type QueryPrimeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPrimeAuctionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPrimeAuctionBidArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPrimeAuctionBidsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeAuctionBid_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimeAuctionBid_Filter>;
};


export type QueryPrimeAuctionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeAuction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimeAuction_Filter>;
};


export type QueryPrimeBatchArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPrimeBatchesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeBatch_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimeBatch_Filter>;
};


export type QueryPrimesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Prime_Filter>;
};


export type QueryPrimesAuctionHouseArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPrimesAuctionHousesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimesAuctionHouse_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimesAuctionHouse_Filter>;
};

export type Subscription = {
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  prime?: Maybe<Prime>;
  primeAuction?: Maybe<PrimeAuction>;
  primeAuctionBid?: Maybe<PrimeAuctionBid>;
  primeAuctionBids: Array<PrimeAuctionBid>;
  primeAuctions: Array<PrimeAuction>;
  primeBatch?: Maybe<PrimeBatch>;
  primeBatches: Array<PrimeBatch>;
  primes: Array<Prime>;
  primesAuctionHouse?: Maybe<PrimesAuctionHouse>;
  primesAuctionHouses: Array<PrimesAuctionHouse>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Account_Filter>;
};


export type SubscriptionPrimeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPrimeAuctionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPrimeAuctionBidArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPrimeAuctionBidsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeAuctionBid_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimeAuctionBid_Filter>;
};


export type SubscriptionPrimeAuctionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeAuction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimeAuction_Filter>;
};


export type SubscriptionPrimeBatchArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPrimeBatchesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimeBatch_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimeBatch_Filter>;
};


export type SubscriptionPrimesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Prime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Prime_Filter>;
};


export type SubscriptionPrimesAuctionHouseArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPrimesAuctionHousesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PrimesAuctionHouse_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<PrimesAuctionHouse_Filter>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type PrimeAttributesFragment = { colossallyAbundantNumber: boolean, emirp: boolean, eulersLuckyNumber: boolean, evilNumber: boolean, fibonacciNumber: boolean, friendlyNumber: boolean, frugalNumber: boolean, goodPrime: boolean, happyNumber: boolean, harshadNumber: boolean, luckyNumber: boolean, magicNumber: boolean, perfectNumber: boolean, repdigitNumber: boolean, semiperfectNumber: boolean, sophieGermainPrime: boolean, squareNumber: boolean, strongPrime: boolean, taxicabNumber: boolean, triangularNumber: boolean, uniquePrime: boolean, untouchableNumber: boolean, weirdNumber: boolean };

export type PrimeAllFragment = { id: string, claimed: boolean, deadline?: string | null | undefined, image: string, isListed: boolean, isPrime: boolean, isRentable: boolean, lastBred: string, primeFactorCount: number, primeIndex?: number | null | undefined, primeFactors: Array<number>, studFee?: string | null | undefined, whitelistOnly: boolean, childrenAsParent1: Array<{ id: string }>, childrenAsParent2: Array<{ id: string }>, cousins: Array<{ id: string }>, owner: { id: string, address: string }, parent1?: { id: string } | null | undefined, parent2?: { id: string } | null | undefined, sexyPrimes: Array<{ id: string }>, suitors: Array<{ id: string }>, twins: Array<{ id: string }> };

export type PrimeQueryVariables = Exact<{
  tokenId: Scalars['ID'];
}>;


export type PrimeQuery = { prime?: { id: string, claimed: boolean, deadline?: string | null | undefined, image: string, isListed: boolean, isPrime: boolean, isRentable: boolean, lastBred: string, primeFactorCount: number, primeIndex?: number | null | undefined, primeFactors: Array<number>, studFee?: string | null | undefined, whitelistOnly: boolean, childrenAsParent1: Array<{ id: string }>, childrenAsParent2: Array<{ id: string }>, cousins: Array<{ id: string }>, owner: { id: string, address: string }, parent1?: { id: string } | null | undefined, parent2?: { id: string } | null | undefined, sexyPrimes: Array<{ id: string }>, suitors: Array<{ id: string }>, twins: Array<{ id: string }> } | null | undefined };

export type PrimesFromLastIdQueryVariables = Exact<{
  lastID: Scalars['ID'];
}>;


export type PrimesFromLastIdQuery = { primes: Array<{ id: string }> };

export type AllPrimesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPrimesQuery = { primes: Array<{ id: string }> };

export type ListedPrimesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListedPrimesQuery = { primes: Array<{ id: string, isRentable: boolean, whitelistOnly: boolean, studFee?: string | null | undefined, deadline?: string | null | undefined, suitors: Array<{ id: string }> }> };

export type PrimeAuctionAllFragment = { id: string, amount?: string | null | undefined, settled: boolean, startTime: string, endTime: string, bidder?: { id: string } | null | undefined, winner?: { id: string } | null | undefined };

export type PrimeAuctionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PrimeAuctionQuery = { primeAuction?: { id: string, amount?: string | null | undefined, settled: boolean, startTime: string, endTime: string, bids: Array<{ id: string, value: string, timestamp: string, sender: { id: string } }>, bidder?: { id: string } | null | undefined, winner?: { id: string } | null | undefined } | null | undefined };

export type AllPrimeAuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPrimeAuctionsQuery = { primeAuctions: Array<{ id: string, amount?: string | null | undefined, settled: boolean, startTime: string, endTime: string, prime: { id: string, number: number, image: string }, bidder?: { id: string } | null | undefined, winner?: { id: string } | null | undefined }> };

export type AuctionStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AuctionStatusQuery = { primesAuctionHouses: Array<{ id: string, address: string, minBidIncrementPercentage: string, breedingCooldown: string, reservePrice: string, timeBuffer: string, currentPrimeAuction?: { id: string, amount?: string | null | undefined, settled: boolean, startTime: string, endTime: string, bidder?: { id: string } | null | undefined, winner?: { id: string } | null | undefined } | null | undefined }>, primeBatches: Array<{ id: string, active: boolean }> };

export type PrimeBatchQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PrimeBatchQuery = { primeBatch?: { id: string, active: boolean, remaining: number, whitelist?: string | null | undefined } | null | undefined };

export type PrimesForAccountQueryVariables = Exact<{
  account: Scalars['String'];
}>;


export type PrimesForAccountQuery = { primes: Array<{ id: string, claimed: boolean, deadline?: string | null | undefined, image: string, isListed: boolean, isPrime: boolean, isRentable: boolean, lastBred: string, primeFactorCount: number, primeIndex?: number | null | undefined, primeFactors: Array<number>, studFee?: string | null | undefined, whitelistOnly: boolean, childrenAsParent1: Array<{ id: string }>, childrenAsParent2: Array<{ id: string }>, cousins: Array<{ id: string }>, owner: { id: string, address: string }, parent1?: { id: string } | null | undefined, parent2?: { id: string } | null | undefined, sexyPrimes: Array<{ id: string }>, suitors: Array<{ id: string }>, twins: Array<{ id: string }> }> };

export type AccountQueryVariables = Exact<{
  account: Scalars['ID'];
}>;


export type AccountQuery = { account?: { primes: Array<{ id: string }> } | null | undefined };

export const PrimeAttributesFragmentDoc = gql`
    fragment PrimeAttributes on Prime {
  colossallyAbundantNumber
  emirp
  eulersLuckyNumber
  evilNumber
  fibonacciNumber
  friendlyNumber
  frugalNumber
  goodPrime
  happyNumber
  harshadNumber
  luckyNumber
  magicNumber
  perfectNumber
  repdigitNumber
  semiperfectNumber
  sophieGermainPrime
  squareNumber
  strongPrime
  taxicabNumber
  triangularNumber
  uniquePrime
  untouchableNumber
  weirdNumber
}
    `;
export const PrimeAllFragmentDoc = gql`
    fragment PrimeAll on Prime {
  id
  childrenAsParent1 {
    id
  }
  childrenAsParent2 {
    id
  }
  claimed
  cousins {
    id
  }
  deadline
  image
  isListed
  isPrime
  isRentable
  lastBred
  owner {
    id
    address
  }
  parent1 {
    id
  }
  parent2 {
    id
  }
  primeFactorCount
  primeIndex
  primeFactors
  sexyPrimes {
    id
  }
  studFee
  suitors {
    id
  }
  twins {
    id
  }
  whitelistOnly
}
    `;
export const PrimeAuctionAllFragmentDoc = gql`
    fragment PrimeAuctionAll on PrimeAuction {
  id
  bidder {
    id
  }
  amount
  settled
  startTime
  endTime
  winner {
    id
  }
}
    `;
export const PrimeDocument = gql`
    query Prime($tokenId: ID!) {
  prime(id: $tokenId) {
    ...PrimeAll
  }
}
    ${PrimeAllFragmentDoc}`;

/**
 * __usePrimeQuery__
 *
 * To run a query within a React component, call `usePrimeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimeQuery({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function usePrimeQuery(baseOptions: Apollo.QueryHookOptions<PrimeQuery, PrimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimeQuery, PrimeQueryVariables>(PrimeDocument, options);
      }
export function usePrimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimeQuery, PrimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimeQuery, PrimeQueryVariables>(PrimeDocument, options);
        }
export type PrimeQueryHookResult = ReturnType<typeof usePrimeQuery>;
export type PrimeLazyQueryHookResult = ReturnType<typeof usePrimeLazyQuery>;
export type PrimeQueryResult = Apollo.QueryResult<PrimeQuery, PrimeQueryVariables>;
export const PrimesFromLastIdDocument = gql`
    query PrimesFromLastID($lastID: ID!) {
  primes(first: 1000, where: {id_gt: $lastID}) {
    id
  }
}
    `;

/**
 * __usePrimesFromLastIdQuery__
 *
 * To run a query within a React component, call `usePrimesFromLastIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimesFromLastIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimesFromLastIdQuery({
 *   variables: {
 *      lastID: // value for 'lastID'
 *   },
 * });
 */
export function usePrimesFromLastIdQuery(baseOptions: Apollo.QueryHookOptions<PrimesFromLastIdQuery, PrimesFromLastIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimesFromLastIdQuery, PrimesFromLastIdQueryVariables>(PrimesFromLastIdDocument, options);
      }
export function usePrimesFromLastIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimesFromLastIdQuery, PrimesFromLastIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimesFromLastIdQuery, PrimesFromLastIdQueryVariables>(PrimesFromLastIdDocument, options);
        }
export type PrimesFromLastIdQueryHookResult = ReturnType<typeof usePrimesFromLastIdQuery>;
export type PrimesFromLastIdLazyQueryHookResult = ReturnType<typeof usePrimesFromLastIdLazyQuery>;
export type PrimesFromLastIdQueryResult = Apollo.QueryResult<PrimesFromLastIdQuery, PrimesFromLastIdQueryVariables>;
export const AllPrimesDocument = gql`
    query AllPrimes {
  primes {
    id
  }
}
    `;

/**
 * __useAllPrimesQuery__
 *
 * To run a query within a React component, call `useAllPrimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPrimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPrimesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPrimesQuery(baseOptions?: Apollo.QueryHookOptions<AllPrimesQuery, AllPrimesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPrimesQuery, AllPrimesQueryVariables>(AllPrimesDocument, options);
      }
export function useAllPrimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPrimesQuery, AllPrimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPrimesQuery, AllPrimesQueryVariables>(AllPrimesDocument, options);
        }
export type AllPrimesQueryHookResult = ReturnType<typeof useAllPrimesQuery>;
export type AllPrimesLazyQueryHookResult = ReturnType<typeof useAllPrimesLazyQuery>;
export type AllPrimesQueryResult = Apollo.QueryResult<AllPrimesQuery, AllPrimesQueryVariables>;
export const ListedPrimesDocument = gql`
    query ListedPrimes {
  primes(where: {isListed: true}, orderBy: number, orderDirection: asc) {
    id
    isRentable
    whitelistOnly
    studFee
    deadline
    suitors {
      id
    }
  }
}
    `;

/**
 * __useListedPrimesQuery__
 *
 * To run a query within a React component, call `useListedPrimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListedPrimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListedPrimesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListedPrimesQuery(baseOptions?: Apollo.QueryHookOptions<ListedPrimesQuery, ListedPrimesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListedPrimesQuery, ListedPrimesQueryVariables>(ListedPrimesDocument, options);
      }
export function useListedPrimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListedPrimesQuery, ListedPrimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListedPrimesQuery, ListedPrimesQueryVariables>(ListedPrimesDocument, options);
        }
export type ListedPrimesQueryHookResult = ReturnType<typeof useListedPrimesQuery>;
export type ListedPrimesLazyQueryHookResult = ReturnType<typeof useListedPrimesLazyQuery>;
export type ListedPrimesQueryResult = Apollo.QueryResult<ListedPrimesQuery, ListedPrimesQueryVariables>;
export const PrimeAuctionDocument = gql`
    query PrimeAuction($id: ID!) {
  primeAuction(id: $id) {
    ...PrimeAuctionAll
    bids(orderDirection: desc, orderBy: value) {
      id
      sender {
        id
      }
      value
      timestamp
    }
  }
}
    ${PrimeAuctionAllFragmentDoc}`;

/**
 * __usePrimeAuctionQuery__
 *
 * To run a query within a React component, call `usePrimeAuctionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimeAuctionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimeAuctionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePrimeAuctionQuery(baseOptions: Apollo.QueryHookOptions<PrimeAuctionQuery, PrimeAuctionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimeAuctionQuery, PrimeAuctionQueryVariables>(PrimeAuctionDocument, options);
      }
export function usePrimeAuctionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimeAuctionQuery, PrimeAuctionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimeAuctionQuery, PrimeAuctionQueryVariables>(PrimeAuctionDocument, options);
        }
export type PrimeAuctionQueryHookResult = ReturnType<typeof usePrimeAuctionQuery>;
export type PrimeAuctionLazyQueryHookResult = ReturnType<typeof usePrimeAuctionLazyQuery>;
export type PrimeAuctionQueryResult = Apollo.QueryResult<PrimeAuctionQuery, PrimeAuctionQueryVariables>;
export const AllPrimeAuctionsDocument = gql`
    query AllPrimeAuctions {
  primeAuctions(orderBy: startTime, orderDirection: asc) {
    ...PrimeAuctionAll
    prime {
      id
      number
      image
    }
  }
}
    ${PrimeAuctionAllFragmentDoc}`;

/**
 * __useAllPrimeAuctionsQuery__
 *
 * To run a query within a React component, call `useAllPrimeAuctionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPrimeAuctionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPrimeAuctionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPrimeAuctionsQuery(baseOptions?: Apollo.QueryHookOptions<AllPrimeAuctionsQuery, AllPrimeAuctionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPrimeAuctionsQuery, AllPrimeAuctionsQueryVariables>(AllPrimeAuctionsDocument, options);
      }
export function useAllPrimeAuctionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPrimeAuctionsQuery, AllPrimeAuctionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPrimeAuctionsQuery, AllPrimeAuctionsQueryVariables>(AllPrimeAuctionsDocument, options);
        }
export type AllPrimeAuctionsQueryHookResult = ReturnType<typeof useAllPrimeAuctionsQuery>;
export type AllPrimeAuctionsLazyQueryHookResult = ReturnType<typeof useAllPrimeAuctionsLazyQuery>;
export type AllPrimeAuctionsQueryResult = Apollo.QueryResult<AllPrimeAuctionsQuery, AllPrimeAuctionsQueryVariables>;
export const AuctionStatusDocument = gql`
    query AuctionStatus {
  primesAuctionHouses {
    id
    address
    minBidIncrementPercentage
    breedingCooldown
    currentPrimeAuction {
      ...PrimeAuctionAll
    }
    reservePrice
    timeBuffer
  }
  primeBatches {
    id
    active
  }
}
    ${PrimeAuctionAllFragmentDoc}`;

/**
 * __useAuctionStatusQuery__
 *
 * To run a query within a React component, call `useAuctionStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuctionStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuctionStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuctionStatusQuery(baseOptions?: Apollo.QueryHookOptions<AuctionStatusQuery, AuctionStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuctionStatusQuery, AuctionStatusQueryVariables>(AuctionStatusDocument, options);
      }
export function useAuctionStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuctionStatusQuery, AuctionStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuctionStatusQuery, AuctionStatusQueryVariables>(AuctionStatusDocument, options);
        }
export type AuctionStatusQueryHookResult = ReturnType<typeof useAuctionStatusQuery>;
export type AuctionStatusLazyQueryHookResult = ReturnType<typeof useAuctionStatusLazyQuery>;
export type AuctionStatusQueryResult = Apollo.QueryResult<AuctionStatusQuery, AuctionStatusQueryVariables>;
export const PrimeBatchDocument = gql`
    query PrimeBatch($id: ID!) {
  primeBatch(id: $id) {
    id
    active
    remaining
    whitelist
  }
}
    `;

/**
 * __usePrimeBatchQuery__
 *
 * To run a query within a React component, call `usePrimeBatchQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimeBatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimeBatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePrimeBatchQuery(baseOptions: Apollo.QueryHookOptions<PrimeBatchQuery, PrimeBatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimeBatchQuery, PrimeBatchQueryVariables>(PrimeBatchDocument, options);
      }
export function usePrimeBatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimeBatchQuery, PrimeBatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimeBatchQuery, PrimeBatchQueryVariables>(PrimeBatchDocument, options);
        }
export type PrimeBatchQueryHookResult = ReturnType<typeof usePrimeBatchQuery>;
export type PrimeBatchLazyQueryHookResult = ReturnType<typeof usePrimeBatchLazyQuery>;
export type PrimeBatchQueryResult = Apollo.QueryResult<PrimeBatchQuery, PrimeBatchQueryVariables>;
export const PrimesForAccountDocument = gql`
    query PrimesForAccount($account: String!) {
  primes(
    where: {owner: $account}
    orderBy: number
    orderDirection: asc
    first: 1000
  ) {
    ...PrimeAll
  }
}
    ${PrimeAllFragmentDoc}`;

/**
 * __usePrimesForAccountQuery__
 *
 * To run a query within a React component, call `usePrimesForAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimesForAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimesForAccountQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function usePrimesForAccountQuery(baseOptions: Apollo.QueryHookOptions<PrimesForAccountQuery, PrimesForAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimesForAccountQuery, PrimesForAccountQueryVariables>(PrimesForAccountDocument, options);
      }
export function usePrimesForAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimesForAccountQuery, PrimesForAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimesForAccountQuery, PrimesForAccountQueryVariables>(PrimesForAccountDocument, options);
        }
export type PrimesForAccountQueryHookResult = ReturnType<typeof usePrimesForAccountQuery>;
export type PrimesForAccountLazyQueryHookResult = ReturnType<typeof usePrimesForAccountLazyQuery>;
export type PrimesForAccountQueryResult = Apollo.QueryResult<PrimesForAccountQuery, PrimesForAccountQueryVariables>;
export const AccountDocument = gql`
    query Account($account: ID!) {
  account(id: $account) {
    primes(orderBy: number, orderDirection: asc) {
      id
    }
  }
}
    `;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useAccountQuery(baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;