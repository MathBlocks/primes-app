import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useEthers } from '@usedapp/core'
import { Formik, Form, Field } from 'formik'
import { formatEther } from 'ethers/lib/utils'
import ReactTooltip from 'react-tooltip'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { SendTransactionWidget } from '../SendTransactionWidget'
import { useContracts } from '../App/DAppContext'
import { useRouteTokenId } from './Context'

interface OwnerValues {
  tokenId: number
  fee?: number
  deadline?: number
  suitors?: number[]
}

const OwnerListForm: FC = () => {
  const [tokenId] = useRouteTokenId()
  const { account } = useEthers()
  const { Primes } = useContracts<true>()

  return (
    <div>
      <Formik
        initialValues={{ tokenId }}
        onSubmit={() => {}}
        validate={async (values: OwnerValues) => {
          const errors: Partial<Record<keyof OwnerValues, string>> =
            {}

          if (!account || !Primes) {
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
        }) => (
          <Form>
            <div>
              {errors.tokenId && (
                <div className="error">{errors.tokenId}</div>
              )}
            </div>
            <div>
              <h5>Stud fee</h5>
              <Field
                type="number"
                name="studFee"
                min={0}
                placeholder="0 ETH"
              />
              <p>
                You can optionally charge a stud fee, which must be
                paid by other users breeding with this Prime. 90% of
                this fee will be paid to you, and 10% will be paid to
                the Primes DAO.
              </p>
              {errors.fee && (
                <div className="error">{errors.fee}</div>
              )}
            </div>
            <div>
              <h5>Deadline</h5>
              <Field
                type="date"
                name="deadline"
                placeholder="Deadline"
              />
              <p>
                You optionally can set a deadline for breeding. When
                the deadline passes, this Prime will be effectively
                unlisted.
              </p>
              {errors.fee && (
                <div className="error">{errors.fee}</div>
              )}
            </div>
            <div>
              <h5>Suitors</h5>
              <div>
                <Field
                  type="number"
                  name="suitors[0]"
                  placeholder="1"
                  min={2}
                  max={8192}
                  increment={1}
                />
                <Field
                  type="number"
                  name="suitors[1]"
                  placeholder="2"
                  min={2}
                  max={8192}
                  increment={1}
                />
                <Field
                  type="number"
                  name="suitors[2]"
                  placeholder="3"
                  min={2}
                  max={8192}
                  increment={1}
                />
                <Field
                  type="number"
                  name="suitors[3]"
                  placeholder="4"
                  min={2}
                  max={8192}
                  increment={1}
                />
                <Field
                  type="number"
                  name="suitors[4]"
                  placeholder="5"
                  min={2}
                  max={8192}
                  increment={1}
                />
                <Field
                  type="number"
                  name="suitors[5]"
                  placeholder="6"
                  min={2}
                  max={8192}
                  increment={1}
                />
              </div>
              <p>
                Optionally, up to 6 suitors can be defined. Suitors
                are other Primes that you will allow to breed with
                this Prime. For example, when listing{' '}
                <span className="monospace">3</span>, you might want
                to define suitors without including{' '}
                <span className="monospace">2</span>, so that you can
                prevent <span className="monospace">6</span> from
                being minted.
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
                values.fee,
                values.deadline,
                values.suitors,
              ]}
            />
          </Form>
        )}
      </Formik>
    </div>
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

const OwnerForms: FC = () => {
  const [tokenId] = useRouteTokenId()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    fetchPolicy: 'cache-only',
  })

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  if (!data?.prime) return null

  return (
    <div>
      <h4 data-tip="As the owner of this Prime, you can list, unlist or change list settings">
        Manage rental
      </h4>
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

  return (
    <Container>
      <h3>Rental</h3>
      {data?.prime && (
        <div>
          <div>{data.prime.isListed ? 'Listed' : 'Not listed'}</div>
          {data.prime.isListed && (
            <div>
              <div>
                Suitors:{' '}
                {data.prime.suitors.map((s) => s.id.toString())}
              </div>
              <div>
                Stud fee: {formatEther(data.prime.studFee ?? '0')}
              </div>
              {/*TODO format date, handle 0 value*/}
              <div>Deadline: {data.prime.deadline?.toString()}</div>
            </div>
          )}
          {isOwner && <OwnerForms />}
        </div>
      )}
    </Container>
  )
}
