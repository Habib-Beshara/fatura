import * as mysql from 'mysql'
import { Connection } from 'mysql'

export const createConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })

  return new Promise((resolve, reject) => {
    connection.connect({}, ((err, args) => {
      if (err) return reject(err)
      return resolve(connection)
    }))
  })
}

export const changeDatabase = (connection: Connection, database) => {
  return new Promise((resolve, reject) => {
    connection.changeUser({
      database: database,
    }, async (err) => {
      if (err) return reject(err)
      return resolve(connection)
    })
  })
}

export const endConnection = (connection) => {
  connection.end()
}


export const initAndConnectDb = () => {

}
