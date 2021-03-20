// !!! It doesn't work

const isCeil = (rowIndex) => rowIndex === 0
const isFloor = (rowIndex, rowsCount) => rowIndex === rowsCount - 1
const isStuff = (stuff) => stuff === 1

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

  const visited = new Array(rowsCount)
    .fill([])
    .map(() => new Array(columnsCount).fill(false))

  for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
    let startFromCeiling = false
    let endOnFloor = false

    const moveTo = (rowIndex, columnIndex) => {
      if (visited[rowIndex][columnIndex]) {
        return
      }

      visited[rowIndex][columnIndex] = true

      if (isStuff(map[rowIndex][columnIndex])) {
        if (columnIndex + 1 < columnsCount) {
          moveTo(rowIndex, ++columnIndex)
        }
        if (rowIndex + 1 < rowsCount) {
          moveTo(++rowIndex, columnIndex)
        }
      }
    }

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      if (!isStuff(map[rowIndex][columnIndex])) {
        visited[rowIndex][columnIndex] = true
        continue
      }

      if (visited[rowIndex][columnIndex]) {
        continue
      }

      if (isCeil(rowIndex)) {
        startFromCeiling = true
      } else if (isFloor(rowIndex, rowsCount)) {
        endOnFloor = true
      }

      moveTo(rowIndex, columnIndex)
    }

    if (startFromCeiling && !endOnFloor) {
      result.ceil++
      startFromCeiling = false
    } else if (!startFromCeiling && endOnFloor) {
      result.ﬂoor++
      endOnFloor = false
    } else if (startFromCeiling && endOnFloor) {
      result.both++
      startFromCeiling = false
      endOnFloor = false
    }
  }

  return result
}

module.exports = { scan }
