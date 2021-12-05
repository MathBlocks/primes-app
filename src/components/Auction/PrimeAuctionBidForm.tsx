import { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import { parseEther } from 'ethers/lib/utils'

import {
  PrimesAuctionHouse,
  useAuctionStatusQuery,
} from '../../graphql/subgraph/subgraph'
import { useContracts } from '../App/ContractsProvider'
import { useContractFunction } from '../../hooks'

const formatError = (
  error: any,
  primesAuctionHouse: PrimesAuctionHouse,
): string =>
  error.error?.message
    ? error.error.message
        .split('execution reverted: ')[1]
        .replace(
          'reservePrice',
          `${primesAuctionHouse.reservePrice}`,
        )
        .replace(
          'minBidIncrementPercentage',
          `${primesAuctionHouse.minBidIncrementPercentage}%`,
        ) ?? error.error.message
    : error.message

export const PrimeAuctionBidForm: FC<{ tokenId: number }> = ({
  tokenId,
}) => {
  const { PrimesAuctionHouse } = useContracts<true>()
  const auctionStatusQuery = useAuctionStatusQuery()
  const primesAuctionHouse =
    auctionStatusQuery.data?.primesAuctionHouses?.[0]

  const createBid = useContractFunction(
    PrimesAuctionHouse,
    'createBid',
    {
      transactionName: 'Create bid',
    },
  )

  return (
    <Formik
      initialValues={{ bid: 0 }}
      onSubmit={async ({ bid }: { bid: number }, formikHelpers) => {
        if (!primesAuctionHouse || !bid) return

        try {
          await createBid.send(tokenId, {
            value: parseEther(bid.toFixed(18)),
          })
        } catch (error) {
          const errors = {
            bid: formatError(
              error,
              primesAuctionHouse as PrimesAuctionHouse,
            ),
          }
          formikHelpers.setErrors(errors)
        }
      }}
      validate={async ({ bid }: Partial<{ bid: number }>) => {
        const errors: { bid?: string } = {}

        if (!primesAuctionHouse) {
          errors.bid = 'Not connected'
          return errors
        }

        if (!bid) {
          errors.bid = 'Must enter an amount'
          return errors
        }

        // TODO validate ETH balance

        try {
          await PrimesAuctionHouse.estimateGas.createBid(tokenId, {
            value: parseEther(bid.toFixed(18)),
          })
        } catch (error) {
          errors.bid = formatError(
            error,
            primesAuctionHouse as PrimesAuctionHouse,
          )
        }

        return errors
      }}
    >
      {({ isSubmitting, isValid, errors, touched }) => (
        <Form>
          <div>
            <Field
              type="number"
              name="bid"
              min={0}
              step="0.000000000000000001"
            />
            {errors.bid && touched.bid ? (
              <div>{errors.bid}</div>
            ) : null}
          </div>
          <button type="submit" disabled={isSubmitting || !isValid}>
            Place bid
          </button>
        </Form>
      )}
    </Formik>
  )
}
