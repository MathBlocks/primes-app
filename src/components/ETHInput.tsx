import { FC } from 'react'
import { Field } from 'formik'
import styled from 'styled-components'
import { formatEther } from 'ethers/lib/utils'
import { useOnboard } from './App/OnboardProvider'

const Container = styled.div`
  margin-bottom: 1rem;

  > :first-child {
    margin-bottom: 1rem;

    > :first-child {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    > input {
      appearance: none;
      border: none;
      background-color: white;
      color: black;
      border-radius: 1rem;
      outline: none;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      width: 100%;
    }
  }

  > :last-child {
    > :first-child {
      font-weight: bold;
    }
  }
`

export const ETHInput: FC<{ name: string; label?: string }> = ({
  name,
  label,
}) => {
  const { balance } = useOnboard()
  return (
    <Container>
      <div>
        <div>{label ?? name[0].toUpperCase() + name.slice(1)}</div>
        <Field
          className="monospace"
          type="number"
          name={name}
          min={0}
          step="0.000000000000000001"
        />
      </div>
      <div>
        <div>Balance</div>
        <div>
          <span className="monospace">
            {formatEther(balance ?? '0')}
          </span>{' '}
          ETH
        </div>
      </div>
    </Container>
  )
}
