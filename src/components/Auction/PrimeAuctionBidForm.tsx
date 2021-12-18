import { FC } from 'react'
import { Form, Formik } from 'formik'
import { parseEther } from 'ethers/lib/utils'

import { useAuctionStatusQuery } from '../../graphql/subgraph/subgraph'
import { useContracts } from '../App/DAppContext'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { ETHInput } from '../ETHInput'

export const PrimeAuctionBidForm: FC<{ tokenId: number }> = ({
  tokenId,
}) => {
  const { PrimesAuctionHouse } = useContracts<true>()
  const auctionStatusQuery = useAuctionStatusQuery()
  const primesAuctionHouse =
    auctionStatusQuery.data?.primesAuctionHouses?.[0]

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={{ bid: 0 }}
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
