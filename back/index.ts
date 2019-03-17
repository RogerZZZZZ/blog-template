import * as jwt from 'jsonwebtoken'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import * as mongoose from 'mongoose'

import * as cors from '@koa/cors';

import api from './api';
import migrate from './migration';

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

  const publicPaths = [/^\/api\/external/]
  const authorizedPath = [/^\/api\/internal/]

  app.use((ctx, next) => {
    const token = ctx.get('Authorization')
    if (!publicPaths.find(v => !!v.exec(ctx.path))
      && authorizedPath.find(v => !!v.exec(ctx.path))) {
      jwt.verify(token, 'secretKey', (err, decode) => {
        if (err) {
          console.log(err)
          ctx.throw(401, 'Authentication Error')
        }
      })
    }
    return next()
  })

  router.use('/api', api.routes())
  app.use(router.routes())

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })

  app.listen(port)
})()
