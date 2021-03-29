import MySqlRepository from '../../../src/abstracts/repository'

export default class TestRepository extends MySqlRepository {
  protected tableName = 'Test'

}
