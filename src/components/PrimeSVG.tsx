import React, { FC, useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// @ts-ignore
import getPrimeFactors from 'get-prime-factors'

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
path{
vector-effect:non-scaling-stroke;
fill:none;
}
text{
text-anchor:middle;
font-size:24px;
font-family:sans-serif;
}
`

export const PrimeSVG: FC<{ tokenId: number }> = ({ tokenId }) => {
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
      const scale = idx === 0 ? MIN_SCALE : (INNER_R + gap * idx) / OUTER_R

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

  const fg = prime ? '#000' : '#fff'
  const bg = prime ? '#fff' : '#000'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={BOUNDS}
      height={BOUNDS}
      style={{ background: bg }}
    >
      <style>{STYLE}</style>
      <g className="shells">
        {shells.map((shell, shellIdx) => (
          <g key={shellIdx} className="shell">
            <animateTransform
              attributeName="transform"
              attributeType="xml"
              type="rotate"
              from={`${shellIdx % 2 === 0 ? 0 : 360} 128 128`}
              to={`${shellIdx % 2 === 0 ? 360 : 0} 128 128`}
              dur="30s"
              repeatCount="indefinite"
            />
            <path
              d={`m 128 ${CENTRE - shell.radius} a ${shell.radius} ${
                shell.radius
              } 270 1 1 -${shell.radius} ${shell.radius}`}
              stroke="blue"
            />
            {shell.electrons.map(([on, r], electronIdx) => (
              <circle
                cx={CENTRE}
                cy={CENTRE - shell.radius}
                r="3"
                fill={on ? fg : bg}
                stroke={fg}
                transform={`rotate(${r} 128 128)`}
                key={electronIdx}
              />
            ))}
          </g>
        ))}
      </g>
      <g id="text">
        <text x="50%" y="134" fill={fg}>
          {tokenId}
        </text>
      </g>
    </svg>
  )
}

export const getSVGDataURI = (tokenId: number): string => {
  const svgString = btoa(renderToStaticMarkup(<PrimeSVG tokenId={tokenId} />))
  return `data:image/svg+xml;base64,${svgString}`
}
