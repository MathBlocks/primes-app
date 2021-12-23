import React, { FC, useMemo, useRef, useState } from 'react'
// @ts-ignore
import getPrimeFactors from 'get-prime-factors'
import { useAttributes } from '../App/PrimesContext'
import { usePrimeQuery } from '../../graphql/subgraph/subgraph'
import { ATTRIBUTE_NAMES, Attributes } from '../../attributes'
import styled from 'styled-components'
import { useInterval, useToggle } from 'react-use'

const toBinaryString = (input: number) => (input >>> 0).toString(2)

const isPrime = (input: number): boolean => {
  for (let i = 2; i < input; i++) if (input % i === 0) return false
  return input > 1
}

// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [x][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [x][x][ ][ ][ ][x][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [x][x][ ][ ][ ][x][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][x][x][x][x][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][x][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]

const TOKEN_IDS = [2, 3, 6, 1729, 113, 16381]

const gridArr = Array.from({ length: 14 }).map(() =>
  Array.from({ length: 14 }),
)

const SVG: FC<{ tokenId: number; showAttributes: boolean }> = ({
  tokenId,
  showAttributes,
}) => {
  const [attributes] = useAttributes()

  const primeAttributes = useMemo<
    { key: string; name: string; symbol: FC }[]
  >(() => {
    if (!attributes) return []

    return Object.keys(attributes)
      .filter((key) =>
        attributes[key as keyof Attributes].has(tokenId as number),
      )
      .map((key) => {
        const [name, symbol] =
          ATTRIBUTE_NAMES[key as keyof Attributes]
        return { key, name, symbol: symbol as FC }
      })
  }, [attributes, tokenId])

  const factors = useMemo<boolean[][]>(
    () =>
      getPrimeFactors(tokenId).map((factor: number) =>
        toBinaryString(factor)
          .split('')
          .map((char) => char === '1'),
      ),
    [tokenId],
  )

  const prime = isPrime(tokenId)

  const fg = prime ? '#222' : '#ddd'
  const bg = prime ? '#ddd' : '#222'

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={350} height={350}>
      <rect height="100%" width="100%" fill={bg} />
      <g id="attributes">
        <mask id="attr-mask">
          {gridArr.map((row, yIndex) => (
            <g key={yIndex} transform="translate(24, 24)">
              {row.map((_, xIndex) => (
                <circle
                  key={xIndex}
                  cx={xIndex * 23.5}
                  cy={(13 - yIndex) * 23.5}
                  r={8}
                  fill="white"
                />
              ))}
            </g>
          ))}
        </mask>
      </g>
      <g id="binary">
        {factors.map((bits, index) => (
          <g key={index} transform="translate(24, 24)">
            {bits.map((bit, bitIndex) =>
              bit ? (
                <circle
                  key={bitIndex}
                  cx={bitIndex * 23.5}
                  cy={(13 - index) * 23.5}
                  r={8}
                  fill={fg}
                />
              ) : null,
            )}
          </g>
        ))}
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
        opacity: 0.3;
      }
    }
  }
`

const randomTokenId = () => Math.floor(Math.random() * 16383) + 1

export const Playground: FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>(TOKEN_IDS)
  const [speed, setSpeed] = useState<number>(1000)
  const [isRandom, toggleIsRandom] = useToggle(false)
  const [showAttributes, toggleShowAttributes] = useToggle(false)
  useInterval(() => {
    if (isRandom) {
      setTokenIds(Array.from({ length: 6 }).map(randomTokenId))
    }
  }, speed)
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
      </div>
      <div className="images">
        {tokenIds.map((tokenId) => (
          <div key={tokenId}>
            <div>
              <SVG
                tokenId={tokenId}
                showAttributes={showAttributes}
              />
            </div>
            <div>{tokenId}</div>
          </div>
        ))}
      </div>
    </Container>
  )
}
