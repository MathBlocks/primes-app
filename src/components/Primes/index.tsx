import { FC, useEffect, useMemo, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import { createStateContext, useTimeoutFn, useTitle } from 'react-use'
import SkeletonLoader from 'tiny-skeleton-loader-react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Simple } from 'pixi-cull'
import { GlowFilter } from '@pixi/filter-glow'

import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import {
  generateAttributes,
  ATTRIBUTE_NAMES,
  Attributes,
} from '../../attributes'
import { getSVGDataURI } from '../PrimeSVG'

const createExclusiveSet = (sets: Set<number>[]): Set<number> => {
  const result = new Set<number>()
  for (let i = 1; i <= N_MAX; i++) {
    if (sets.every((set) => set.has(i))) {
      result.add(i)
    }
  }
  return result
}

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

const PixiContainer = styled.div``

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

const N_SIZE = 128
const N_MAX = 16384
const SCALE = 256
const CANVAS_SIZE = N_SIZE * 6

enum Direction {
  Right,
  Up,
  Left,
  Down,
}

const [useAttributes, AttributesProvider] = createStateContext<
  Attributes | undefined
>(undefined)

const [useSelectedAttributes, SelectedAttributesProvider] = createStateContext<
  Partial<Record<keyof Attributes, boolean>>
>({})

const [useSelectedTokenId, SelectedTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

const [useVisible, VisibleProvider] = createStateContext<Set<number>>(new Set())

const [useRouteTokenId, RouteTokenIdProvider] = createStateContext<
  number | undefined
>(undefined)

const Updater: FC = () => {
  const [attributes, setAttributes] = useAttributes()
  const [selectedAttributes] = useSelectedAttributes()
  const [, setVisible] = useVisible()
  const [routeTokenId, setRouteTokenId] = useRouteTokenId()

  const { tokenId: tokenIdStr } = useParams<{ tokenId?: string }>()

  useTimeoutFn(() => {
    // Delay generating the attributes because it's heavy
    setAttributes(generateAttributes())
  }, 1000)

  useEffect(() => {
    if (!selectedAttributes || !attributes) return

    const visible_ = createExclusiveSet(
      Object.entries(selectedAttributes)
        .filter(([, active]) => active)
        .map(([id]) => attributes[id as keyof Attributes]),
    )
    setVisible(visible_)
  }, [selectedAttributes, attributes, setVisible])

  useEffect(() => {
    const tokenId = tokenIdStr ? parseInt(tokenIdStr) : undefined
    const valid = tokenId && tokenId > 0 && tokenId < N_MAX
    setRouteTokenId(valid ? tokenId : undefined)
  }, [tokenIdStr])

  useTitle(routeTokenId ? `Prime #${routeTokenId}` : 'Primes')

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [attributes])

  return null
}

const PrimesPixi: FC = () => {
  // Context
  const history = useHistory()
  const [attributes] = useAttributes()
  const [visible] = useVisible()
  const [selectedTokenId, setSelectedTokenId] = useSelectedTokenId()

  // Refs for Pixi
  const app = useRef<PIXI.Application>()
  const viewport = useRef<Viewport>()
  const cull = useRef<Simple>()
  const container = useRef<HTMLDivElement>(null)
  const selectedTokenIdRef = useRef<number | undefined>(selectedTokenId)

  // Local state
  // const [hoveredTokenId, setHoveredTokenId] = useSelectedTokenId()

  useEffect(() => {
    if (!attributes) return

    app.current = new PIXI.Application({
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: 0x232323,
    })
    const app_ = app.current

    container.current?.appendChild(app_.view)

    viewport.current = new Viewport({
      screenWidth: CANVAS_SIZE,
      screenHeight: CANVAS_SIZE,
      worldWidth: SCALE * N_SIZE,
      worldHeight: SCALE * N_SIZE,
      interaction: app_.renderer.plugins.interaction,
    })
    const viewport_ = viewport.current

    app_.stage.addChild(viewport_)

    viewport_
      .drag()
      .pinch()
      .wheel()
      .decelerate()
      .clamp({ left: true, right: true, bottom: true, top: true })
      .clampZoom({ minScale: 0.025, maxScale: 1 })
      .setZoom(0.025)

    cull.current = new Simple()
    const cull_ = cull.current
    cull_.addList(viewport_.children)

    // Build spiral
    ;(() => {
      const addSprite = (tokenId: number, posX: number, posY: number) => {
        if (tokenId > N_MAX) return
        const prime = attributes.prime.has(tokenId)

        const container = viewport_.addChild(
          new PIXI.Sprite(PIXI.Texture.EMPTY),
        )
        container.width = container.height = SCALE - 50
        container.position.set(posX * SCALE + 25, posY * SCALE + 25)
        container.interactive = true

        // @ts-ignore
        container.data = { tokenId, prime, svg: getSVGDataURI(tokenId) }

        container.on('mouseover', () => {
          container.filters = [
            new GlowFilter({
              distance: 16,
              outerStrength: 4,
              quality: 1,
            }),
          ]
        })
        container.on('mouseout', () => {
          container.filters = []
        })

        const onClick = () => {
          if (!viewport_.moving) {
            viewport_.animate({
              time: 1000,
              position: new PIXI.Point(
                container.x + container.width / 2,
                container.y + container.height / 2,
              ),
              width: container.width,
              height: container.height,
              scale: 1,
              ease: 'easeInOutSine',
              removeOnInterrupt: true,
            })
          }

          if (selectedTokenIdRef.current === tokenId) {
            history.push(`/primes/${tokenId}`)
          }

          setSelectedTokenId(tokenId)
          selectedTokenIdRef.current = tokenId
        }
        container.on('click', onClick)
        container.on('touchstart', onClick)

        const square = new PIXI.Sprite(PIXI.Texture.WHITE)
        square.width = 1
        square.height = 1
        square.tint = prime ? 0xffffff : 0x000000

        container.addChild(square)

        const detail = new PIXI.Sprite()
        detail.visible = false
        square.addChild(detail)
      }

      const arr: number[][] = []
      for (let i = 0; i < N_MAX; i++) {
        arr[i] = Array(N_SIZE).fill(undefined)
      }

      let i = 2
      let direction: Direction = Direction.Right

      let y = N_SIZE / 2
      let x = N_SIZE % 2 === 0 ? y - 1 : y

      // Place first
      addSprite(1, x, y)

      for (let j = i; j < N_MAX + i; j++) {
        arr[y][x] = j

        switch (direction) {
          case Direction.Up: {
            if (arr[y][x - 1] === undefined) {
              direction = Direction.Left
            }
            break
          }
          case Direction.Right: {
            if (x <= N_MAX - 1 && arr[y - 1][x] === undefined && j > i) {
              direction = Direction.Up
            }
            break
          }
          case Direction.Left: {
            if (x === 0 || arr[y + 1][x] === undefined) {
              direction = Direction.Down
            }
            break
          }
          case Direction.Down: {
            if (arr[y][x + 1] === undefined) {
              direction = Direction.Right
            }
            break
          }
        }

        switch (direction) {
          case Direction.Right:
            x += 1
            break
          case Direction.Up:
            y -= 1
            break
          case Direction.Left:
            x -= 1
            break
          case Direction.Down:
            y += 1
            break
        }

        addSprite(j, x, y)
      }
    })()

    app_.start()

    PIXI.Ticker.shared.add(() => {
      if (viewport_.dirty) {
        const bounds = viewport_.getVisibleBounds()
        cull_.cull(bounds)

        const visible = cull_.stats().visible < 48

        cull_.query(bounds).forEach((container) => {
          const detail = ((container as PIXI.Sprite).children[0] as PIXI.Sprite)
            .children[0] as PIXI.Sprite
          detail.visible = visible

          const hasResource = detail.texture?.baseTexture?.resource
          if (hasResource) {
            if (!visible) {
              detail.texture.destroy()
            }
          } else if (visible) {
            const resource = new PIXI.SVGResource((container as any).data.svg)
            detail.texture = PIXI.Texture.from(resource as any, {
              resolution: 16,
            })
          }
        })

        viewport_.dirty = false
      }
    })

    return () => {
      app_?.destroy(true, true)
    }
  }, [attributes, history, setSelectedTokenId])

  useEffect(() => {
    if (!viewport.current || !cull.current) return

    // Set visibility of squares
    viewport.current.children.forEach((child) => {
      ;(child as PIXI.Sprite).children[0].visible = visible.has(
        (child as any).data.tokenId,
      )
    })
  }, [visible, viewport, cull])

  return <PixiContainer ref={container} />
}

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

const Prime: FC<{ tokenId: number }> = ({ tokenId }) => {
  const { data } = usePrimeQuery({ variables: { tokenId: tokenId.toString() } })

  const attributes = useMemo<
    { key: string; name: string; symbol: string }[]
  >(() => {
    if (!data?.prime) return []

    return Object.keys(data.prime)
      .filter(
        (key) =>
          Object.prototype.hasOwnProperty.call(ATTRIBUTE_NAMES, key) &&
          data.prime &&
          (data.prime[key as keyof typeof data['prime']] as Boolean),
      )
      .map((key) => ({
        key,
        name: ATTRIBUTE_NAMES[key as keyof typeof ATTRIBUTE_NAMES][0],
        symbol: ATTRIBUTE_NAMES[key as keyof typeof ATTRIBUTE_NAMES][1],
      }))
  }, [data])

  return (
    <Container>
      <h1>{tokenId}</h1>
      <div>
        {data?.prime ? (
          <>
            <div>
              <div>Owner</div>
              <div>{data.prime.owner.address}</div>
            </div>
            <div>
              <img height="512" width="512" src={getSVGDataURI(tokenId)} />
              {/*<img src={data.prime.image} alt={tokenId} />*/}
            </div>
            <ul>
              {attributes.map(({ key, name }) => (
                <li key={key}>{name}</li>
              ))}
            </ul>
          </>
        ) : (
          <SkeletonLoader />
        )}
      </div>
    </Container>
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
  <RouteTokenIdProvider>
    <AttributesProvider>
      <SelectedAttributesProvider>
        <VisibleProvider>
          <SelectedTokenIdProvider>
            <Content />
            <Updater />
          </SelectedTokenIdProvider>
        </VisibleProvider>
      </SelectedAttributesProvider>
    </AttributesProvider>
  </RouteTokenIdProvider>
)
