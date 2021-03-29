import { Connection } from 'mysql'

export const createTableIfNotExists = (
  connection: Connection, dbName: string, tableName: string, tblDetails: string,
) => {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT count(*) as count FROM information_schema.TABLES
    WHERE (TABLE_SCHEMA = '${dbName}') AND (TABLE_NAME = '${tableName}')`,
        (err, res) => {
          if (err) {
            return reject(err)
          }
          if (res[ 0 ].count !== 1) {
            connection.query(`CREATE TABLE ${tableName} (${tblDetails})`,
              (err, res) => {
                if (err) {
                  return reject(err)
                }
                resolve(true)
              })
          }
          resolve(true)
        })
    },
  )
}


export const createDbIfNotExists = (connection: Connection, dbName: string) => {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT count(*) as count FROM information_schema.TABLES
    WHERE (TABLE_SCHEMA = '${dbName}')`,
        (err, res) => {
          if (res[ 0 ].count !== 1) {
            connection.query(`CREATE DATABASE ${dbName}`,
              (err, res) => {
                if (err) reject(err)
                resolve(true)
              })
          }
          resolve(true)
        })
    },
  )
}
