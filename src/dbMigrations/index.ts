import { createDbIfNotExists, createTableIfNotExists } from './utils'
import { createConnection } from '../services/mysql'
import { Connection } from 'mysql'

createConnection()
  .then(async (connection: Connection) => {
    await createDbIfNotExists(connection, process.env.MYSQL_DATABASE)
    console.log(`database ${process.env.MYSQL_DATABASE} created.`)
    connection.changeUser({
      database: process.env.MYSQL_DATABASE
    }, async () => {
      await createTableIfNotExists(
        connection,
        process.env.MYSQL_DATABASE,
        'Categories',
        `ID int NOT NULL AUTO_INCREMENT,
       Name varchar(45),
       ParentId int,
       PRIMARY KEY (ID),
       CONSTRAINT FK_SubCategory FOREIGN KEY (ParentId)
       REFERENCES Categories(ID)`,
      )
      console.log(`table Categories created.`)

      await createTableIfNotExists(
        connection,
        process.env.MYSQL_DATABASE,
        'Products',
        `ID int NOT NULL AUTO_INCREMENT,
       Name varchar(45),
       ImageUri varchar(255),
       CategoryId int,
       Featured tinyint NOT NULL DEFAULT 0,
       PRIMARY KEY (ID),
       CONSTRAINT FK_CategoryProduct FOREIGN KEY (CategoryId) REFERENCES Categories(ID),
       CONSTRAINT UC_ProductCategory UNIQUE (ID, CategoryId)`,
      )
      console.log(`table Products created.`)

      await createTableIfNotExists(
        connection,
        process.env.MYSQL_DATABASE,
        'Providers',
        `ID int NOT NULL AUTO_INCREMENT,
       Name varchar(45),
       PRIMARY KEY (ID)`,
      )
      console.log(`table Providers created.`)

      await createTableIfNotExists(
        connection,
        process.env.MYSQL_DATABASE,
        'Products_Providers',
        `ID int NOT NULL AUTO_INCREMENT,
       ProductId int,
       ProviderId int,
       Price double,
       available tinyint,
       PRIMARY KEY (ID),
       CONSTRAINT FK_PP_Products FOREIGN KEY (ProductId) REFERENCES Products(ID),
       CONSTRAINT FK_PP_Providers FOREIGN KEY (ProviderId) REFERENCES Providers(ID)`,
      )
      console.log(`table Products_Providers created.`)
    })

  })
  .catch(e => console.log(`[error migrating db] ${e}`))

