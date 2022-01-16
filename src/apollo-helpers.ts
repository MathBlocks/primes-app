import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountKeySpecifier = ('address' | 'id' | 'primeAuctionBids' | 'primes' | AccountKeySpecifier)[];
export type AccountFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctionBids?: FieldPolicy<any> | FieldReadFunction<any>,
	primes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrimeKeySpecifier = ('childrenAsParent1' | 'childrenAsParent2' | 'claimed' | 'colossallyAbundantNumber' | 'cousins' | 'deadline' | 'emirp' | 'eulersLuckyNumber' | 'evilNumber' | 'fibonacciNumber' | 'friendlyNumber' | 'frugalNumber' | 'goodPrime' | 'happyNumber' | 'harshadNumber' | 'id' | 'image' | 'isListed' | 'isPrime' | 'isRentable' | 'lastBred' | 'luckyNumber' | 'magicNumber' | 'number' | 'owner' | 'parent1' | 'parent2' | 'perfectNumber' | 'primeFactorCount' | 'primeFactors' | 'primeIndex' | 'repdigitNumber' | 'revealed' | 'semiperfectNumber' | 'sexyPrimes' | 'sophieGermainPrime' | 'squareNumber' | 'strongPrime' | 'studFee' | 'suitors' | 'taxicabNumber' | 'triangularNumber' | 'twins' | 'uniquePrime' | 'untouchableNumber' | 'weirdNumber' | 'whitelistOnly' | PrimeKeySpecifier)[];
