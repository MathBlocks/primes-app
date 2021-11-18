import { FC, useEffect, useMemo, useRef } from 'react'
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
import { useEthers } from '@usedapp/core'
import { usePrimesForAccountQuery } from '../../graphql/subgraph/subgraph'

const AttrButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
`

const AttrButton = styled.button<{ active?: boolean; hovered?: boolean }>`
  border-radius: 4px;
  background: ${({ active }) => (active ? '#444' : 'transparent')};
  appearance: none;
  color: ${({ active }) => (active ? 'white' : '#444')};
  border: 1px ${({ hovered }) => (hovered ? '#888' : 'transparent')} solid;
  font-size: 1.5rem;
`

const ActiveSet = styled.h3`
  margin-top: 0;
  font-family: monospace, serif;
  font-size: 1rem;
  line-height: 1.5rem;

  span {
    display: inline-block;
    width: 1.4rem;
    font-size: 1rem;
    text-align: center;
  }
`

const AttributesSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > :last-child {
    width: 33rem;
  }
`

const AttributesSelector: FC = () => {
  const [attributes] = useAttributes()
  const [selectedAttributes, setSelectedAttributes] = useSelectedAttributes()
  const [visible] = useVisible()
  const [mintedPrimes] = useMintedPrimes()
  const [hoveredTokenId] = useHoveredTokenId()

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
  }, [mintedPrimes.size, visible.size])

  return (
    <AttributesSelectorContainer>
      <ActiveSet
        data-tip={`There are ${visible.size} Primes with the selected attributes, and ${visibleMinted.size} of those have been minted.`}
      >
        Σ
        {activeAttributes.length ? (
          <>
            <span>&#123;</span>
            {activeAttributes.map((id) => (
              <span key={id}>{ATTRIBUTE_NAMES[id as keyof Attributes][1]}</span>
            ))}
            <span>&#125;</span>
          </>
        ) : (
          ' '
        )}
        = {visible.size}
        <br />Σ<span>&#123;</span>
        {activeAttributes.map((id) => (
          <span key={id}>{ATTRIBUTE_NAMES[id as keyof Attributes][1]}</span>
        ))}
        <span>⛏️</span>
        <span>&#125;</span>= {visibleMinted.size}
      </ActiveSet>
      <AttrButtons>
        {attributes &&
          Object.entries(attributes).map(([id]) => {
            const set = attributes[id as keyof Attributes]
            const [name, symbol] = ATTRIBUTE_NAMES[id as keyof Attributes]
            return (
              <AttrButton
                key={id}
                onClick={() => {
                  toggleAttribute(id as keyof Attributes)
                }}
                active={selectedAttributes[id as keyof Attributes]}
                hovered={hoveredTokenId ? set.has(hoveredTokenId) : false}
                data-tip={`${name} (${set.size})`}
              >
                {symbol}
              </AttrButton>
            )
          })}
      </AttrButtons>
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
      hovered={hoveredTokenId ? myPrimes.set.has(hoveredTokenId) : false}
      data-tip={`Owned by me (${myPrimes.set.size})`}
    >
      My Primes
    </AttrButton>
  )
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
`

export const Overlay: FC = () => (
  <Container>
    <AttributesSelector />
    <MyPrimesSelector />
  </Container>
)
