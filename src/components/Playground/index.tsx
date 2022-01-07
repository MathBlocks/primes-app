import React, { FC, useMemo, useState } from 'react'
// @ts-ignore
import getPrimeFactors from 'get-prime-factors'
import styled from 'styled-components'
import { useInterval, useToggle } from 'react-use'
import { Icon } from '../Icon'
import { renderToStaticMarkup } from 'react-dom/server'
import { addWeeks, format } from 'date-fns'

import { useAttributes } from '../App/PrimesContext'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import {
  Prime,
  usePrimesTestQuery,
} from '../../graphql/subgraph/subgraph'

const isPrime = (input: number): boolean => {
  for (let i = 2; i < input; i++) if (input % i === 0) return false
  return input > 1
}

const tokenIds = [
  2, 3, 5, 7, 13, 19, 69, 100, 256, 1337, 2556, 2874, 5328, 11111,
  12345,
]
const primeFactors = [
  [2],
  [3],
  [5],
  [7],
  [13],
  [19],
  [23, 3],
  [2, 5, 5, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [7, 191],
  [3, 2, 71, 3, 2],
  [2, 3, 479],
  [2, 37, 2, 2, 2, 3, 3],
  [41, 271],
  [3, 823, 5],
]

const getFactors = (tokenId: number): [number, boolean][] => {
  if (tokenId === 1) return [[1, false]]

  if (primeFactors[tokenIds.indexOf(tokenId)]) {
    return primeFactors[tokenIds.indexOf(tokenId)].map((parent) => [
      parent,
      true,
    ])
  }

  return (getPrimeFactors(tokenId) as number[]).map((parent) => [
    parent,
    true,
  ])
}

const getSquares = (tokenId: number): number[] => {
  if (tokenId === 1) return []
  const squares: number[] = []
  for (let i = 2; i < 14; i++) {
    const square = tokenId ** i
    if (square > 16384) {
      break
    }
    squares.push(square)
  }
  return squares
}

const TOKEN_IDS = [1, ...tokenIds]
// const TOKEN_IDS = [1031]

enum Bit {
  Inactive,
  Prime,
  Composite,
  Square,
  Cousin,
  Twin,
  Sexy,
}

// assuming 13x13 grid of 350px
const getBinaryCoords = (bitRows: Bit[][]) => {
  const coords: [number, number, Bit][] = []
  for (let i = 0; i < 14; i++) {
    const bits = bitRows[i]
    for (let j = 0; j < 14; j++) {
      if (bits) {
        const bit = bits[j]
        coords.push([j * 23.5, i * 23.5, bit])
      } else {
        coords.push([0, 0, Bit.Inactive])
      }
    }
  }
  return coords
}

const COLOURS = ['#3C4CE1', '#348C47', '#D46C21', '#8c21d4']

const SVG: FC<{
  tokenId: number
  primeAttributes?: {
    key: keyof Attributes
    name: string
    Symbol: FC
  }[]
  epoch?: number
  prime: Prime
}> = ({ tokenId, epoch = 0, prime: primeData }) => {
  const [attributes] = useAttributes()

  const primeAttributes = useMemo<
    { key: keyof Attributes; name: string; Symbol: FC }[]
  >(() => {
    if (!attributes) return []

    return Object.keys(attributes)
      .filter((key) =>
        attributes[key as keyof Attributes].has(tokenId as number),
      )
      .map((key) => {
        const [name, symbol] =
          ATTRIBUTE_NAMES[key as keyof Attributes]
        return {
          key: key as keyof Attributes,
          name,
          Symbol: symbol as FC,
        }
      })
  }, [attributes, tokenId])

  const prime = isPrime(tokenId)

  const mapped = useMemo(() => {
    let factorRows: Bit[][] = []
    let squareRows: Bit[][] = []
    let twinRows: Bit[][] = []
    let cousinRows: Bit[][] = []
    let sexyRows: Bit[][] = []

    const factors = getFactors(tokenId)
    const squares = getSquares(tokenId)
    const twins = primeData.twins.map((twin) => parseInt(twin.id))
    const cousins = primeData.cousins.map((cousin) =>
      parseInt(cousin.id),
    )
    const sexyPrimes = primeData.sexyPrimes.map((sexyPrime) =>
      parseInt(sexyPrime.id),
    )

    let start = factors.length

    for (let i = squares.length - 1; i > -1; i--) {
      const chars = [...(squares[i] >>> 0).toString(2)]
      const bits = []
      for (let j = chars.length - 1; j > -1; j--) {
        bits.push(chars[j] === '1' ? Bit.Square : Bit.Inactive)
      }
      squareRows[start + i] = bits
    }

    for (let i = 0; i < twins.length; i++) {
      const chars = [...(twins[i] >>> 0).toString(2)]
      const bits = []
      for (let j = chars.length - 1; j > -1; j--) {
        bits.push(chars[j] === '1' ? Bit.Twin : Bit.Inactive)
      }
      twinRows[start + i] = bits
    }
    start += twins.length

    for (let i = 0; i < cousins.length; i++) {
      const chars = [...(cousins[i] >>> 0).toString(2)]
      const bits = []
      for (let j = chars.length - 1; j > -1; j--) {
        bits.push(chars[j] === '1' ? Bit.Cousin : Bit.Inactive)
      }
      cousinRows[start + i] = bits
    }
    start += cousins.length

    for (let i = 0; i < sexyPrimes.length; i++) {
      const chars = [...(sexyPrimes[i] >>> 0).toString(2)]
      const bits = []
      for (let j = chars.length - 1; j > -1; j--) {
        bits.push(chars[j] === '1' ? Bit.Sexy : Bit.Inactive)
      }
      sexyRows[start + i] = bits
    }

    if (tokenId === 5689) {
      console.log(
        twinRows.length,
        cousinRows.length,
        sexyRows.length,
      )
    }

    for (let i = factors.length - 1; i > -1; i--) {
      const chars = [...(factors[i][0] >>> 0).toString(2)]
      const bits = []
      for (let j = chars.length - 1; j > -1; j--) {
        const isOn = chars[j] === '1'
        const bit = isOn
          ? factors[i][1]
            ? Bit.Prime
            : Bit.Composite
          : Bit.Inactive
        bits.push(bit)
      }
      factorRows[i] = bits
    }

    const factorCoords = getBinaryCoords(factorRows)
    const squareCoords = getBinaryCoords(squareRows)
    const twinCoords = getBinaryCoords(twinRows)
    const cousinCoords = getBinaryCoords(cousinRows)
    const sexyCoords = getBinaryCoords(sexyRows)

    return {
      factorCoords,
      squareCoords,
      factors,
      twinCoords,
      cousinCoords,
      sexyCoords,
    }
  }, [
    primeData.cousins,
    primeData.sexyPrimes,
    primeData.twins,
    tokenId,
  ])

  const fg = prime ? '#222' : '#ddd'
  const bg = prime ? '#ddd' : '#222'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={350} height={350}>
      <rect height="100%" width="100%" fill={bg} />

      <g transform="translate(23.5, 23.5)">
        {mapped.squareCoords.map(([x, y, bit], index) =>
          bit > 0 ? (
            <circle
              key={`square${index}`}
              cx={x}
              cy={y}
              r="7"
              stroke={fg}
              strokeWidth="2"
              fill="none"
            >
              <animate
                attributeName="opacity"
                values="0.5;0.25;0.5"
                dur={`${(1 / index) * 30}s`}
                repeatCount="indefinite"
              />
            </circle>
          ) : null,
        )}
        {mapped.twinCoords.map(([x, y, bit], index) =>
          bit > 0 ? (
            <circle
              key={`twin${index}`}
              cx={x}
              cy={y}
              r="8"
              fill={COLOURS[0]}
            >
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur={`${(1 / index) * 30}s`}
                repeatCount="indefinite"
              />
            </circle>
          ) : null,
        )}
        {mapped.cousinCoords.map(([x, y, bit], index) =>
          bit === 0 ? null : (
            <circle
              key={`cousin${index}`}
              cx={x}
              cy={y}
              r="8"
              fill={COLOURS[1]}
            >
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur={`${(1 / index) * 30}s`}
                repeatCount="indefinite"
              />
            </circle>
          ),
        )}
        {mapped.sexyCoords.map(([x, y, bit], index) =>
          bit > 0 ? (
            <circle
              key={`sexy${index}`}
              cx={x}
              cy={y}
              r="8"
              fill={COLOURS[2]}
            >
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur={`${(1 / index) * 30}s`}
                repeatCount="indefinite"
              />
            </circle>
          ) : null,
        )}
      </g>

      <g id="factors" transform="translate(23.5, 23.5)">
        {mapped.factorCoords.map(([x, y, bit], index) =>
          bit === Bit.Inactive ? null : (
            <g key={`${x}${y}`}>
              <circle
                cx={x}
                cy={y}
                r={8}
                fill={bit === Bit.Prime ? fg : 'none'}
                strokeWidth="2"
                stroke={bit === Bit.Composite ? fg : 'none'}
              >
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur={`${(1 / index) * 30}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ),
        )}
      </g>

      <g id="icons" transform="translate(16, 1)">
        {primeAttributes.map(({ key }, index) => (
          <g key={key}>
            <Icon
              attribute={key as never}
              prime={prime}
              width={16}
              height={16}
              x={305 + index * -23.5}
              y={320}
            />
          </g>
        ))}
        <text
          x={-2}
          y={334}
          fontSize={19}
          fontFamily="Space Mono"
          style={{ fontFamily: 'Space Mono' }}
          textAnchor="start"
          fill={fg}
        >
          {tokenId}
        </text>
      </g>
    </svg>
  )
}

const Container = styled.div`
  .controls {
    margin-bottom: 1rem;
    font-size: 0.8rem;
    opacity: 0.5;
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .speed {
    input {
      width: 15rem;
    }
  }

  .images {
    margin: 0 -4rem;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: space-between;
    > div {
      > div:first-child {
        border-radius: 0.5rem;
        overflow: hidden;
        line-height: 0;
      }
      > div:last-child {
        line-height: 2rem;
        //opacity: 0.3;
        display: none;
      }
    }
  }
`

const randomTokenId = () => Math.floor(Math.random() * 16384) + 1

export const Playground: FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>(TOKEN_IDS)
  const [speed, setSpeed] = useState<number>(1000)
  const [epoch, setEpoch] = useState<number>(0)
  const [isRandom, toggleIsRandom] = useToggle(false)
  useInterval(() => {
    if (isRandom) {
      setTokenIds(Array.from({ length: 6 }).map(randomTokenId))
    }
  }, speed)

  const query = usePrimesTestQuery({
    variables: { numbers: tokenIds },
  })

  const primes = useMemo(() => {
    if (!query.data) return null

    return Object.fromEntries(
      query.data.primes.map((prime) => [parseInt(prime.id), prime]),
    ) as Record<number, Prime>
  }, [query])

  return (
    <Container>
      <div className="controls">
        <label>
          Random
          <input type="checkbox" onChange={toggleIsRandom} />
        </label>
        <label className="speed">
          Random speed
          <input
            defaultValue="1000"
            type="range"
            min={100}
            max={6000}
            onChange={(el) => {
              setSpeed(parseFloat(el.target.value ?? '1000'))
            }}
          />
        </label>
        <label className="epoch">
          Epoch{' '}
          <input
            defaultValue="0"
            type="number"
            min={0}
            max={1000000}
            onChange={(el) => {
              setEpoch(parseInt(el.target.value ?? '0'))
            }}
          />
          <span className="monospace">
            {format(addWeeks(Date.now(), epoch ?? 1), 'yyyy-MM-dd')}
          </span>
        </label>
      </div>
      {primes && (
        <div className="images">
          {tokenIds.map((tokenId) => (
            <div key={tokenId}>
              <div>
                <SVG
                  tokenId={tokenId}
                  epoch={epoch}
                  prime={
                    primes[tokenId] ??
                    ({
                      twins: [],
                      sexyPrimes: [],
                      cousins: [],
                    } as any)
                  }
                />
              </div>
              <div className="monospace">{tokenId}</div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

export const getSVGDataURINew = (
  tokenId: number,
  primeAttributes: {
    key: keyof Attributes
    name: string
    Symbol: FC
  }[],
): string => {
  const svgString = btoa(
    renderToStaticMarkup(
      <SVG
        tokenId={tokenId}
        primeAttributes={primeAttributes}
        prime={{} as any}
      />,
    ),
  )
  return `data:image/svg+xml;base64,${svgString}`
}
