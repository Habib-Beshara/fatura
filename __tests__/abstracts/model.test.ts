import TestModel from './mocks/testModel'

describe('given a model class', () => {
  it('should be able to fail when data is invalid', async () => {
    const model = new TestModel()
    const incorrectData = { name: 't' }
    const invalid: any = await model.validate(incorrectData)
    expect(invalid.success).toBe(false)
    expect(invalid.errors instanceof Array).toBe(true)
  })

  it('should be able to succeed when data is valid', async () => {
    const model = new TestModel()
    const correctData = { name: 'test' }
    const valid = await model.validate(correctData)
    expect(valid.success).toBe(true)
  })
})
