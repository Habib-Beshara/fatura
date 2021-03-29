import Model from '../../../src/abstracts/model'

export default class TestModel extends Model {

  protected schema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 20 },
    },
  }

}
