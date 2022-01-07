import { FC, useEffect } from 'react'
import { useToggle } from 'react-use'
import styled from 'styled-components'
import { Formik, Form, Field, FieldArray } from 'formik'
import { formatEther, parseEther } from 'ethers/lib/utils'
import {
  formatRFC7231,
  fromUnixTime,
  getUnixTime,
  lightFormat,
} from 'date-fns'
import ReactTooltip from 'react-tooltip'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { useOnboard } from '../App/OnboardProvider'
import { useContracts } from '../App/DAppContext'
import { useRouteTokenId } from './Context'
import { Modal } from '../Modal'

interface OwnerValues {
  tokenId: number
  fee?: number
  deadline?: string
  suitors?: number[]
}

const OwnerListFormContainer = styled.div`
  .field {
    padding-bottom: 2rem;
    input {
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px white solid;
      background-color: transparent;
      color: white;
      outline: none;
      font-size: 1.2rem;
    }
    h5 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }
    p {
      opacity: 0.8;
    }
  }

  .suitors {
    > div {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      > div:not(:last-child) {
        position: relative;
        border-radius: 0.5rem;
        border: 1px white solid;
        width: 6rem;
        height: 2rem;
        input {
          font-size: 1rem;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding: 0 1rem;
          flex-shrink: 1;
          border: 0;
        }
        button {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 2rem;
          background: transparent;
          cursor: pointer;
          border-radius: 0;
          padding: 0;
          color: white;
        }
      }
      > div:last-child {
        button {
          font-size: 1rem;
        }
      }
    }
  }
`

