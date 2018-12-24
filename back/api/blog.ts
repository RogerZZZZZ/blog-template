import * as Router from 'koa-router'

const router = new Router()

router.get('/test', (ctx) => {
  console.log('test api trigger')
  ctx.body = {}
  ctx.status = 200
  return ctx
})

export default router