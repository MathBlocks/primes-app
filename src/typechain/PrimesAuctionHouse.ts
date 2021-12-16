/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface PrimesAuctionHouseInterface extends ethers.utils.Interface {
  functions: {
    "auction()": FunctionFragment;
    "createBid(uint256)": FunctionFragment;
    "minBidIncrementPercentage()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "primes()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "reservePrice()": FunctionFragment;
    "setMinBidIncrementPercentage(uint8)": FunctionFragment;
    "setReservePrice(uint256)": FunctionFragment;
    "setTimeBuffer(uint256)": FunctionFragment;
    "settleAuction()": FunctionFragment;
    "settleCurrentAndCreateNewAuction()": FunctionFragment;
    "timeBuffer()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
    "weth()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "auction", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "createBid",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "minBidIncrementPercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "primes", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reservePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMinBidIncrementPercentage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setReservePrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTimeBuffer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "settleAuction",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "settleCurrentAndCreateNewAuction",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeBuffer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(functionFragment: "weth", values?: undefined): string;

  decodeFunctionResult(functionFragment: "auction", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minBidIncrementPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "primes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reservePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinBidIncrementPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setReservePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTimeBuffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleCurrentAndCreateNewAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "timeBuffer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;

  events: {
    "AuctionBid(uint256,address,uint256,bool)": EventFragment;
    "AuctionCreated(uint256,uint256,uint256)": EventFragment;
    "AuctionExtended(uint256,uint256)": EventFragment;
    "AuctionMinBidIncrementPercentageUpdated(uint256)": EventFragment;
    "AuctionReservePriceUpdated(uint256)": EventFragment;
    "AuctionSettled(uint256,address,uint256)": EventFragment;
    "AuctionTimeBufferUpdated(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionBid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionExtended"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "AuctionMinBidIncrementPercentageUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionReservePriceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionSettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionTimeBufferUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export type AuctionBidEvent = TypedEvent<
  [BigNumber, string, BigNumber, boolean],
  { primeId: BigNumber; sender: string; value: BigNumber; extended: boolean }
>;

export type AuctionBidEventFilter = TypedEventFilter<AuctionBidEvent>;

export type AuctionCreatedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { primeId: BigNumber; startTime: BigNumber; endTime: BigNumber }
>;

export type AuctionCreatedEventFilter = TypedEventFilter<AuctionCreatedEvent>;

export type AuctionExtendedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { primeId: BigNumber; endTime: BigNumber }
>;

export type AuctionExtendedEventFilter = TypedEventFilter<AuctionExtendedEvent>;

export type AuctionMinBidIncrementPercentageUpdatedEvent = TypedEvent<
  [BigNumber],
  { minBidIncrementPercentage: BigNumber }
>;

export type AuctionMinBidIncrementPercentageUpdatedEventFilter =
  TypedEventFilter<AuctionMinBidIncrementPercentageUpdatedEvent>;

export type AuctionReservePriceUpdatedEvent = TypedEvent<
  [BigNumber],
  { reservePrice: BigNumber }
>;

export type AuctionReservePriceUpdatedEventFilter =
  TypedEventFilter<AuctionReservePriceUpdatedEvent>;

export type AuctionSettledEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  { primeId: BigNumber; winner: string; amount: BigNumber }
>;

export type AuctionSettledEventFilter = TypedEventFilter<AuctionSettledEvent>;

export type AuctionTimeBufferUpdatedEvent = TypedEvent<
  [BigNumber],
  { timeBuffer: BigNumber }
>;

export type AuctionTimeBufferUpdatedEventFilter =
  TypedEventFilter<AuctionTimeBufferUpdatedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type PausedEvent = TypedEvent<[string], { account: string }>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export type UnpausedEvent = TypedEvent<[string], { account: string }>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface PrimesAuctionHouse extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PrimesAuctionHouseInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    auction(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, string, boolean] & {
        tokenId: BigNumber;
        amount: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        bidder: string;
        settled: boolean;
      }
    >;

    createBid(
      _primeId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<[number]>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    primes(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reservePrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleAuction(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleCurrentAndCreateNewAuction(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    timeBuffer(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    weth(overrides?: CallOverrides): Promise<[string]>;
  };

  auction(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, string, boolean] & {
      tokenId: BigNumber;
      amount: BigNumber;
      startTime: BigNumber;
      endTime: BigNumber;
      bidder: string;
      settled: boolean;
    }
  >;

  createBid(
    _primeId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  minBidIncrementPercentage(overrides?: CallOverrides): Promise<number>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  primes(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reservePrice(overrides?: CallOverrides): Promise<BigNumber>;

  setMinBidIncrementPercentage(
    _minBidIncrementPercentage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setReservePrice(
    _reservePrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTimeBuffer(
    _timeBuffer: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleAuction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleCurrentAndCreateNewAuction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  timeBuffer(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  weth(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    auction(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, string, boolean] & {
        tokenId: BigNumber;
        amount: BigNumber;
        startTime: BigNumber;
        endTime: BigNumber;
        bidder: string;
        settled: boolean;
      }
    >;

    createBid(_primeId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<number>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    primes(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    reservePrice(overrides?: CallOverrides): Promise<BigNumber>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    settleAuction(overrides?: CallOverrides): Promise<void>;

    settleCurrentAndCreateNewAuction(overrides?: CallOverrides): Promise<void>;

    timeBuffer(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    weth(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "AuctionBid(uint256,address,uint256,bool)"(
      primeId?: BigNumberish | null,
      sender?: null,
      value?: null,
      extended?: null
    ): AuctionBidEventFilter;
    AuctionBid(
      primeId?: BigNumberish | null,
      sender?: null,
      value?: null,
      extended?: null
    ): AuctionBidEventFilter;

    "AuctionCreated(uint256,uint256,uint256)"(
      primeId?: BigNumberish | null,
      startTime?: null,
      endTime?: null
    ): AuctionCreatedEventFilter;
    AuctionCreated(
      primeId?: BigNumberish | null,
      startTime?: null,
      endTime?: null
    ): AuctionCreatedEventFilter;

    "AuctionExtended(uint256,uint256)"(
      primeId?: BigNumberish | null,
      endTime?: null
    ): AuctionExtendedEventFilter;
    AuctionExtended(
      primeId?: BigNumberish | null,
      endTime?: null
    ): AuctionExtendedEventFilter;

    "AuctionMinBidIncrementPercentageUpdated(uint256)"(
      minBidIncrementPercentage?: null
    ): AuctionMinBidIncrementPercentageUpdatedEventFilter;
    AuctionMinBidIncrementPercentageUpdated(
      minBidIncrementPercentage?: null
    ): AuctionMinBidIncrementPercentageUpdatedEventFilter;

    "AuctionReservePriceUpdated(uint256)"(
      reservePrice?: null
    ): AuctionReservePriceUpdatedEventFilter;
    AuctionReservePriceUpdated(
      reservePrice?: null
    ): AuctionReservePriceUpdatedEventFilter;

    "AuctionSettled(uint256,address,uint256)"(
      primeId?: BigNumberish | null,
      winner?: null,
      amount?: null
    ): AuctionSettledEventFilter;
    AuctionSettled(
      primeId?: BigNumberish | null,
      winner?: null,
      amount?: null
    ): AuctionSettledEventFilter;

    "AuctionTimeBufferUpdated(uint256)"(
      timeBuffer?: null
    ): AuctionTimeBufferUpdatedEventFilter;
    AuctionTimeBufferUpdated(
      timeBuffer?: null
    ): AuctionTimeBufferUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;
  };

  estimateGas: {
    auction(overrides?: CallOverrides): Promise<BigNumber>;

    createBid(
      _primeId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    minBidIncrementPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    primes(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reservePrice(overrides?: CallOverrides): Promise<BigNumber>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleAuction(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleCurrentAndCreateNewAuction(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    timeBuffer(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    weth(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    auction(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createBid(
      _primeId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    minBidIncrementPercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    primes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reservePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setMinBidIncrementPercentage(
      _minBidIncrementPercentage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setReservePrice(
      _reservePrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTimeBuffer(
      _timeBuffer: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleAuction(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleCurrentAndCreateNewAuction(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    timeBuffer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}