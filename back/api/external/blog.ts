import * as Router from 'koa-router'
import { Types } from 'mongoose'
import { postModel } from '../../model'

const router = new Router()

router.get('/fetchPinned', async (ctx) => {
  const posts = await postModel.find({
    pinned: true,
    open: true,
  })
  ctx.body = posts
  ctx.status = 200
  return ctx
})

router.get('/fetchAll', async (ctx) => {
  const posts = await postModel.find({
    open: true,
  })
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

router.get('/fetchByIds', async (ctx) => {
  const ids = ctx.query.articles.split(',')
  console.log('articles: ', ids)
  ctx.body = await postModel.find({
    _id: {
      $in: ids.filter((v: string) => v !== '')
            .map((el: string) => Types.ObjectId(el))
    },
    open: true,
  })
  ctx.status = 200
  return ctx
})

export default router