import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import { useEthers } from '@usedapp/core'

import { useContracts } from '../App/ContractsProvider'
import { useContractFunction } from '../../hooks'
import { useMintedPrimes, useMyPrimes } from '../App/PrimesContext'
import { createTreeWithAccounts, getAccountProof } from '../../merkleTree'

interface Values {
  otherTokenId?: number
  tokenId?: number
}

const OutputNumber: FC = () => {
  const {
    values: { tokenId, otherTokenId },
  } = useFormikContext<Values>()
  return (
    <div className="output">
      {tokenId && otherTokenId ? tokenId * otherTokenId : '–'}
    </div>
  )
}

const BreedingForm: FC = () => {
  const { account } = useEthers()
  const contracts = useContracts<true>()
  const [mintedPrimes] = useMintedPrimes()
  const [myPrimes] = useMyPrimes()

  const crossBreed = useContractFunction(contracts.Primes, 'crossBreed', {
    transactionName: 'Cross-breed',
  })

  const breedPrimes = useContractFunction(contracts.Primes, 'breedPrimes', {
    transactionName: 'Breed',
  })

  const myBreedablePrimes = useMemo(
    () => [...myPrimes.set.values()].filter((id) => id <= 8192),
    [myPrimes.set],
  )

  return (
    <Formik
      initialValues={{ tokenId: myBreedablePrimes[0] }}
      onSubmit={() => {}}
      validate={async (values: Values) => {
        const errors: {
          otherTokenId?: string
          tokenId?: string
        } = {}

        if (!account || !contracts) {
          errors.tokenId = 'Not connected'
          return errors
        }

        if (!values.tokenId) {
          errors.tokenId = 'Required'
          return errors
        } else {
          values.tokenId = parseInt(values.tokenId as never as string)
        }

        if (!values.otherTokenId) {
          errors.otherTokenId = 'Required'
          return errors
        }

        if (
          values.tokenId &&
          values.otherTokenId &&
          values.tokenId * values.otherTokenId > 16384
        ) {
          errors.tokenId = 'Output too large'
          return errors
        }

        if (!mintedPrimes.has(values.tokenId)) {
          errors.tokenId = 'Not minted yet'
          return errors
        }

        if (!mintedPrimes.has(values.otherTokenId)) {
          errors.otherTokenId = 'Not minted yet'
          return errors
        }

        if (!myPrimes.set.has(values.tokenId)) {
          errors.tokenId = 'Must own first Prime'
          return errors
        }

        if (account && contracts && values.tokenId && values.otherTokenId) {
          let otherOwner
          try {
            otherOwner = (
              await contracts.Primes.ownerOf(values.otherTokenId)
            ).toLowerCase()
          } catch (error) {
            errors.otherTokenId = 'Could not find owner'
            return errors
          }

          const isOwner = myPrimes.set.has(values.tokenId)
          const isOtherOwner = otherOwner === account.toLowerCase()

          if (isOwner && isOtherOwner) {
            return {}
          }

          // TODO could show who otherOwner is

          try {
            // TODO get whitelist and make like a tree
            const tree = createTreeWithAccounts([account])
            const proof = getAccountProof(tree, account)

            // TODO get attributes and merkle proof
            await contracts.Primes.estimateGas.crossBreed(
              values.tokenId,
              values.otherTokenId,
              0,
              [],
              { from: account },
            )
          } catch (error) {
            if (error.error?.message) {
              errors.tokenId =
                error.error.message.split('execution reverted: ')[1] ??
                error.error.message
            }
          }
        }

        return errors
      }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <Field type="number" as="select" name="tokenId">
              <option value="">Select</option>
              {myBreedablePrimes.map((id) => (
                <option value={id} key={id}>
                  {id}
                </option>
              ))}
            </Field>
            <div className="symbol">x</div>
            <Field
              type="number"
              name="otherTokenId"
              increment={1}
              min={1}
              max={16383}
            />
            <div className="symbol">=</div>
            <OutputNumber />
            <ErrorMessage name="tokenId" component="div" />
            <ErrorMessage name="otherTokenId" component="div" />
            <button type="submit" disabled={isSubmitting || !isValid}>
              Breed
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

const Container = styled.div``

export const Breeding: FC = () => {
  return (
    <Container>
      <h1>Select two numbers to breed them</h1>
      <BreedingForm />
    </Container>
  )
}
