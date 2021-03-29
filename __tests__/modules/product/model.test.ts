import ProductModel from '../../../src/modules/product/model'

describe('given a product model', () => {
  it('should fail on invalid data', () => {
    const productModel = new ProductModel()
    const data = {
      Name: 'test',
    }
    const validation = productModel.validate(data)
    expect(validation.success).toBe(false)
    expect(validation.errors[ 0 ].keyword).toBe('required')
  })

})
