// [ ] Rental
//   [x] isListed
//   [x] isRentable
//   [x] stud fee
//   [ ] suitors
//   [ ] deadline
//   [ ] Whitelist only
//   [ ] Owner form
//   [ ] Rental form

// See the status^
// If i'm the owner:
// list or delist
// when listing, set suitors, price, deadline

import { FC, useState } from 'react'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
} from 'formik'
import { constants } from 'ethers'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { useContracts } from '../App/DAppContext'
import { useContractFunction } from '../../hooks'
import { useRouteTokenId } from './Context'

const UserRentalForm: FC = () => {
  // const [tokenId] = useRouteTokenId()

  // const { data } = usePrimeQuery({
  //   variables: { tokenId: tokenId.toString() },
  //   fetchPolicy: 'cache-only',
  // })
  return <div>User rental form</div>
}

interface OwnerValues {
  tokenId: number
  fee?: number
  deadline?: number
  suitors?: number[]
}

const OwnerListForm: FC = () => {
  const [tokenId] = useRouteTokenId()
  const { account } = useEthers()
  const contracts = useContracts<true>()

  const list = useContractFunction(contracts.Primes, 'list', {
    transactionName: 'List Prime',
  })

  return (
    <div>
      <Formik
        initialValues={{ tokenId }}
        onSubmit={async (
          { fee, deadline, suitors }: OwnerValues,
          formikHelpers,
        ) => {
          if (!fee || !deadline || !suitors) return

          try {
            await list.send(tokenId, fee, deadline, suitors)
          } catch (error) {
            formikHelpers.setErrors({ tokenId: error.message })
          }
        }}
        validate={async (values: Partial<OwnerValues>) => {
          const errors: { tokenId?: string } = {}

          if (!account || !contracts) {
            errors.tokenId = 'Not connected'
            return errors
          }

          if (!values.tokenId) {
            errors.tokenId = 'Required'
            return errors
          }

          // try {
          //   // TODO get attributes and merkle proof
          //   await contracts.Primes.estimateGas.crossBreed(
          //     values.tokenId,
          //     values.otherTokenId,
          //     0,
          //     [],
          //     { from: account },
          //   )
          // } catch (error) {
          //   if (error.error?.message) {
          //     errors.tokenId =
          //       error.error.message.split('execution reverted: ')[1] ??
          //       error.error.message
          //   }
          // }

          return errors
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <Field type="number" name="studFee" min={0} />
            <div>
              <Field
                type="number"
                name="suitors[0]"
                min={0}
                increment={1}
              />
              <Field
                type="number"
                name="suitors[1]"
                min={0}
                increment={1}
              />
              <Field
                type="number"
                name="suitors[2]"
                min={0}
                increment={1}
              />
              <Field
                type="number"
                name="suitors[3]"
                min={0}
                increment={1}
              />
              <Field
                type="number"
                name="suitors[4]"
                min={0}
                increment={1}
              />
              <Field
                type="number"
                name="suitors[5]"
                min={0}
                increment={1}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              List for rental
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const OwnerUnlistForm: FC = () => {
  const [tokenId] = useRouteTokenId()
  const contracts = useContracts<true>()
  const unlist = useContractFunction(contracts.Primes, 'unlist', {
    transactionName: 'Unlist Prime',
  })

  return (
    <div>
      <button
        onClick={() => {
          unlist.send(tokenId).catch((error) => {
            console.error(error)
          })
        }}
      >
        Unlist
      </button>
    </div>
  )
}

const OwnerForms: FC = () => {
  const [tokenId] = useRouteTokenId()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    fetchPolicy: 'cache-only',
  })

  if (!data?.prime) return null

  return (
    <div>
      {data.prime.isListed ? <OwnerUnlistForm /> : <OwnerListForm />}
    </div>
  )
}

const Container = styled.div``

export const Rental: FC = () => {
  const [tokenId] = useRouteTokenId()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    fetchPolicy: 'cache-only',
  })

  const { account } = useEthers()

  const isOwner = !!(
    data?.prime &&
    account &&
    account.toLowerCase() === data.prime.owner.address.toLowerCase()
  )
  // const isOwner = true

  return (
    <Container>
      <h4>Rental</h4>
      {data?.prime && (
        <div>
          <div>{data.prime.isListed ? 'Listed' : 'Not listed'}</div>
          {data.prime.isListed && (
            <div>
              <div>
                Suitors:{' '}
                {data.prime.suitors.map((s) => s.id.toString())}
              </div>
              <div>Stud fee: {data.prime.studFee?.toString()}</div>
              <div>Deadline: {data.prime.deadline?.toString()}</div>
            </div>
          )}
          <div>
            {data.prime.isRentable
              ? 'Rentable'
              : !isOwner && <UserRentalForm />}
          </div>
          {isOwner && <OwnerForms />}
        </div>
      )}
    </Container>
  )
}
