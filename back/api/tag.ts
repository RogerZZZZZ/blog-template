import * as Router from 'koa-router'
import { tagModel } from '../model'

const router = new Router()

router.post('/create', async (ctx) => {
  console.log('create tag')
  const data = ctx.request.body
  const tag = await tagModel.create(data)
  console.log(tag)
  ctx.body = {}
  ctx.status = 200
  return ctx
})

router.get('/getAll', async (ctx) => {
  console.log('get all tags')
  const data = ctx.query
  console.log(data)
  ctx.body = {}
  ctx.status = 200
  return ctx
})


export default router