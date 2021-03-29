import express = require('express')
import cors = require('cors')
import ListProducts from './modules/product/user-cases/listProducts'
import { changeDatabase, createConnection } from './services/mysql'
import ProductRepository from './modules/product/repository'
import { Connection } from 'mysql'
import ToggleFeature from './modules/product/user-cases/toggleFeature'

const app = express()
const port = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

const middleware = (req, res, next) => {
  const { page } = req.query
  req.page = page
  next()
}

createConnection()
  .then(async (connection: Connection) => {
    await changeDatabase(connection, process.env.MYSQL_DATABASE)
    const productRepository = new ProductRepository(connection)

    app.get('/products/:categoryId', middleware, async (req: any, res, next) => {
      const { categoryId } = req.params
      const result = await new ListProducts(productRepository)
        .exec(categoryId, undefined, req.page)
      res.send(result)
    })

    app.patch('/products/:id/feature', async (req: any, res, next) => {
      const { id } = req.params
      const result = await new ToggleFeature(productRepository).exec(id)
      res.send(result)
    })

    app.listen(port, async () => {
      console.log(`app started on port ${port}`)
    })
  })
