export const arrayToString = (arr: any[]) => {
  let str = ''
  const length = arr.length
  arr.forEach((element, index) => {
    if (typeof element === 'string') {
      str += `"${element}"`
    } else if (typeof element === 'number' || typeof element === 'boolean') {
      str += `${element}`
    } else {
      str += `${JSON.stringify(element)}`
    }
    if (length - 1 !== index)
      str += ', '
  })
  return str
}
