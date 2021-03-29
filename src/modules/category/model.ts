import Model from '../../abstracts/model'

export default class CategoryModel extends Model {

  protected schema = {
    type: 'object',
    required: ['Name'],
    properties: {
      Name: { type: 'string', minLength: 2, maxLength: 45 },
      ParentId: { type: 'number' },
    },
  }
}
