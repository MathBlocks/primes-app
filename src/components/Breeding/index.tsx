import { FC, useMemo } from 'react'
import styled from 'styled-components'
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
} from 'formik'
import { useEthers } from '@usedapp/core'

import { useContracts } from '../App/DAppContext'
import { useContractFunction } from '../../hooks'
import { useMintedPrimes, useMyPrimes } from '../App/PrimesContext'
import {
  createTreeWithAccounts,
  getAccountProof,
} from '../../merkleTree'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { BreedingOutput, BreedingSelect } from './BreedingSelect'
import { Values } from './types'

const BreedingFormUpdater: FC = () => {
  const {
    values: { tokenId, otherTokenId, desiredOutput },
    setFieldValue,
  } = useFormikContext<Values>()

  // for the output, set its value if the other fields change...
  // maybe that should go in an updater

  return null
}

const StyledForm = styled(Form)`
  max-width: 40rem;
`

const BreedingForm: FC = () => {
  const { account } = useEthers()
  const { Primes } = useContracts<true>()
  const [mintedPrimes] = useMintedPrimes()
  const [myPrimes] = useMyPrimes()

  const crossBreed = useContractFunction(Primes, 'crossBreed', {
    transactionName: 'Cross-breed',
  })

  const breedPrimes = useContractFunction(Primes, 'breedPrimes', {
    transactionName: 'Breed',
  })

  const myBreedablePrimes = useMemo(
    () =>
      [...myPrimes.set.values()]
        .filter((id) => id <= 8192)
        .sort((a, b) => a - b)
        .map((n) => ({ label: n.toString(), value: n })),
    [myPrimes.set],
  )

  // TODO allBreedablePrimes = myBreedablePrimes + listedPrimes
  const allBreedablePrimes = myBreedablePrimes

  return (
    <Formik
      initialValues={{
        tokenId: myBreedablePrimes[0]?.value,
        desiredOutput: 0,
      }}
      onSubmit={() => {}}
      validate={async (values: Values) => {
        const errors: {
          otherTokenId?: string
          tokenId?: string
        } = {}

        if (!account) {
          errors.tokenId = 'Not connected'
          return errors
        }

        if (!values.tokenId) {
          errors.tokenId = 'Required'
          return errors
        } else {
          values.tokenId = parseInt(
            values.tokenId as never as string,
          )
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

        if (account && values.tokenId && values.otherTokenId) {
          let otherOwner
          try {
            otherOwner = (
              await Primes.ownerOf(values.otherTokenId)
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
            await Primes.estimateGas.crossBreed(
              values.tokenId,
              values.otherTokenId,
              0,
              [],
              {
                from: account,
              },
            )
          } catch (error) {
            if (error.error?.message) {
              errors.tokenId =
                error.error.message.replace(
                  'execution reverted: ',
                  '',
                ) ?? error.error.message
            }
          }
        }

        return errors
      }}
    >
      {(form) => {
        const {
          isSubmitting,
          isValid,
          getFieldMeta,
          getFieldProps,
          handleChange,
          handleBlur,
          values,
        } = form
        return (
          <StyledForm>
            <BreedingSelect
              data-tip="You must own this Prime"
              options={myBreedablePrimes}
              field={getFieldProps('tokenId')}
              form={form}
              meta={getFieldMeta('tokenId')}
              placeholder="Parent 1"
            />
            <div className="symbol">x</div>
            <BreedingSelect
              data-tip="This can be a Prime you own, or a Prime you can rent"
              options={allBreedablePrimes}
              field={getFieldProps('otherTokenId')}
              form={form}
              meta={getFieldMeta('otherTokenId')}
              placeholder="Parent 2"
            />
            <div className="symbol">=</div>
            <BreedingOutput
              name="desiredOutput"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.desiredOutput}
              placeholder="Progeny"
            />
            <ErrorMessage name="tokenId" component="div" />
            <ErrorMessage name="otherTokenId" component="div" />
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Breed
            </button>
            <BreedingFormUpdater />
          </StyledForm>
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

// <Field type="number" as="select" name="tokenId">
//   <option value="">Select</option>
//   {myBreedablePrimes.map((id) => (
//     <option value={id} key={id}>
//       {id}
//     </option>
//   ))}
// </Field>
