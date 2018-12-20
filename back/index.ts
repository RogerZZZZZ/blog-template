import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import api from './api'
import * as cors from '@koa/cors'
import * as mongoose from 'mongoose'
import migrate from './migration'

(async () => {
  const app = new Koa()
  const router = new Router()
  const port = process.env.PORT || 8080

  app.use(bodyParser())
  app.use(cors())

  mongoose.connect('mongodb://localhost:27017/blog')

  await migrate.up()

  router.use('/api', api.routes())
  app.use(router.routes())

  app.listen(port)
})()
