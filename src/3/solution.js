module.exports = async function (input) {
  const getDirectorySize = (directory) => {
    return new Promise((resolve) => {
      directory.size((size) => resolve(size))
    })
  }

  const getFile = (directory, fileIndex) => {
    return new Promise((resolve) => {
      directory.read(fileIndex, (file) => resolve(file))
    })
  }

  const isUnrecoverableFile = (file) => {
    const isEmptyObject = (file) => {
      return (
        file && file.constructor === Object && Object.keys(file).length === 0
      )
    }

    return file === null || file === undefined || isEmptyObject(file)
  }

  const isFolder = (stuff) => stuff instanceof Folder
  const haveDuplicateChars = (str) => str.length !== new Set([...str]).size

  const findDamagedFiles = async (directory) => {
    let damagedFiles = []

    const directorySize = await getDirectorySize(directory)

    for (let fileIndex = 0; fileIndex < directorySize; fileIndex++) {
      const file = await getFile(directory, fileIndex)

      if (isUnrecoverableFile(file)) {
        continue
      }

      if (isFolder(file)) {
        damagedFiles = [...damagedFiles, ...(await findDamagedFiles(file))]
      } else {
        if (haveDuplicateChars(file)) {
          damagedFiles.push(file)
        }
      }
    }

    return damagedFiles
  }

  const damagedFiles = await findDamagedFiles(input)

  return damagedFiles.sort()
}
