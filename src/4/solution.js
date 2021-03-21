const scan = (map) => {
  const result = {
    ceil: 0,
    ﬂoor: 0,
    both: 0,
  }

  if (map.length === 0) {
    return result
  }

  const rowsCount = map.length
  const columnsCount = map[0].length

  const visited = Array.from(map).map((row) => row.map(() => false))

  const scanAround = (y, x) => {
    if (y + 1 > rowsCount || x + 1 > columnsCount) {
      return [false, false]
    }

    if (map[y][x] === 0) {
      return [false, false]
    }

    let startFromTop = false
    let endOnBottom = false

    if (y === 0) {
      startFromTop = true
    } else if (y === rowsCount - 1) {
      endOnBottom = true
    }

    const scanAroundNextPoint = (y, x) => {
      if (visited[y][x]) {
        return
      }

      visited[y][x] = true

      const result = scanAround(y, x)

      startFromTop = startFromTop || result[0]
      endOnBottom = endOnBottom || result[1]
    }

    const scanAroundRightPoint = () => {
      if (x + 1 < columnsCount) {
        scanAroundNextPoint(y, x + 1)
      }
    }

    const scanAroundTopPoint = () => {
      if (y - 1 > 0) {
        scanAroundNextPoint(y - 1, x)
      }
    }

    const scanAroundBottomPoint = () => {
      if (y + 1 < rowsCount) {
        scanAroundNextPoint(y + 1, x)
      }
    }

    scanAroundRightPoint()
    scanAroundTopPoint()
    scanAroundBottomPoint()

    return [startFromTop, endOnBottom]
  }

  for (let y = 0; y < rowsCount; y++) {
    for (let x = 0; x < columnsCount; x++) {
      if (visited[y][x]) {
        continue
      }

      const [startFromTop, endOnBottom] = scanAround(y, x)

      if (startFromTop && !endOnBottom) {
        result.ceil++
      } else if (!startFromTop && endOnBottom) {
        result.ﬂoor++
      } else if (startFromTop && endOnBottom) {
        result.both++
      }
    }
  }

  return result
}

// 2, 2, 1

console.log(
  scan([
    [1, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 1],
  ])
)

// 0, 0, 1

console.log(
  scan([
    [1, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ])
)

// 1, 1, 0

console.log(
  scan([
    [0, 1, 1],
    [0, 0, 0],
    [0, 1, 1],
  ])
)

module.exports = { scan }
