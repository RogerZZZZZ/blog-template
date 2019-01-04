import * as Router from 'koa-router'
import { postModel } from '../model'

const router = new Router()

router.get('/create', async (ctx) => {
  console.log('create post')
  const data = ctx.request.body
  const post = await postModel.create(data)
  console.log(post)
  ctx.body = post
  ctx.status = 200
  return ctx
})

export default router