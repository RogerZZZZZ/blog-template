import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import api from './api'
import * as cors from '@koa/cors'
import * as mongoose from 'mongoose'
import migrate from './migration'
import * as jwt from 'jsonwebtoken'

(async () => {
  const app = new Koa()
  const router = new Router()
  const port = process.env.PORT || 8080

  app.use(bodyParser())
  app.use(cors())

  mongoose.connect('mongodb://localhost:27017/blog')

  await migrate.up()

  app.use((ctx, next) => {
    return next().catch((err) => {
      if (401 === err.status) {
        ctx.status = 401
      } else {
        throw err
      }
    })
  })

  const publicPaths = [/^\/api\/auth/]
  const authorizedPath = [/^\/api\/blog/, /^\/api\/tag/]

  app.use((ctx, next) => {
    const token = ctx.get('Authorization')
    if (!publicPaths.find(v => !!v.exec(ctx.path))
    && authorizedPath.find(v => !!v.exec(ctx.path))) {
      jwt.verify(token, 'secretKey', (err, decode) => {
        if (err) {
          console.log(err)
          ctx.throw(401, 'Authentication Error')
        }
        console.log(decode)
      })
    }
    return next()
  })

  router.use('/api', api.routes())
  app.use(router.routes())

  app.listen(port)
})()
