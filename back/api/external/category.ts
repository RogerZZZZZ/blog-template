import * as Router from 'koa-router'
import { categoryModel } from '../../model'

const router = new Router()

router.get('/fetchAll', async (ctx) => {
  console.log('fetchAll category')
  ctx.body = await categoryModel.find({})
  ctx.status = 200
  return ctx
})

router.get('/fetchById', async (ctx) => {
  const id = ctx.query.id || ''
  ctx.body = await categoryModel.findById(id)
  ctx.status = 200
  return ctx
})

export default router