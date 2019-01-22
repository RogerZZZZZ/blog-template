import * as Router from 'koa-router'
import { Types } from 'mongoose'
import { categoryModel } from '../model'
import { removeArticlesCategory } from './blog'

const router = new Router()

router.post('/create', async (ctx) => {
  console.log('create category')
  const data = ctx.request.body
  const category = await categoryModel.create(data)
  ctx.body = category
  ctx.status = 200
  return ctx
})

router.post('/update', async (ctx) => {
  console.log('udpate category')
  const data = ctx.request.body
  const id = data._id
  delete data._id
  const category = await categoryModel.findOneAndUpdate(id, data)
  ctx.body = category
  ctx.status = 200
  return ctx
})

router.get('/fetchAll', async (ctx) => {
  console.log('fetchAll category')
  ctx.body = await categoryModel.find({})
  ctx.status = 200
  return ctx
})

router.get('/deleteById', async (ctx) => {
  console.log('delete category by id')
  const { id, articles } = ctx.query
  removeArticlesCategory(articles)
  ctx.body = await categoryModel.remove({
    _id: id,
  })
  ctx.status = 200
  return ctx
})

export default router