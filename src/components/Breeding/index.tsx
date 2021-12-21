import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Form, Formik, useFormikContext } from 'formik'
// @ts-ignore
import isPrime from 'is-prime'

import { useOnboard } from '../App/OnboardProvider'
import { useContracts } from '../App/DAppContext'
import { useMintedPrimes, useMyPrimes } from '../App/PrimesContext'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { BreedingOutput, BreedingSelect } from './BreedingSelect'
import { Values } from './types'
import { useListedPrimesQuery } from '../../graphql/subgraph/subgraph'
import { useAttributesProof } from '../../merkleTree'

const SubmitBreed: FC = () => {
  const { values, isValidating } = useFormikContext<Values>()

  const outputAttributesProof = useAttributesProof(
    values.desiredOutput,
  )

  const contracts = useContracts()

  const isBreedPrimes =
    values.tokenId &&
    values.otherTokenId &&
    isPrime(values.tokenId) &&
    isPrime(values.otherTokenId)

  return (
    <SendTransactionWidget
      buttonProps={{
        disabled: isValidating || !outputAttributesProof,
      }}
      contract={contracts?.Primes}
      functionName={isBreedPrimes ? 'breedPrimes' : 'crossBreed'}
      transactionOptions={{
        transactionName: isBreedPrimes
          ? 'Breed Primes'
          : 'Cross breed',
      }}
      args={[
        values.tokenId,
        values.otherTokenId,
        outputAttributesProof?.value ?? 0,
        outputAttributesProof?.proof ?? [],
      ]}
    />
  )
}

const StyledForm = styled(Form)`
  padding: 4rem 0;

  .row {
  }

  .tip {
    padding: 0.5rem 0;
  }

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

// TODO: lives left
// TODO: burning warning
// TODO: show rental fees
// TODO: show rental whitelist
const BreedingForm: FC = () => {
  const { address } = useOnboard()
  // const { Primes } = useContracts<true>()
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

  return (
    <Formik
      initialValues={{
        tokenId: 1,
        otherTokenId: 1,
        desiredOutput: 0,
      }}
      onSubmit={() => {}}
      validate={async (values: Values) => {
        const errors: {
          otherTokenId?: string
          tokenId?: string
        } = {}

        if (!address) {
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

        // if (account && values.tokenId && values.otherTokenId) {
        //   let otherOwner
        //   try {
        //     otherOwner = (
        //       await Primes.ownerOf(values.otherTokenId)
        //     ).toLowerCase()
        //   } catch (error) {
        //     errors.otherTokenId = 'Could not find owner'
        //     return errors
        //   }
        //   const isOwner = myPrimes.set.has(values.tokenId)
        //   const isOtherOwner = otherOwner === account.toLowerCase()
        //
        //   if (isOwner && isOtherOwner) {
        //     return {}
        //   }
        //   try {
        //     await Primes.estimateGas.crossBreed(
        //       values.tokenId,
        //       values.otherTokenId,
        //       // Shouldn't need the real attributes proof to estimate this
        //       0,
        //       [],
        //       {
        //         from: account,
        //       },
        //     )
        //   } catch (error) {
        //     if (error.error?.message) {
        //       errors.tokenId =
        //         error.error.message.replace(
        //           'execution reverted: ',
        //           '',
        //         ) ?? error.error.message
        //     }
        //   }
        // }

        return errors
      }}
    >
      {(form) => {
        const {
          getFieldMeta,
          getFieldProps,
          handleChange,
          handleBlur,
          values,
          errors,
        } = form

        return (
          <StyledForm>
            <div>
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
              <div className="tip">You must own this Prime</div>
            </div>
            <div className="symbol">x</div>
            <div>
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
              <div className="tip">
                This can be a Prime you own, or a Prime you can rent
              </div>
            </div>
            <div className="symbol">=</div>
            <div>
              <BreedingOutput
                name="desiredOutput"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.desiredOutput}
                placeholder="Progeny"
              />
            </div>
            {Object.entries(errors).map(([name, error]) => (
              <div className="error" key={name}>
                {error}
              </div>
            ))}
            <SubmitBreed />
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
