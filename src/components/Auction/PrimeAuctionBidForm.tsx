import { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import { parseEther } from 'ethers/lib/utils'

import {
  PrimesAuctionHouse,
  useAuctionStatusQuery,
} from '../../graphql/subgraph/subgraph'
import { useContracts } from '../App/DAppContext'
import { useContractFunction } from '../../hooks'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { ETHInput } from '../ETHInput'

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

        return errors
      }}
    >
      {({ isSubmitting, isValid, errors, touched, values }) => {
        return (
          <Form>
            <div>
              <ETHInput name="bid" />
              {errors.bid && touched.bid ? (
                <p>{errors.bid}</p>
              ) : null}
            </div>
            <SendTransactionWidget
              contract={PrimesAuctionHouse}
              functionName="createBid"
              args={[
                tokenId,
                {
                  value: values.bid
                    ? parseEther(values.bid.toFixed(18))
                    : 0,
                },
              ]}
              transactionOptions={{ transactionName: 'Place bid' }}
              buttonProps={{
                type: 'submit',
                disabled: isSubmitting || !isValid,
              }}
            />
          </Form>
        )
      }}
    </Formik>
  )
}