export type PrimeFieldPolicy = {
	childrenAsParent1?: FieldPolicy<any> | FieldReadFunction<any>,
	childrenAsParent2?: FieldPolicy<any> | FieldReadFunction<any>,
	claimed?: FieldPolicy<any> | FieldReadFunction<any>,
	colossallyAbundantNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	cousins?: FieldPolicy<any> | FieldReadFunction<any>,
	deadline?: FieldPolicy<any> | FieldReadFunction<any>,
	emirp?: FieldPolicy<any> | FieldReadFunction<any>,
	eulersLuckyNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	evilNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	fibonacciNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	friendlyNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	frugalNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	goodPrime?: FieldPolicy<any> | FieldReadFunction<any>,
	happyNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	harshadNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	isListed?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrime?: FieldPolicy<any> | FieldReadFunction<any>,
	isRentable?: FieldPolicy<any> | FieldReadFunction<any>,
	lastBred?: FieldPolicy<any> | FieldReadFunction<any>,
	luckyNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	magicNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	number?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	parent1?: FieldPolicy<any> | FieldReadFunction<any>,
	parent2?: FieldPolicy<any> | FieldReadFunction<any>,
	perfectNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	primeFactorCount?: FieldPolicy<any> | FieldReadFunction<any>,
	primeFactors?: FieldPolicy<any> | FieldReadFunction<any>,
	primeIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	repdigitNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	revealed?: FieldPolicy<any> | FieldReadFunction<any>,
	semiperfectNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	sexyPrimes?: FieldPolicy<any> | FieldReadFunction<any>,
	sophieGermainPrime?: FieldPolicy<any> | FieldReadFunction<any>,
	squareNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	strongPrime?: FieldPolicy<any> | FieldReadFunction<any>,
	studFee?: FieldPolicy<any> | FieldReadFunction<any>,
	suitors?: FieldPolicy<any> | FieldReadFunction<any>,
	taxicabNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	triangularNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	twins?: FieldPolicy<any> | FieldReadFunction<any>,
	uniquePrime?: FieldPolicy<any> | FieldReadFunction<any>,
	untouchableNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	weirdNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	whitelistOnly?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrimeAuctionKeySpecifier = ('amount' | 'bidder' | 'bids' | 'endTime' | 'extended' | 'id' | 'prime' | 'settled' | 'startTime' | 'winner' | PrimeAuctionKeySpecifier)[];
export type PrimeAuctionFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	bidder?: FieldPolicy<any> | FieldReadFunction<any>,
	bids?: FieldPolicy<any> | FieldReadFunction<any>,
	endTime?: FieldPolicy<any> | FieldReadFunction<any>,
	extended?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	prime?: FieldPolicy<any> | FieldReadFunction<any>,
	settled?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	winner?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrimeAuctionBidKeySpecifier = ('id' | 'primeAuction' | 'sender' | 'timestamp' | 'value' | PrimeAuctionBidKeySpecifier)[];
export type PrimeAuctionBidFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuction?: FieldPolicy<any> | FieldReadFunction<any>,
	sender?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrimeBatchKeySpecifier = ('active' | 'id' | 'remaining' | 'startTime' | PrimeBatchKeySpecifier)[];
export type PrimeBatchFieldPolicy = {
	active?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	remaining?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrimesAuctionHouseKeySpecifier = ('address' | 'breedingCooldown' | 'currentPrimeAuction' | 'id' | 'minBidIncrementPercentage' | 'paused' | 'primes' | 'reservePrice' | 'timeBuffer' | PrimesAuctionHouseKeySpecifier)[];
export type PrimesAuctionHouseFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	breedingCooldown?: FieldPolicy<any> | FieldReadFunction<any>,
	currentPrimeAuction?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	minBidIncrementPercentage?: FieldPolicy<any> | FieldReadFunction<any>,
	paused?: FieldPolicy<any> | FieldReadFunction<any>,
	primes?: FieldPolicy<any> | FieldReadFunction<any>,
	reservePrice?: FieldPolicy<any> | FieldReadFunction<any>,
	timeBuffer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('_meta' | 'account' | 'accounts' | 'prime' | 'primeAuction' | 'primeAuctionBid' | 'primeAuctionBids' | 'primeAuctions' | 'primeBatch' | 'primeBatches' | 'primes' | 'primesAuctionHouse' | 'primesAuctionHouses' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	_meta?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	prime?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuction?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctionBid?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctionBids?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctions?: FieldPolicy<any> | FieldReadFunction<any>,
	primeBatch?: FieldPolicy<any> | FieldReadFunction<any>,
	primeBatches?: FieldPolicy<any> | FieldReadFunction<any>,
	primes?: FieldPolicy<any> | FieldReadFunction<any>,
	primesAuctionHouse?: FieldPolicy<any> | FieldReadFunction<any>,
	primesAuctionHouses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('_meta' | 'account' | 'accounts' | 'prime' | 'primeAuction' | 'primeAuctionBid' | 'primeAuctionBids' | 'primeAuctions' | 'primeBatch' | 'primeBatches' | 'primes' | 'primesAuctionHouse' | 'primesAuctionHouses' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	_meta?: FieldPolicy<any> | FieldReadFunction<any>,
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	prime?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuction?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctionBid?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctionBids?: FieldPolicy<any> | FieldReadFunction<any>,
	primeAuctions?: FieldPolicy<any> | FieldReadFunction<any>,
	primeBatch?: FieldPolicy<any> | FieldReadFunction<any>,
	primeBatches?: FieldPolicy<any> | FieldReadFunction<any>,
	primes?: FieldPolicy<any> | FieldReadFunction<any>,
	primesAuctionHouse?: FieldPolicy<any> | FieldReadFunction<any>,
	primesAuctionHouses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _Block_KeySpecifier = ('hash' | 'number' | _Block_KeySpecifier)[];
export type _Block_FieldPolicy = {
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	number?: FieldPolicy<any> | FieldReadFunction<any>
};
export type _Meta_KeySpecifier = ('block' | 'deployment' | 'hasIndexingErrors' | _Meta_KeySpecifier)[];
export type _Meta_FieldPolicy = {
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	deployment?: FieldPolicy<any> | FieldReadFunction<any>,
	hasIndexingErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier),
		fields?: AccountFieldPolicy,
	},
	Prime?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrimeKeySpecifier | (() => undefined | PrimeKeySpecifier),
		fields?: PrimeFieldPolicy,
	},
	PrimeAuction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrimeAuctionKeySpecifier | (() => undefined | PrimeAuctionKeySpecifier),
		fields?: PrimeAuctionFieldPolicy,
	},
	PrimeAuctionBid?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrimeAuctionBidKeySpecifier | (() => undefined | PrimeAuctionBidKeySpecifier),
		fields?: PrimeAuctionBidFieldPolicy,
	},
	PrimeBatch?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrimeBatchKeySpecifier | (() => undefined | PrimeBatchKeySpecifier),
		fields?: PrimeBatchFieldPolicy,
	},
	PrimesAuctionHouse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrimesAuctionHouseKeySpecifier | (() => undefined | PrimesAuctionHouseKeySpecifier),
		fields?: PrimesAuctionHouseFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	_Block_?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _Block_KeySpecifier | (() => undefined | _Block_KeySpecifier),
		fields?: _Block_FieldPolicy,
	},
	_Meta_?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | _Meta_KeySpecifier | (() => undefined | _Meta_KeySpecifier),
		fields?: _Meta_FieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;