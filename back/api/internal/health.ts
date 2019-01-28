import * as Router from 'koa-router'

const router = new Router()

router.get('/admin', async (ctx) => {
  console.log('admin')
  ctx.status = 200
  ctx.body = {}
  return ctx
})

export default router