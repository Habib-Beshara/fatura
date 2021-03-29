import { arrayToString } from '../src/utils'

describe('given utils functions', () => {
  it('should turn an array into a string composed of the its values using arrayToString', () => {
    const arr = [1, 2, "3", 'name', true, {name: "value"}]
    const obj = JSON.stringify({
      name: "value"
    })
    expect(arrayToString(arr)).toBe(`1, 2, "3", "name", true, ${obj}`)
  })
})
