import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// @ts-ignore
import isPrime from 'is-prime'

import { useAttributes } from '../App/PrimesContext'
import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { List } from './List'
import { Attribute } from './Attribute'

const PrimeLinkContainer = styled(Link)`
  border: 1px white solid;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  color: white;
`
const PrimeLink: FC<{ id: string }> = ({ id }) => (
  <PrimeLinkContainer className="monospace" to={`/primes/${id}`}>
    {id}
  </PrimeLinkContainer>
)

export const PrimeDetailLists: FC<{ tokenId: number }> = ({
  tokenId,
}) => {
  const [attributes] = useAttributes()

  const { data } = usePrimeQuery({
    variables: { tokenId: tokenId.toString() },
    pollInterval: 20e3,
    fetchPolicy: 'cache-first',
  })

  const primeAttributes = useMemo<
    { key: string; name: string; symbol: FC }[]
  >(() => {
    if (!attributes) return []

    return Object.keys(attributes)
      .filter((key) =>
        attributes[key as keyof Attributes].has(tokenId),
      )
      .map((key) => {
        const [name, symbol] =
          ATTRIBUTE_NAMES[key as keyof Attributes]
        return { key, name, symbol: symbol as FC }
      })
  }, [attributes, tokenId])

  const prime = useMemo<boolean>(() => isPrime(tokenId), [tokenId])

  return (
    <>
      <List
        title="Properties"
        items={primeAttributes.map(({ key: id }) => ({
          id,
          value: <Attribute id={id as keyof Attributes} />,
        }))}
      />
      {data?.prime && prime ? (
        <>
          <List
            title="Twin Primes"
            items={(data.prime.twins ?? []).map(({ id }) => ({
              id,
              value: <PrimeLink id={id} />,
            }))}
          />
          <List
            title="Cousin Primes"
            items={(data.prime.cousins ?? []).map(({ id }) => ({
              id,
              value: <PrimeLink id={id} />,
            }))}
          />
          <List
            title="Sexy Primes"
            items={(data.prime.sexyPrimes ?? []).map(({ id }) => ({
              id,
              value: <PrimeLink id={id} />,
            }))}
          />
        </>
      ) : (
        <List
          title="Parents"
          items={(
            [data?.prime?.parent1, data?.prime?.parent2] as [
              { id: string },
              { id: string },
            ]
          )
            .filter(Boolean)
            .map(({ id }) => ({
              id,
              value: <PrimeLink id={id} />,
            }))}
        />
      )}
      <List
        title="Children"
        items={[
          ...new Set(
            [
              ...(data?.prime?.childrenAsParent1 ?? []),
              ...(data?.prime?.childrenAsParent2 ?? []),
            ].map((x) => x.id),
          ),
        ].map((id) => ({
          id,
          value: <PrimeLink id={id} />,
        }))}
      />
      {data?.prime?.primeFactors.length ? (
        <>
          <List
            title="Prime Factors"
            items={data?.prime?.primeFactors
              .map((id) => id.toString())
              .map((id) => ({
                id,
                value: <PrimeLink id={id} />,
              }))}
          />
        </>
      ) : null}
    </>
  )
}
