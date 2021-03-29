import IRepository from './interfaces/IRepository'
import { Connection } from 'mysql'
import { arrayToString } from '../utils'

export default abstract class MySqlRepository implements IRepository {
  protected tableName

  constructor (protected mysqlConnection: Connection) {
  }

  async findById (id: number): Promise<any> {
    return new Promise(((resolve, reject) => {
      const query = `SELECT * FROM ${this.tableName} 
        where ID=${id}`
      this.mysqlConnection.query(query, ((err, results) => {
        if (err) return reject(err)
        return resolve(results[ 0 ])
      }))
    }))
  }

  insert (input: any): Promise<number> {
    return new Promise(((resolve, reject) => {
      const stringColumnsNames = Object.keys(input).toString()
      const stringValuesNames = arrayToString(Object.values(input))
      const query = `INSERT INTO ${this.tableName} (${stringColumnsNames})
        values (${stringValuesNames})`
      this.mysqlConnection.query(query, ((err, results) => {
        if (err) return reject(err)
        return resolve(results.insertId)
      }))
    }))
  }
}
