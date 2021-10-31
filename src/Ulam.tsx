import { FC, useLayoutEffect, useRef, useState } from 'react'
import { Application, Sprite, Texture } from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import styled from 'styled-components'

import {
  generateAttributes,
  attributeNames,
  generateFactors,
  Attributes,
} from './attributes'

const Container = styled.div``

const PixiContainer = styled.div`
  width: 512px;
  height: 512px;
`

const AttrButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
`

const AttrButton = styled.button<{ active?: boolean }>`
  background: transparent;
  appearance: none;
  color: white;
  border: 1px ${({ active }) => (active ? 'white' : '#444')} solid;
`

const CANVAS_SIZE = 512
const N_SIZE = 128
const N_MAX = 16384

enum Direction {
  Right,
  Up,
  Left,
  Down,
}

const ATTRIBUTES = generateAttributes()
const FACTORS = generateFactors()

export const Ulam: FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const app = useRef<Application>()
  const viewport = useRef<Viewport>()

  const [tokenId, setTokenId] = useState<number>(1)
  const [attributes, setAttributes] = useState<
    Partial<Record<keyof Attributes, boolean>>
  >({ prime: true })
  const [filterOR, setFilterOR] = useState(true)

  useLayoutEffect(() => {
    app.current = new Application({
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: 0x000000,
    })
    const app_ = app.current

    container.current?.appendChild(app_.view)
    app_.start()

    viewport.current = new Viewport({
      screenWidth: CANVAS_SIZE,
      screenHeight: CANVAS_SIZE,
      worldWidth: N_SIZE * 4,
      worldHeight: N_SIZE * 4,
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
      .clampZoom({ minScale: 1, maxScale: 16 })

    // Build spiral
    ;(() => {
      const addSprite = (n: number, posX: number, posY: number) => {
        if (n > N_MAX) return

        const sprite = viewport_.addChild(new Sprite(Texture.WHITE))
        sprite.tint = ATTRIBUTES.prime.has(n) ? 0xffffff : 0x555555
        sprite.width = sprite.height = 3
        sprite.position.set(posX * 4, posY * 4)
        sprite.interactive = true
        sprite.on('mouseover', () => {
          setTokenId(n)
        })

        // @ts-ignore
        sprite.n = n
      }

      const arr: number[][] = []
      for (let i = 0; i < N_MAX; i++) {
        arr[i] = Array(N_SIZE).fill(undefined)
      }

      let i = 1
      let direction: Direction = Direction.Right

      let y = N_SIZE / 2
      let x = N_SIZE % 2 == 0 ? y - 1 : y

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
            if (x == 0 || arr[y + 1][x] === undefined) {
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

    return () => {
      app_?.destroy(true, true)
    }
  }, [])

  const toggleAttribute = (attrId: keyof Attributes) => {
    setAttributes({ ...attributes, [attrId]: !attributes[attrId] })
  }

  useLayoutEffect(() => {
    const check = (n: number): boolean =>
      Object.entries(attributes)
        .filter(([, active]) => active)
        .map(([id]) => ATTRIBUTES[id as keyof Attributes])
        [filterOR ? 'some' : 'every']((set) => set.has(n))

    viewport.current?.children.forEach((sprite) => {
      // @ts-ignore
      sprite.visible = check(sprite.n)
    })
  }, [attributes])

  return (
    <Container>
      <PixiContainer ref={container} />
      <div>{tokenId}</div>
      <AttrButtons>
        {Object.entries(ATTRIBUTES).map(([id]) => (
          <AttrButton
            key={id}
            onClick={() => toggleAttribute(id as keyof Attributes)}
            active={attributes[id as keyof Attributes]}
          >
            {attributeNames[id as keyof typeof attributeNames]}
          </AttrButton>
        ))}
      </AttrButtons>
      <AttrButtons>
        <AttrButton onClick={() => setFilterOR(!filterOR)}>
          {filterOR ? 'AND' : 'OR'}
        </AttrButton>
      </AttrButtons>
      <div>
        {Object.entries(ATTRIBUTES)
          .filter(([, set]) => set.has(tokenId))
          .map(([id]) => (
            <div key={id}>
              {attributeNames[id as keyof typeof attributeNames]}
            </div>
          ))}
      </div>
    </Container>
  )
}
