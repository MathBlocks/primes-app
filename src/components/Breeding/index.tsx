import { FC, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { ErrorMessage, Form, Formik, useFormikContext } from 'formik'
import { useEthers } from '@usedapp/core'
// @ts-ignore
import isPrime from 'is-prime'

import { useContracts } from '../App/DAppContext'
import { useMintedPrimes, useMyPrimes } from '../App/PrimesContext'
import {
  createTreeWithAccounts,
  getAccountProof,
} from '../../merkleTree'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { BreedingOutput, BreedingSelect } from './BreedingSelect'
import { Values } from './types'
import { useListedPrimesQuery } from '../../graphql/subgraph/subgraph'
import ReactTooltip from 'react-tooltip'

const StyledForm = styled(Form)`
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;

  .symbol {
    font-size: 3rem;
    line-height: 2rem;
  }

  > .error {
    color: orangered;
    padding: 1rem;
    border: 1px orangered solid;
    border-radius: 0.5rem;
  }
`

const BreedingForm: FC = () => {
  const { account } = useEthers()
  const { Primes } = useContracts<true>()
  const [mintedPrimes] = useMintedPrimes()
  const [myPrimes] = useMyPrimes()

  const listedPrimes = useListedPrimesQuery()

  const groups = useMemo(() => {
    const sortSet = (set: Set<number>) =>
      [...set.values()]
        .sort((a, b) => a - b)
        .map((n) => ({ label: n.toString(), value: n }))

    const myBreedablePrimesSet = new Set(
      [...myPrimes.set.values()].filter((id) => id <= 8192),
    )
    const allListedPrimesSet = new Set<number>(
      (listedPrimes.data?.primes ?? []).map((p) => p.number),
    )
    const allBreedablePrimesSet = new Set<number>([
      ...allListedPrimesSet.values(),
      ...myBreedablePrimesSet.values(),
    ])

    const myBreedablePrimes = sortSet(myBreedablePrimesSet)
    const allListedPrimes = sortSet(allListedPrimesSet)
    const allBreedablePrimes = sortSet(allBreedablePrimesSet)

    return {
      myBreedablePrimes,
      myBreedablePrimesSet,
      allListedPrimes,
      allListedPrimesSet,
      allBreedablePrimes,
      allBreedablePrimesSet,
    }
  }, [listedPrimes.data, myPrimes.set])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  return (
    <Formik
      initialValues={{
        tokenId: 1,
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
          errors.tokenId = 'Parent 1 required'
          return errors
        } else {
          values.tokenId = parseInt(
            values.tokenId as never as string,
          )
        }

        if (!values.otherTokenId) {
          errors.otherTokenId = 'Parent 2 required'
          return errors
        }

        if (
          values.tokenId &&
          values.otherTokenId &&
          values.tokenId * values.otherTokenId > 16384
        ) {
          errors.tokenId = `Output must be under 16384`
          return errors
        }

        if (!mintedPrimes.has(values.tokenId)) {
          errors.tokenId = `${values.tokenId} not minted yet`
          return errors
        }

        if (!mintedPrimes.has(values.otherTokenId)) {
          errors.otherTokenId = `${values.otherTokenId} not minted yet`
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
          errors,
        } = form
        const isBreedPrimes =
          values.tokenId &&
          values.otherTokenId &&
          isPrime(values.tokenId) &&
          isPrime(values.otherTokenId)
        return (
          <StyledForm>
            <div data-tip="You must own this Prime">
              <BreedingSelect
                options={groups.myBreedablePrimes}
                field={getFieldProps('tokenId')}
                form={form}
                meta={getFieldMeta('tokenId')}
                noOptionsMessage={({ inputValue }) =>
                  inputValue
                    ? `You do not own ${inputValue}`
                    : 'You must own this Prime'
                }
                placeholder="Parent 1"
              />
            </div>
            <div className="symbol">x</div>
            <div data-tip="This can be a Prime you own, or a Prime you can rent">
              <BreedingSelect
                options={groups.allBreedablePrimes}
                field={getFieldProps('otherTokenId')}
                form={form}
                meta={getFieldMeta('otherTokenId')}
                noOptionsMessage={({ inputValue }) => {
                  const parsed = parseInt(inputValue)

                  if (!mintedPrimes.has(parsed)) {
                    return `${inputValue} is not minted`
                  }

                  if (!groups.allBreedablePrimesSet.has(parsed)) {
                    if (!groups.allListedPrimesSet.has(parsed)) {
                      return `${inputValue} is not listed for breeding`
                    }

                    return `${inputValue} is not breedable`
                  }

                  return 'Breeding not possible'
                }}
                placeholder="Parent 2"
              />
            </div>
            <div className="symbol">=</div>
            <BreedingOutput
              name="desiredOutput"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.desiredOutput}
              placeholder="Progeny"
            />
            {Object.entries(errors).map(([name, error]) => (
              <div className="error" key={name}>
                {error}
              </div>
            ))}
            <SendTransactionWidget
              buttonProps={{
                disabled: isSubmitting || !isValid,
              }}
              contract={Primes}
              functionName={
                isBreedPrimes ? 'breedPrimes' : 'crossBreed'
              }
              transactionOptions={{
                transactionName: isBreedPrimes
                  ? 'Breed Primes'
                  : 'Cross breed',
              }}
              args={[values.tokenId, values.otherTokenId, 0, []]}
            />
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
