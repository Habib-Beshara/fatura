import MySqlRepository from '../../abstracts/repository'
import { Connection } from 'mysql'

export default class ProductRepository extends MySqlRepository {
  protected tableName = 'Products'
  private productProviderPivotName = 'Products_Providers'

  constructor (connection: Connection) {
    super(connection)
  }

  getProductsByCategoryId (categoryId: number) {
    return new Promise(((resolve, reject) => {
      const query = `SELECT * FROM ${this.tableName} 
        where CategoryId=${categoryId}`
      this.mysqlConnection.query(query, ((err, results) => {
        if (err) return reject(err)
        return resolve(results[ 0 ])
      }))
    }))
  }

  // assumed only available products are needed
  findProductsByCategory (categoryId: number, limit: number = 25, offset: number = 0) {
    return new Promise(((resolve, reject) => {
      const query = `SELECT ${this.tableName}.*, PP.Price
       FROM ${this.tableName} INNER JOIN 
       (SELECT MIN(price) as Price, ProductId FROM ${this.productProviderPivotName} 
       GROUP BY ProductId) as PP
       WHERE ${this.tableName}.CategoryId=${categoryId}
       AND ${this.tableName}.ID = PP.ProductId
       LIMIT ${limit}
       OFFSET ${offset}`
      this.mysqlConnection.query(query, ((err, results) => {
        if (err) return reject(err)
        return resolve(results)
      }))
    }))
  }

  toggleFeature (productId: number) {
    return new Promise(((resolve, reject) => {
      const query = `UPDATE ${this.tableName} SET Featured = !Featured where ID=${productId}`
      this.mysqlConnection.query(query, ((err, results) => {
        if (err) return reject(false)
        return resolve(true)
      }))
    }))
  }
}
