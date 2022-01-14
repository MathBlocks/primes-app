import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Simple } from 'pixi-cull'
import { GlowFilter } from '@pixi/filter-glow'

import { N_MAX, N_SIZE, SCALE } from './constants'
import {
  useSelectedTokenId,
  useAttributes,
  useVisible,
  useHoveredTokenId,
  useMyPrimes,
} from '../App/PrimesContext'
import { ulamSpiral } from '../../ulamSpiral'
import { useAllPrimesQuery } from '../../graphql/subgraph/subgraph'

const PixiContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 640px;
  canvas {
    width: 100%;
    height: 100%;
  }
`

const useAllPrimeImages = (): {
  ready: boolean
  images: Record<number, string>
} => {
  const allPrimes = useAllPrimesQuery()
  return useMemo(() => {
    const images = Object.fromEntries(
      (allPrimes.data?.primes ?? []).map(({ id, image }) => [
        parseInt(id),
        image,
      ]),
    )
    return {
      images,
      ready: !!(allPrimes.data && allPrimes.data.primes.length > 0),
    }
  }, [allPrimes.data])
}

const SpiralContent: FC = () => {
  const history = useHistory()
  const windowSize = useWindowSize()
  const [attributes] = useAttributes()
  const [visible] = useVisible()
  const [selectedTokenId, setSelectedTokenId] = useSelectedTokenId()
  const [, setHoveredTokenId] = useHoveredTokenId()
  const [myPrimes] = useMyPrimes()
  const allPrimeImages = useAllPrimeImages()

  // Refs for Pixi
  const app = useRef<PIXI.Application>()
  const viewport = useRef<Viewport>()
  const cull = useRef<Simple>()
  const container = useRef<HTMLDivElement>(null)
  const selectedTokenIdRef = useRef<number | undefined>(
    selectedTokenId,
  )
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    if (!attributes) return

    app.current = new PIXI.Application({
      resizeTo: container.current as HTMLDivElement,
      backgroundColor: 0x191919,
    })
    const app_ = app.current

    container.current?.appendChild(app_.view)

    viewport.current = new Viewport({
      screenWidth: app_.view.width,
      screenHeight: app_.view.height,
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
      .clampZoom({ minScale: 0.015, maxScale: 1 })
      .setZoom(0.015)

    cull.current = new Simple()
    const cull_ = cull.current
    cull_.addList(viewport_.children)

    app_.start()

    const tickerCallback = () => {
      if (viewport_.dirty) {
        let bounds
        try {
          bounds = viewport_.getVisibleBounds()
        } catch (error) {
          // The component is probably unmounting; stop the ticker
          PIXI.Ticker.shared.stop()
          PIXI.Ticker.shared.remove(tickerCallback)
          return
        }

        cull_.cull(bounds as NonNullable<typeof bounds>)

        const visible = cull_.stats().visible < 48

        cull_
          .query(bounds as NonNullable<typeof bounds>)
          .forEach((container) => {
            const detail = (
              (container as PIXI.Sprite).children[0] as PIXI.Sprite
            ).children[0] as PIXI.Sprite
            detail.visible = visible

            const hasResource = detail.texture?.baseTexture?.resource
            if (hasResource) {
              if (!visible) {
                detail.texture.destroy()
              }
            } else if (visible && (container as any).data.svg) {
              const resource = new PIXI.SVGResource(
                (container as any).data.svg,
                { width: 256, height: 256 },
              )
              detail.texture = PIXI.Texture.from(resource as any, {
                resolution: 16,
              })
            }
          })

        viewport_.dirty = false
      }
    }
    PIXI.Ticker.shared.add(tickerCallback)

    return () => {
      app_?.destroy(true, true)
    }
  }, [attributes, history, setHoveredTokenId, setSelectedTokenId])

  useEffect(() => {
    for (const [tokenId, posX, posY] of ulamSpiral(N_MAX, N_SIZE)) {
      if (
        !attributes ||
        !viewport.current ||
        !allPrimeImages.ready
      ) {
        return
      }

      if (!allPrimeImages.images[tokenId]) {
        continue
      }

      const prime = attributes.prime.has(tokenId)

      const container = (viewport.current as Viewport).addChild(
        new PIXI.Sprite(PIXI.Texture.EMPTY),
      )
      container.width = container.height = SCALE - 50
      container.position.set(posX * SCALE + 25, posY * SCALE + 25)
      container.interactive = true
      // @ts-ignore
      container.data = {
        tokenId,
        prime,
        svg: allPrimeImages.images[tokenId],
      }

      const square = new PIXI.Sprite(PIXI.Texture.WHITE)
      square.width = 1
      square.height = 1
      square.tint = prime ? 0xffffff : 0x000000
      container.addChild(square)

      const detail = new PIXI.Sprite()
      detail.visible = false
      square.addChild(detail)

      container.on('mouseover', () => {
        if (!square.visible) return
        container.filters = [
          new GlowFilter({
            distance: 16,
            outerStrength: 4,
            quality: 1,
          }),
        ]
        setHoveredTokenId(tokenId)
      })

      container.on('mouseout', () => {
        if (!square.visible) return
        container.filters = []
        setHoveredTokenId(undefined)
      })

      container.on('click', () => {
        if (!square.visible) return

        if (!(viewport.current as Viewport).moving) {
          ;(viewport.current as Viewport).animate({
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
      })

      if (tokenId === N_MAX) {
        setReady(true)
      }
    }
  }, [
    allPrimeImages.images,
    allPrimeImages.ready,
    attributes,
    history,
    setHoveredTokenId,
    setSelectedTokenId,
  ])

  // Set visibility of squares
  useEffect(() => {
    if (!viewport.current) return

    viewport.current.children.forEach((child) => {
      ;(child as PIXI.Sprite).children[0].visible = visible.has(
        (child as any).data.tokenId,
      )
    })
  }, [visible])

  // Set minted state
  useEffect(() => {
    if (!viewport.current || myPrimes.set.size === 0) return

    viewport.current.children.forEach((child) => {
      if (myPrimes.set.has((child as any).data.tokenId)) {
        ;(child as PIXI.Sprite).children[0].filters = [
          new GlowFilter({
            color: 0xff4959e9,
            distance: 16,
            outerStrength: 10,
            quality: 1,
          }),
        ]
      }
    })
  }, [myPrimes, allPrimeImages])

  useEffect(() => {
    if (!viewport.current || !app.current || !ready) return

    viewport.current.resize(
      app.current.view.width,
      app.current.view.height,
    )
  }, [windowSize, ready])

  return <PixiContainer ref={container} />
}

const Loading = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spiral: FC = () => {
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setUpdate(true)
    }, 1)
  }, [])
  return update ? (
    <SpiralContent />
  ) : (
    <Loading>
      <div>Bikeshedding...</div>
    </Loading>
  )
}
