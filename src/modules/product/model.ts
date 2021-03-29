import Model from '../../abstracts/model'

export default class ProductModel extends Model {

  protected schema = {
    type: 'object',
    required: ['Name', 'CategoryId'],
    properties: {
      Name: { type: 'string', minLength: 2, maxLength: 45 },
      ImageUri: { type: 'string', minLength: 2, maxLength: 255 },
      CategoryId: { type: 'number' },
      Featured: {type: 'number'}
    },
  }
}
