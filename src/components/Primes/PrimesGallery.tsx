import { FC, useEffect, useMemo } from 'react'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'

import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { createExclusiveSet } from '../../utils'

import {
  useSelectedAttributes,
  useAttributes,
  useVisible,
  useHoveredTokenId,
  useMintedPrimes,
} from '../App/PrimesContext'
import {
  PrimePreviewsForIdsQueryVariables,
  PrimePreviewsQueryVariables,
  usePrimePreviewsForIdsQuery,
  usePrimePreviewsQuery,
} from '../../graphql/subgraph/subgraph'
import { usePrevious } from 'react-use'

const AttrButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;
`

const AttrButton = styled.button<{
  active?: boolean
  hovered?: boolean
}>`
  border-radius: 4px;
  background: ${({ active }) => (active ? '#666' : '#000')};
  appearance: none;
  color: ${({ active }) => (active ? 'white' : '#444')};
  border: 1px ${({ hovered }) => (hovered ? '#888' : 'transparent')}
    solid;
  padding: 0.3rem;
  line-height: 0;
`

const AttributesSelectorContainer = styled.div`
  max-width: 40rem;
  svg {
    width: 2rem;
    height: 2rem;
  }
`

const AttributesSelector: FC = () => {
  const [attributes] = useAttributes()
  const [selectedAttributes, setSelectedAttributes] =
    useSelectedAttributes()
  const [visible] = useVisible()
  const [mintedPrimes] = useMintedPrimes()
  const [hoveredTokenId] = useHoveredTokenId()

  const toggleAttribute = (attrId: keyof Attributes) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [attrId]: !selectedAttributes[attrId],
    })
  }

  const mintedAttributes = useMemo<Attributes | undefined>(
    () =>
      attributes
        ? (Object.fromEntries(
            Object.entries(attributes).map(([key, set]) => [
              key as keyof Attributes,
              createExclusiveSet([mintedPrimes, set]),
            ]),
          ) as never as Attributes)
        : undefined,
    [attributes, mintedPrimes],
  )

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [mintedPrimes.size, visible.size])

  return (
    <AttributesSelectorContainer>
      <AttrButtons>
        {Object.entries(mintedAttributes ?? {}).map(([id]) => {
          const set = (mintedAttributes as Attributes)[
            id as keyof Attributes
          ]
          const [name, Icon] = ATTRIBUTE_NAMES[
            id as keyof Attributes
          ] as [string, FC]
          return (
            <AttrButton
              key={id}
              onClick={() => {
                toggleAttribute(id as keyof Attributes)
              }}
              active={selectedAttributes[id as keyof Attributes]}
              hovered={
                hoveredTokenId ? set.has(hoveredTokenId) : false
              }
              data-tip={`${name} (${set.size})`}
            >
              <Icon />
            </AttrButton>
          )
        })}
      </AttrButtons>
    </AttributesSelectorContainer>
  )
}

const PrimePreviewContainer = styled.div<{ isPrime: boolean }>`
  background-color: ${({ isPrime }) =>
    isPrime ? 'black' : 'black'}; // FIXME white, black
  border-radius: 0.5rem;
  padding: 1rem;
  img {
    width: 100%;
    height: auto;
  }
  a {
    border: 0;
  }
`

const PrimePreview: FC<{
  tokenId: number
  image: string
  isPrime: boolean
}> = ({ tokenId, image, isPrime }) => {
  return (
    <PrimePreviewContainer isPrime={isPrime}>
      <Link to={`/primes/${tokenId}`}>
        <img src={image} alt={tokenId.toString()} />
      </Link>
    </PrimePreviewContainer>
  )
}

const Container = styled.div`
  .top {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-auto-rows: 1fr;
    gap: 3rem;

    &:before {
      content: '';
      width: 0;
      padding-bottom: 100%;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }

    > *:first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
  }

  .no-results {
    text-align: center;
  }
`

const LIMIT = 30

export const PrimesGallery: FC = () => {
  const [visible] = useVisible()
  const visiblePrev = usePrevious(visible)
  const [mintedPrimes] = useMintedPrimes()

  const variables = useMemo(() => {
    let ids = [...mintedPrimes.values()]
      .filter((tokenId) => visible.has(tokenId))
      .map((tokenId) => tokenId.toString())
    ids = ids.length === mintedPrimes.size ? [] : ids
    return {
      offset: 0,
      limit: LIMIT,
      ids,
    }
  }, [mintedPrimes, visible])
  const forIds = variables.ids.length > 0

  const primePreviewsQuery = usePrimePreviewsQuery({ variables })
  const primePreviewsForIdsQuery = usePrimePreviewsForIdsQuery({
    variables,
  })
  const query = forIds
    ? primePreviewsForIdsQuery
    : primePreviewsQuery

  const sortedData = useMemo(
    () =>
      (query.data?.primes ?? [])
        .filter((p) => visible.has(p.number))
        .sort((a, b) => a.number - b.number),
    [query.data, visible],
  )

  useEffect(() => {
    if (visiblePrev && visiblePrev.size !== visible.size) {
      query.refetch({ offset: 0 })
    }
  }, [query, visible.size, visiblePrev])

  return (
    <Container>
      <div className="top">
        <AttributesSelector />
      </div>
      <div>
        <InfiniteScroll
          className="items"
          next={() => {
            query.fetchMore({
              variables: { offset: sortedData.length },
              updateQuery(prevResult, { fetchMoreResult }) {
                if (!fetchMoreResult) return prevResult
                return {
                  ...prevResult,
                  primes: [
                    ...prevResult.primes,
                    ...fetchMoreResult.primes,
                  ],
                }
              },
            })
          }}
          hasMore={sortedData.length < visible.size}
          loader={<div />}
          dataLength={sortedData.length}
        >
          {sortedData.map((prime) => (
            <PrimePreview
              tokenId={prime.number}
              key={prime.id}
              isPrime={prime.isPrime}
              image={prime.image}
            />
          ))}
        </InfiniteScroll>
      </div>
      {sortedData.length === 0 && (
        <div className="no-results">No results</div>
      )}
    </Container>
  )
}
