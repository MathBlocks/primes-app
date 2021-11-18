enum Direction {
  Right,
  Up,
  Left,
  Down,
}

// Generate [n, x, y] for an ulam spiral of given length and size.
// The spiral is 1-indexed.
export function* ulamSpiral(
  length: number,
  size: number,
): Generator<[number, number, number], void> {
  let direction: Direction = Direction.Right
  let y = size / 2
  let x = size % 2 === 0 ? y - 1 : y

  const arr: number[][] = []
  for (let i = 0; i < length; i++) {
    arr[i] = Array(size).fill(undefined)
  }

  // Start: 1
  yield [1, x, y]

  let i = 2
  for (let n = i; n < length + i; n++) {
    arr[y][x] = n

    switch (direction) {
      case Direction.Up:
        if (arr[y][x - 1] === undefined) {
          direction = Direction.Left
        }
        break

      case Direction.Right:
        if (x <= length - 1 && arr[y - 1][x] === undefined && n > i) {
          direction = Direction.Up
        }
        break

      case Direction.Left:
        if (x === 0 || arr[y + 1][x] === undefined) {
          direction = Direction.Down
        }
        break

      case Direction.Down:
        if (arr[y][x + 1] === undefined) {
          direction = Direction.Right
        }
        break
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

    yield [n, x, y]
  }
}
