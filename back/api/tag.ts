import * as Router from 'koa-router'
import { tagModel } from '../model'

const router = new Router()

router.post('/create', async (ctx) => {
  console.log('create tag')
  const data = ctx.request.body
  const tag = await tagModel.create(data)
  console.log(tag)
  ctx.body = {
    tag
  }
  ctx.status = 200
  return ctx
})

router.get('/fetchAll', async (ctx) => {
  console.log('fetch all tags')
  ctx.body = await tagModel.find({})
  ctx.status = 200
  return ctx
})

router.get('/uptPostsList', async (ctx) => {
  console.log('update posts list')
  console.log(ctx.query)

  ctx.status = 200
  return ctx
})


export default router