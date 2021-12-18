import React, { FC, ReactNode, useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// @ts-ignore
import getPrimeFactors from 'get-prime-factors'
import { Icon } from './Icon'

interface Shell {
  radius: number
  scale: number
  // TODO do we need the angle or the distance around the circle?
  electrons: [boolean, number][] // [on, angle]
}

const BOUNDS = 256
const CENTRE = 128
const OUTER_R = 110
const INNER_R = 60

const toBinaryString = (input: number) => (input >>> 0).toString(2)

const isPrime = (input: number): boolean => {
  for (let i = 2; i < input; i++) if (input % i === 0) return false
  return input > 1
}

const STYLE = `
.shells path{
vector-effect:non-scaling-stroke;
fill:none;
}
`

const numberSVG = (n: number) => {
  let d = ''
  switch (n) {
    case 0:
      d =
        'M0 5.5a6 6 0 0 1 1.3-4C2 .4 3.3 0 4.7 0c1.5 0 2.7.5 3.5 1.4a6 6 0 0 1 1.3 4.1v3c0 1.8-.5 3.2-1.3 4.1-.8 1-2 1.4-3.5 1.4s-2.6-.5-3.5-1.4C.4 11.6 0 10.3 0 8.5v-3Zm4.7 7c1 0 1.8-.3 2.4-1 .5-.8.7-1.8.7-3.1V5.6L7.7 4 7 2.6l-1-.8c-.4-.2-.9-.3-1.4-.3-.5 0-1 0-1.3.3l-1 .8c-.3.4-.5.8-.6 1.3l-.2 1.7v2.8c0 1.3.3 2.3.8 3 .5.8 1.3 1.1 2.3 1.1ZM3.5 7c0-.3.1-.6.4-.9.2-.2.5-.3.8-.3.4 0 .7 0 .9.3.2.3.4.6.4.9 0 .3-.2.6-.4.9-.2.2-.5.3-.9.3-.3 0-.6 0-.8-.3-.3-.3-.4-.6-.4-.9Z'
      break
    case 1:
      d = 'M4 12.2V1h-.2L1.6 6H0L2.5.2h3.2v12h3.8v1.4H.2v-1.5H4Z'
      break
    case 2:
      d =
        'M9.2 12.2v1.5h-9v-2.3c0-.6 0-1.1.2-1.6.2-.4.5-.8.9-1.1.4-.4.8-.7 1.4-.9l1.8-.5c1.1-.3 2-.7 2.5-1.1.5-.5.7-1 .7-1.8l-.1-1.1-.6-1c-.2-.2-.5-.4-1-.5-.3-.2-.7-.3-1.3-.3a3 3 0 0 0-2.3.9c-.5.6-.8 1.4-.8 2.4v.9H0v-1l.3-1.8c.2-.5.5-1 1-1.5.3-.4.8-.8 1.4-1a5 5 0 0 1 2-.4c.8 0 1.5.1 2 .4.6.2 1.1.5 1.5 1 .4.3.7.7.9 1.2.2.5.2 1 .2 1.5v.4c0 1-.3 1.9-1 2.6-.6.7-1.6 1.2-3 1.6-1.2.2-2.1.6-2.7 1-.6.5-.9 1.1-.9 2v.5h7.5Z'
      break
    case 3:
      d =
        'M3.3 7V4.8L7.7 2v-.2H.1V.3h9v2.4L4.7 5.5v.3h.8a3.7 3.7 0 0 1 4 3.8v.3a3.8 3.8 0 0 1-1.3 3A4.8 4.8 0 0 1 4.9 14c-.8 0-1.5-.1-2-.3a4.4 4.4 0 0 1-2.5-2.4C0 10.7 0 10.2 0 9.5v-1h1.6v1c0 .4 0 .8.2 1.2l.7 1 1 .6a3.8 3.8 0 0 0 2.5 0 3 3 0 0 0 1-.6c.3-.2.5-.5.6-.9.2-.3.2-.7.2-1v-.2c0-.8-.2-1.4-.7-1.9-.5-.4-1.2-.7-2-.7H3.4Z'

      break
    case 4:
      d =
        'M4.7.3h3.1v9.4H10v1.5H8v2.5H6.1v-2.5H0V9L4.7.3ZM1.4 9.5v.2h4.8V1H6L1.4 9.5Z'
      break
    case 5:
      d =
        'M.2 7.4V.3h8.5v1.5H1.8v4.8H2l.5-.8a3.4 3.4 0 0 1 1.7-1l1.1-.2c.7 0 1.2.1 1.7.3a3.9 3.9 0 0 1 2.3 2.2c.2.6.3 1.1.3 1.8v.3c0 .7-.1 1.3-.3 1.9-.2.5-.5 1-1 1.5-.3.4-.8.8-1.4 1a5 5 0 0 1-2 .4c-.8 0-1.5-.1-2.1-.3-.6-.3-1.1-.6-1.5-1-.5-.4-.8-.9-1-1.4C.1 10.7 0 10 0 9.3V9h1.6v.4c0 1 .3 1.9.9 2.4.6.5 1.4.8 2.3.8.6 0 1 0 1.4-.3l1-.7.6-1.1L8 9V9a3 3 0 0 0-.8-2c-.2-.3-.5-.5-.9-.7a2.6 2.6 0 0 0-1.8 0 2 2 0 0 0-.6.2l-.4.4-.2.5h-3Z'
      break
    case 6:
      d =
        'M7.5 4.2c0-.8-.3-1.5-.8-2s-1.2-.8-2.1-.8l-1.2.3c-.4.1-.7.3-1 .6a3.2 3.2 0 0 0-.8 2.4v2h.2c.4-.6.8-1 1.4-1.4.5-.3 1.2-.5 1.9-.5.6 0 1.2.1 1.7.4.5.1 1 .4 1.3.8l1 1.4.2 1.9v.2A4.5 4.5 0 0 1 8 12.8c-.4.3-.9.7-1.5.9a5.2 5.2 0 0 1-3.7 0c-.6-.2-1-.5-1.5-1-.4-.3-.7-.8-1-1.3L0 9.6v-5c0-.7.1-1.3.4-1.9.2-.5.5-1 1-1.4.4-.4.9-.8 1.4-1a5.4 5.4 0 0 1 3.6 0 4 4 0 0 1 2.7 3.9H7.5Zm-2.8 8.4c.4 0 .9 0 1.2-.2l1-.7c.3-.2.5-.6.6-1 .2-.3.2-.7.2-1.2v-.2c0-.4 0-.9-.2-1.2a2.7 2.7 0 0 0-1.6-1.6c-.4-.2-.8-.2-1.2-.2a3.1 3.1 0 0 0-2.2.8 3 3 0 0 0-.9 2.1v.4c0 .4 0 .8.2 1.2a2.7 2.7 0 0 0 1.6 1.6l1.3.2Z'
      break
    case 7:
      d =
        'M0 .3h9v2.3l-5.7 8.6-.6 1a2 2 0 0 0-.2 1v.5H.9V12.4a3.9 3.9 0 0 1 .7-1.3l.5-.8L7.6 2v-.2H0V.3Z'
      break
    case 8:
      d =
        'M4.5 14a6 6 0 0 1-1.8-.3L1.2 13l-.9-1.2c-.2-.4-.3-1-.3-1.5v-.2A3.3 3.3 0 0 1 .8 8a3.3 3.3 0 0 1 1.7-1v-.3a3 3 0 0 1-.8-.4c-.3-.1-.5-.4-.7-.6a3 3 0 0 1-.6-1.9v-.2A3.2 3.2 0 0 1 1.4 1a5.4 5.4 0 0 1 3.1-1h.1C5.4 0 6 0 6.5.3c.5.1 1 .4 1.3.7A3.1 3.1 0 0 1 9 3.5v.2c0 .4 0 .7-.2 1 0 .4-.2.7-.5.9a3 3 0 0 1-.6.6 3 3 0 0 1-.9.4V7a3.7 3.7 0 0 1 1.8 1 3.3 3.3 0 0 1 .7 2.2v.2A3.3 3.3 0 0 1 8.1 13l-1.4.7a6 6 0 0 1-1.9.3h-.3Zm.3-1.5c.9 0 1.6-.2 2.1-.6.6-.5.8-1 .8-1.8V10c0-.8-.3-1.4-.8-1.8-.6-.5-1.3-.7-2.2-.7-1 0-1.7.2-2.3.7-.5.4-.8 1-.8 1.8v.1c0 .7.3 1.3.8 1.8.6.4 1.3.6 2.2.6h.2ZM4.7 6a3 3 0 0 0 2-.6c.4-.5.7-1 .7-1.6v-.1A2 2 0 0 0 6.6 2a3 3 0 0 0-2-.6 3 3 0 0 0-2 .6A2 2 0 0 0 2 3.7c0 .7.2 1.2.7 1.7a3 3 0 0 0 2 .6Z'
      break
    case 9:
      d =
        'M1.8 9.8c0 .8.3 1.5.8 2a3 3 0 0 0 2.1.8c.5 0 .9-.1 1.2-.3.4-.1.7-.3 1-.6.3-.3.5-.6.6-1 .2-.4.2-.9.2-1.4v-2h-.2c-.3.6-.7 1-1.3 1.4-.5.3-1.2.5-1.9.5a5 5 0 0 1-1.7-.3A3.8 3.8 0 0 1 .3 6.6C.1 6.1 0 5.5 0 4.8v-.2c0-.7.1-1.3.3-1.9A4.2 4.2 0 0 1 2.8.3 5 5 0 0 1 4.7 0 4.9 4.9 0 0 1 8 1.3c.4.4.8.8 1 1.4.2.5.3 1.1.3 1.8v4.8a5 5 0 0 1-.3 2 4.3 4.3 0 0 1-2.5 2.4 5.5 5.5 0 0 1-3.6 0L1.5 13l-1-1.3-.3-1.8h1.6Zm2.9-8.4c-.5 0-1 .1-1.3.3a2.8 2.8 0 0 0-1.6 1.6l-.2 1.2v.3c0 .4 0 .8.2 1.2l.7 1 1 .5c.3.2.7.2 1.2.2.4 0 .8 0 1.2-.2a3 3 0 0 0 1-.6l.6-1c.2-.3.2-.7.2-1v-.4c0-.5 0-.9-.2-1.2-.1-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.2-.8-.3-1.2-.3Z'
      break
    default:
      break
  }
  return <path d={d} />
}

interface PrimeAttribute {
  key: string
  name: string
  symbol: ReactNode
}

const generateDefs = (
  tokenId: number,
  fg: string,
  shellsLength: number,
) => {
  const interval = Math.floor(100 / (shellsLength - 1))
  return (
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="100%" y2="0">
        {Array.from({ length: shellsLength }).map((_, idx) => (
          <stop
            key={idx}
            offset={`${interval * idx}%`}
            stopColor={fg}
            stopOpacity={1}
          >
            <animate
              attributeName="stop-opacity"
              values={`1;.1;1`}
              dur="10s"
              begin={`${idx * 5}s`}
              repeatCount="indefinite"
            />
          </stop>
        ))}
      </linearGradient>
    </defs>
  )
}

const getSymbols = (
  tokenId: number,
  fg: string,
  primeAttributes: PrimeAttribute[],
  prime: boolean,
) => {
  return (
    <g className="symbols">
      {primeAttributes.map((attr, idx) => {
        // Max 11 attributes (tokenId: 3)
        let cx = 0,
          cy = 0
        if (idx === 0) {
          cx = 20
          cy = 20
        } else if (idx === 1) {
          cx = 236
          cy = 20
        } else if (idx === 2) {
          cx = 236
          cy = 236
        } else if (idx === 3) {
          cx = 20
          cy = 236
        } else if (idx === 4) {
          cx = 55
          cy = 20
        } else if (idx === 5) {
          cx = 201
          cy = 20
        } else if (idx === 6) {
          cx = 201
          cy = 236
        } else if (idx === 7) {
          cx = 55
          cy = 236
        } else if (idx === 8) {
          cx = 20
          cy = 201
        } else if (idx === 9) {
          cx = 20
          cy = 55
        } else if (idx === 10) {
          cx = 236
          cy = 55
        }

        return (
          <g key={idx}>
            <Icon
              attribute={attr.key as never}
              prime={prime}
              width={20}
              height={20}
              x={cx - 10}
              y={cy - 10}
            />
          </g>
        )
      })}
    </g>
  )
}

export const PrimeSVG: FC<{
  tokenId: number
  primeAttributes: PrimeAttribute[]
}> = ({ tokenId, primeAttributes }) => {
  const shells = useMemo<Shell[]>(() => {
    const _shells: boolean[][] = getPrimeFactors(tokenId).map(
      (factor: number) =>
        toBinaryString(factor)
          .split('')
          .map((char) => char === '1'),
    )

    const gap = (OUTER_R - INNER_R) / _shells.length + 1

    return _shells.map((binaryArr, idx) => {
      const radius = idx === 0 ? INNER_R : INNER_R + gap * idx

      const MIN_SCALE = INNER_R / OUTER_R
      const scale =
        idx === 0 ? MIN_SCALE : (INNER_R + gap * idx) / OUTER_R

      // const rotationDelta = 360 / binaryArr.length
      const rotationDelta = 270 / (binaryArr.length - 1)
      const electrons = binaryArr.map((on, idx) => [
        on,
        idx * rotationDelta,
      ]) as [boolean, number][]

      return {
        radius,
        scale,
        electrons,
      }
    })
  }, [tokenId])

  const prime = isPrime(tokenId)

  const chars = [...tokenId.toString()].map((c) =>
    parseInt(c),
  ) as number[]
  const short = chars.length < 4

  const fg = prime ? '#000' : '#fff'
  const bg = prime ? '#fff' : '#000'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={BOUNDS}
      height={BOUNDS}
    >
      <rect height="100%" width="100%" fill={bg} />
      <style>{STYLE}</style>
      {generateDefs(tokenId, fg, shells.length)}
      {getSymbols(tokenId, fg, primeAttributes, prime)}
      <g className="shells">
        {shells.map((shell, shellIdx) => (
          <g key={shellIdx} className="shell">
            <animateTransform
              attributeName="transform"
              attributeType="xml"
              type="rotate"
              from={`${shellIdx % 2 === 0 ? 0 : 360} 128 128`}
              to={`${shellIdx % 2 === 0 ? 360 : 0} 128 128`}
              dur={`${
                shells.length === 1
                  ? 60
                  : shells.length * 2 * (shellIdx + 1)
              }s`}
              repeatCount="indefinite"
            />
            {/*try rotating, or use factors as starting pos?*/}
            <path
              d={`m 128 ${CENTRE - shell.radius} a ${shell.radius} ${
                shell.radius
              } 0 1 1 -${shell.radius} ${shell.radius}`}
              style={{
                stroke: 'url(#g1)',
                strokeWidth: 2,
              }}
            />
            {shell.electrons.map(([on, r], electronIdx) => (
              <circle
                cx={CENTRE}
                cy={CENTRE - shell.radius}
                r="2"
                fill={on ? fg : bg}
                stroke={fg}
                strokeWidth={0.5}
                transform={`rotate(${r} 128 128)`}
                key={electronIdx}
              />
            ))}
          </g>
        ))}
      </g>
      <g
        id="text"
        fill={prime ? '#000' : '#fff'}
        transform={`translate(${
          (259 - (short ? 25 : 18) * chars.length) / 2
        }, ${short ? 111 : 116})`}
      >
        {chars.map((n, idx) => (
          <g
            key={idx}
            transform={`translate(${(short ? 25 : 18) * idx}) 
              scale(${short ? 2 : 1.5})
            `}
          >
            {numberSVG(n)}
          </g>
        ))}
      </g>
    </svg>
  )
}

export const getSVGDataURI = (
  tokenId: number,
  primeAttributes: PrimeAttribute[],
): string => {
  const svgString = btoa(
    renderToStaticMarkup(
      <PrimeSVG
        tokenId={tokenId}
        primeAttributes={primeAttributes}
      />,
    ),
  )
  return `data:image/svg+xml;base64,${svgString}`
}
