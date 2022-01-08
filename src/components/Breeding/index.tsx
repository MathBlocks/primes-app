import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Form, Formik, useFormikContext } from 'formik'
import { BigNumber } from 'ethers'

import {
  useListedPrimesQuery,
  usePrimeQuery,
} from '../../graphql/subgraph/subgraph'
import { useOnboard } from '../App/OnboardProvider'
import { useContracts } from '../App/DAppContext'
import { useMintedPrimes, useMyPrimes } from '../App/PrimesContext'
import { useAttributesProof } from '../../merkleTree'
import { RentalData } from '../Prime/RentalData'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { BreedingOutput, BreedingSelect } from './BreedingSelect'
import { Values } from './types'
import { useToggle } from 'react-use'
import { Modal } from '../Modal'

const SubmitBreed: FC = () => {
  const { address: account } = useOnboard()
  const { values, isValidating } = useFormikContext<Values>()

  const outputAttributesProof = useAttributesProof(
    values.desiredOutput,
  )

  const primeQuery = usePrimeQuery({
    variables: {
      tokenId: (values.tokenId as number).toString(),
    },
    skip: !values.tokenId,
    fetchPolicy: 'cache-first',
  })
  const otherPrimeQuery = usePrimeQuery({
    variables: {
      tokenId: (values.otherTokenId as number).toString(),
    },
    skip: !values.otherTokenId,
    fetchPolicy: 'cache-first',
  })

  const primeData = primeQuery.data?.prime
  const otherPrimeData = otherPrimeQuery.data?.prime

  const isOwnerOfPrime = primeData?.owner?.address === account
  const isOwnerOfOtherPrime =
    otherPrimeData?.owner?.address === account

  const contracts = useContracts()

  const isBreedPrimes = !!(
    values.tokenId &&
    values.otherTokenId &&
    isOwnerOfPrime &&
    isOwnerOfOtherPrime
  )

  const studFee = BigNumber.from(otherPrimeData?.studFee ?? '0')

  const [acceptedBurnWarning, toggleAcceptedBurnWarning] =
    useToggle(false)

  const [showBurnWarningModal, toggleShowBurnWarningModal] =
    useToggle(false)

  const needsBurnWarning =
    primeData &&
    otherPrimeData &&
    (!primeData.isPrime || !otherPrimeData.isPrime)

  return (
    <>
      <SendTransactionWidget
        check={() => {
          if (needsBurnWarning && !acceptedBurnWarning) {
            toggleShowBurnWarningModal(true)
            return false
          }
          return true
        }}
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
          isBreedPrimes ? {} : { value: studFee },
        ]}
      />
      <Modal
        title="Confirm "
        isOpen={showBurnWarningModal}
        onBackgroundClick={toggleShowBurnWarningModal}
        onEscapeKeydown={toggleShowBurnWarningModal}
      >
        {primeData && !primeData.isPrime && (
          <div>#{primeData.id} will be burned</div>
        )}
        {otherPrimeData && !otherPrimeData.isPrime && (
          <div>#{otherPrimeData.id} will be burned</div>
        )}
        <button
          onClick={() => {
            toggleAcceptedBurnWarning(true)
            toggleShowBurnWarningModal(false)
          }}
        >
          Burn{' '}
          {!otherPrimeData?.isPrime && !primeData?.isPrime
            ? 'them'
            : 'it'}
          .
        </button>
      </Modal>
    </>
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
    margin: -1rem 0 1rem 0;
  }

  > .error {
    color: orangered;
    padding: 1rem;
    border: 1px orangered solid;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .select-row {
    margin-bottom: 1rem;
  }
`

// TODO: burning warning
const BreedingForm: FC = () => {
  const { address } = useOnboard()
  const contracts = useContracts()
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

        if (!address || !contracts) {
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

        if (address && values.tokenId && values.otherTokenId) {
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
          const isOtherOwner = otherOwner === address

          if (isOwner && isOtherOwner) {
            return {}
          }
        }

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

        const showRentalData =
          groups.allListedPrimesSet.has(values.otherTokenId) &&
          !groups.myBreedablePrimesSet.has(values.otherTokenId)

        return (
          <StyledForm>
            <div className="select-row">
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
            <div className="select-row">
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
              {showRentalData && (
                <RentalData tokenId={values.otherTokenId} />
              )}
            </div>
            <div className="symbol">=</div>
            <div className="select-row output">
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
