import * as Router from 'koa-router'
import { postModel } from '../model'

const router = new Router()

router.post('/create', async (ctx) => {
  console.log('create post')
  const data = ctx.request.body
  const post = await postModel.create(data)
  console.log(post)
  ctx.body = post
  ctx.status = 200
  return ctx
})

router.get('/fetchPinned', async (ctx) => {
  const posts = await postModel.find({
    pinned: true
  })
  ctx.body = posts
  ctx.status = 200
  return ctx
})

router.get('/fetchAll', async (ctx) => {
  const posts = await postModel.find({})
  ctx.body = posts
  ctx.status = 200
  return ctx
})

router.get('/fetchByCategory', async (ctx) => {
  ctx.body = await postModel.find({
    categoryId: ctx.query.categoryId
  })
  ctx.status = 200
  return ctx
})

router.get('/fetchById', async (ctx) => {
  ctx.body = await postModel.findById(ctx.query.id)
  ctx.status = 200
  return ctx
})

router.get('/deleteById', async (ctx) => {
  ctx.body = await postModel.remove({
    _id: ctx.query.id
  })
  ctx.status = 200
  return ctx
})

export default router