import { FC } from 'react'
import styled from 'styled-components'
import SkeletonLoader from 'tiny-skeleton-loader-react'

import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'

import { PrimesPixi } from './PrimesPixi'
import {
  PrimesContext,
  useSelectedAttributes,
  useAttributes,
  useRouteTokenId,
  useVisible,
} from './PrimesContext'
import { Prime } from './Prime'

const Skellingtons: FC<{ count: number }> = ({ count }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
  </>
)

const AttrButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  > [class^='styles_skeleton'] {
    width: 2.875rem !important;
    height: 2.875rem !important;
  }
`

const AttrButton = styled.button<{ active?: boolean }>`
  border-radius: 4px;
  background: transparent;
  appearance: none;
  color: ${({ active }) => (active ? 'white' : '#444')};
  border: 1px ${({ active }) => (active ? 'white' : '#444')} solid;
  font-size: 2rem;
`

const Container = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  > :last-child {
    min-width: 720px;
    min-height: 720px;
  }

  .active-set {
    margin-top: 0;
    font-family: monospace, serif;
    font-size: 1.4rem;
    color: #777;
    line-height: 2rem;

    span {
      display: inline-block;
      width: 2rem;
      font-size: 1.2rem;
      text-align: center;
    }
  }
`

const AttributesSelector: FC = () => {
  const [attributes] = useAttributes()
  const [selectedAttributes, setSelectedAttributes] = useSelectedAttributes()
  const [visible] = useVisible()

  const activeAttributes = Object.keys(selectedAttributes).filter(
    (id) => selectedAttributes[id as keyof Attributes],
  )

  const toggleAttribute = (attrId: keyof Attributes) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [attrId]: !selectedAttributes[attrId],
    })
  }

  return (
    <div>
      <h3 className="active-set">
        Σ &#123;
        {activeAttributes.length ? (
          activeAttributes.map((id) => (
            <span key={id}>{ATTRIBUTE_NAMES[id as keyof Attributes][1]}</span>
          ))
        ) : (
          <span>n</span>
        )}
        &#125; = {visible.size}
      </h3>
      <AttrButtons>
        {attributes ? (
          Object.entries(attributes).map(([id]) => (
            <AttrButton
              key={id}
              onClick={() => {
                toggleAttribute(id as keyof Attributes)
              }}
              active={selectedAttributes[id as keyof Attributes]}
              data-tip={`${ATTRIBUTE_NAMES[id as keyof Attributes][0]} (${
                attributes[id as keyof Attributes].size
              })`}
            >
              {ATTRIBUTE_NAMES[id as keyof Attributes][1]}
            </AttrButton>
          ))
        ) : (
          <Skellingtons count={25} />
        )}
      </AttrButtons>
    </div>
  )
}

// Name me
const MainContainer = styled.div<{ hasPrime: boolean }>`
  > :first-child {
    display: ${({ hasPrime }) => (hasPrime ? 'none' : 'block')};
  }
  > :last-child {
    display: ${({ hasPrime }) => (hasPrime ? 'block' : 'none')};
  }
`

// Keep PrimesPixi rendered if possible
// (costs a fair chunk of memory, but much faster for navigating around)
const Content: FC = () => {
  const [attributes] = useAttributes()
  const [tokenId] = useRouteTokenId()
  return (
    <Container>
      <div>
        <AttributesSelector />
      </div>
      <MainContainer hasPrime={!!tokenId}>
        {attributes ? <PrimesPixi /> : <SkeletonLoader />}
        {tokenId ? <Prime tokenId={tokenId} /> : <div />}
      </MainContainer>
    </Container>
  )
}

export const Primes: FC = () => (
  <PrimesContext>
    <Content />
  </PrimesContext>
)
