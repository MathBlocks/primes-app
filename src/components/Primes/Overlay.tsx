import { FC, ReactNode, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import { createExclusiveSet } from '../../utils'

import {
  useSelectedAttributes,
  useAttributes,
  useVisible,
  useHoveredTokenId,
  useMintedPrimes,
  useMyPrimes,
} from '../App/PrimesContext'
import { useToggle } from 'react-use'
// import { useEthers } from '@usedapp/core'
// import { usePrimesForAccountQuery } from '../../graphql/subgraph/subgraph'

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

const ActiveSet = styled.div`
  margin-top: 0;
  font-size: 1.2rem;
  line-height: 1.6rem;

  span {
    margin: 0 5px;
  }

  svg {
    position: relative;
    top: 2px;
  }

  svg:not(:last-of-type) {
    margin-right: 5px;
  }
`

const AttributesSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  pointer-events: none;

  > * {
    pointer-events: visible;
  }

  > :last-child {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.7);
    min-width: 10rem;
    height: min-content;
    text-align: right;
  }

  > :first-child {
    width: 44%;
    text-align: left;
    > button {
      min-width: 8rem;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  .current-prime {
    font-size: 2rem;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const CurrentPrime: FC = () => {
  const [hoveredTokenId] = useHoveredTokenId()

  return (
    <div className="current-prime">
      <div className="monospace">{hoveredTokenId ?? '.....'}</div>
    </div>
  )
}

const AttributesSelector: FC = () => {
  const [attributes] = useAttributes()
  const [selectedAttributes, setSelectedAttributes] =
    useSelectedAttributes()
  const [visible] = useVisible()
  const [mintedPrimes] = useMintedPrimes()
  const [hoveredTokenId] = useHoveredTokenId()
  const [showSelector, toggleShowSelector] = useToggle(true)

  const activeAttributes = Object.keys(selectedAttributes).filter(
    (id) => selectedAttributes[id as keyof Attributes],
  )

  const toggleAttribute = (attrId: keyof Attributes) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [attrId]: !selectedAttributes[attrId],
    })
  }

  const visibleMinted = useMemo<Set<number>>(
    () => createExclusiveSet([mintedPrimes, visible]),
    [mintedPrimes, visible],
  )

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [mintedPrimes.size, visible.size, showSelector])

  return (
    <AttributesSelectorContainer>
      <div>
        <button onClick={toggleShowSelector}>
          {showSelector ? 'Hide filter' : 'Show filter'}
        </button>
        {showSelector && attributes ? (
          <AttrButtons>
            {Object.entries(attributes).map(([id]) => {
              const set = attributes[id as keyof Attributes]
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
        ) : null}
      </div>
      <div>
        <CurrentPrime />
        <ActiveSet
          data-tip={`There are ${visible.size} Primes with the selected attributes, and ${visibleMinted.size} of those have been minted.`}
        >
          Σ
          {activeAttributes.length ? (
            <>
              <span>&#123;</span>
              {activeAttributes.map((id) => {
                const [, Icon] = ATTRIBUTE_NAMES[
                  id as keyof Attributes
                ] as [string, FC]
                return <Icon key={id} />
              })}
              <span>&#125;</span>
            </>
          ) : (
            ' '
          )}
          = {visible.size}
          <br />
          {visibleMinted.size} Minted
        </ActiveSet>
      </div>
    </AttributesSelectorContainer>
  )
}

const MyPrimesSelector: FC = () => {
  const [hoveredTokenId] = useHoveredTokenId()
  const [myPrimes, setMyPrimes] = useMyPrimes()

  return (
    <AttrButton
      onClick={() => {
        setMyPrimes({ ...myPrimes, enabled: !myPrimes.enabled })
      }}
      active={myPrimes.enabled}
      hovered={
        hoveredTokenId ? myPrimes.set.has(hoveredTokenId) : false
      }
      data-tip={`Owned by me (${myPrimes.set.size})`}
    >
      My Primes
    </AttrButton>
  )
}
const Container = styled.div`
  position: absolute;
  padding: 1rem;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 2rem;
  user-select: none;
  pointer-events: none;
`

export const Overlay: FC = () => (
  <Container>
    <AttributesSelector />
    {/*<MyPrimesSelector />*/}
  </Container>
)
