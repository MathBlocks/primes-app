import { FC, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Simple } from 'pixi-cull'
import { GlowFilter } from '@pixi/filter-glow'

import { getSVGDataURI } from '../PrimeSVG'

import { N_MAX, CANVAS_SIZE, N_SIZE, SCALE } from './constants'
import { useSelectedTokenId, useAttributes, useVisible } from './PrimesContext'

const PixiContainer = styled.div``

enum Direction {
  Right,
  Up,
  Left,
  Down,
}

export const PrimesPixi: FC = () => {
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
