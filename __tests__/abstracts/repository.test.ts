import TestRepository from './mocks/testRepository'
import { changeDatabase, createConnection, endConnection } from '../../src/services/mysql'

let connection

//TODO: this function should be generic and moved somewhere else to be used in migration later
// this function is just to create the test table that corresponds to the mock `TestRepository`
const createTestTableIfNotExists = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT count(*) as count FROM information_schema.TABLES
    WHERE (TABLE_SCHEMA = '${process.env.MYSQL_DATABASE}') AND (TABLE_NAME = 'Test')`,
      (err, res) => {
        if (res[ 0 ].count !== 1) {
          connection.query(`CREATE TABLE Test 
          (ID int NOT NULL AUTO_INCREMENT, Name varchar(64), PRIMARY KEY (ID))`,
            (err, res) => {
              if (err) reject(err)
              resolve(true)
            })
        }
        resolve(true)
      })
  })
}

beforeAll(async () => {
  connection = await createConnection()
  await changeDatabase(connection, process.env.MYSQL_DATABASE)
  await createTestTableIfNotExists(connection)
})

afterAll(() => {
  endConnection(connection)
})

describe('given a repository', () => {

  it('should be able to insert a new record', async () => {
    const testRepo = new TestRepository(connection)
    const newRecordId: number = await testRepo.insert({
      name: 'Habib',
    })
    expect(typeof newRecordId).toBe('number')
  })

  it('should be able to retrieve data', async () => {
    const testRepo = new TestRepository(connection)
    const newRecordId: number = await testRepo.insert({
      name: 'Habib',
    })
    const res = await testRepo.findById(newRecordId)
    expect(res).toHaveProperty('ID')
  })
})