const OwnerListForm: FC = () => {
  const [tokenId] = useRouteTokenId()
  const primeQuery = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    pollInterval: 30e3,
  })
  const { address } = useOnboard()
  const { Primes } = useContracts<true>()

  return (
    <OwnerListFormContainer>
      <Formik
        initialValues={{
          tokenId,
          fee: parseFloat(
            formatEther(primeQuery.data?.prime?.studFee ?? '0'),
          ),
          deadline: primeQuery.data?.prime?.deadline
            ? lightFormat(
                fromUnixTime(
                  parseInt(primeQuery.data.prime.deadline),
                ),
                'yyyy-MM-dd',
              )
            : undefined,
          suitors: (primeQuery.data?.prime?.suitors ?? []).map(
            ({ id }) => parseInt(id),
          ),
        }}
        onSubmit={() => {}}
        validate={async (values: OwnerValues) => {
          const errors: Partial<Record<keyof OwnerValues, string>> =
            {}

          if (!address || !Primes) {
            errors.tokenId = 'Not connected'
            return errors
          }

          if (!values.tokenId) {
            errors.tokenId = 'Required'
            return errors
          }

          return errors
        }}
      >
        {({
          isSubmitting,
          isValidating,
          isValid,
          values,
          errors,
        }) => {
          return (
            <Form>
              <div>
                {errors.tokenId && (
                  <div className="error">{errors.tokenId}</div>
                )}
              </div>
              <div className="field fee">
                <h5>Stud fee (ETH)</h5>
                <Field
                  type="number"
                  name="fee"
                  min={0}
                  step="0.000000000000000001"
                  placeholder="0 ETH"
                />
                <p>
                  You can optionally charge a stud fee, which must be
                  paid by other users breeding with this Prime. 90%
                  of this fee will be paid to you, and 10% will be
                  paid to the Primes DAO.
                </p>
                {errors.fee && (
                  <div className="error">{errors.fee}</div>
                )}
              </div>
              <div className="field deadline">
                <h5>Deadline</h5>
                <Field
                  type="date"
                  name="deadline"
                  placeholder="Deadline"
                />
                <p>
                  You optionally can set a deadline for breeding.
                  When the deadline passes, this Prime will be
                  effectively unlisted.
                </p>
                {errors.fee && (
                  <div className="error">{errors.fee}</div>
                )}
              </div>
              <div className="field suitors">
                <h5>Suitors</h5>
                <FieldArray
                  name="suitors"
                  render={(arrayHelpers) => (
                    <div>
                      {values.suitors?.length
                        ? values.suitors.map((suitor, index) => (
                            <div key={index}>
                              <Field
                                name={`suitors.${index}`}
                                placeholder="1"
                                min={2}
                                max={8192}
                                increment={1}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  arrayHelpers.remove(index)
                                }}
                              >
                                x
                              </button>
                            </div>
                          ))
                        : null}
                      <div>
                        {values.suitors?.length < 6 && (
                          <button
                            type="button"
                            onClick={() => {
                              arrayHelpers.push('')
                            }}
                          >
                            Add a suitor
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                />
                <p>
                  Optionally, up to 6 suitors can be defined. Suitors
                  are other Primes that you will allow to breed with
                  this Prime. For example, when listing{' '}
                  <span className="monospace">3</span>, you might
                  want to define suitors without including{' '}
                  <span className="monospace">2</span>, so that you
                  can prevent <span className="monospace">6</span>{' '}
                  from being minted.
                </p>
                {errors.suitors && (
                  <div className="error">{errors.suitors}</div>
                )}
              </div>
              <SendTransactionWidget
                buttonProps={{
                  disabled: isSubmitting || isValidating || !isValid,
                }}
                transactionOptions={{
                  transactionName: 'List for rental',
                }}
                contract={Primes}
                functionName="list"
                args={[
                  values.tokenId,
                  parseEther((values.fee ?? 0).toFixed(18)),
                  values.deadline
                    ? getUnixTime(
                        Date.parse(values.deadline.toString()),
                      )
                    : 0,
                  values.suitors,
                ]}
              />
            </Form>
          )
        }}
      </Formik>
    </OwnerListFormContainer>
  )
}

const OwnerUnlistForm: FC = () => {
  const [tokenId] = useRouteTokenId()
  const { Primes } = useContracts<true>()
  return (
    <div>
      <SendTransactionWidget
        contract={Primes}
        functionName="unlist"
        args={[tokenId]}
        transactionOptions={{
          transactionName: 'Unlist from rental',
        }}
      />
    </div>
  )
}

const OwnerFormsContainer = styled.div`
  padding: 1rem 0;
`

const OwnerForms: FC = () => {
  const [tokenId] = useRouteTokenId()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    pollInterval: 30e3,
    fetchPolicy: 'cache-only',
  })

  const [showModal, toggleShowModal] = useToggle(false)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  if (!data?.prime) return null

  return (
    <OwnerFormsContainer>
      <button
        data-tip="As the owner of this Prime, you can list, unlist or change list settings"
        onClick={toggleShowModal}
      >
        Manage rental
      </button>
      <Modal
        isOpen={showModal}
        onEscapeKeydown={toggleShowModal}
        onBackgroundClick={toggleShowModal}
        title={data.prime.isListed ? 'Manage listing' : 'List Prime'}
      >
        <OwnerListForm />
        {data.prime.isListed && <OwnerUnlistForm />}
      </Modal>
    </OwnerFormsContainer>
  )
}

const Container = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`

export const RentalData: FC<{ tokenId: number }> = ({ tokenId }) => {
  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    pollInterval: 30e3,
    fetchPolicy: 'cache-and-network',
  })

  const { address } = useOnboard()

  const isOwner = !!(
    data?.prime &&
    address &&
    address === data.prime.owner.address.toLowerCase()
  )

  return data?.prime ? (
    <Container>
      <h3>Rental data</h3>
      <div>
        <div>{data.prime.isListed ? 'Listed' : 'Not listed'}</div>
        {data.prime.isListed && (
          <div>
            {data.prime.suitors.length ? (
              <div>
                Suitors:{' '}
                {data.prime.suitors.map((s) => s.id.toString())}
              </div>
            ) : null}
            {data.prime.studFee && data.prime.studFee !== '0' ? (
              <div>
                Stud fee: {formatEther(data.prime.studFee)} ETH
              </div>
            ) : null}
            {data.prime.deadline ? (
              <div>
                Deadline:{' '}
                {formatRFC7231(
                  fromUnixTime(parseInt(data.prime.deadline)),
                )}
              </div>
            ) : null}
          </div>
        )}
        {isOwner && <OwnerForms />}
      </div>
    </Container>
  ) : null
}
