import ValidationResponse from '../../../src/services/validation/validationResponse'

describe('given a ValidationResponse class', () => {

  it('should be able to retrieve existing errors', () => {
    const res = new ValidationResponse()
    expect(res.getErrors() instanceof Array).toBe(true)
    expect(res.getErrors().length).toBe(0)
  })

  it('should be able to add errors', () => {
    const res = new ValidationResponse()
    res.addErrors(['e1', 'e2'])
    expect(res.getErrors()).toEqual(['e1', 'e2'])
    expect(res.getErrors()).toEqual(['e1', 'e2'])
  })

  it('should be able to return a proper JSON response', () => {
    const res = new ValidationResponse()
    expect(res.toJson().success).toBe(true)
    res.addErrors(['e1', 'e2'])
    expect(res.toJson().success).toBe(false)
  })
})
