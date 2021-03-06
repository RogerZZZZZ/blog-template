import * as Router from 'koa-router'
import { userModel } from '../../model'

const router = new Router()

router.post('/edit', async (ctx) => {
  const data = ctx.request.body
  console.log('update user profile', data)
  const { username } = data
  try {
    const update = await userModel.findOneAndUpdate({
      username,
    }, data)
    ctx.body = update
    ctx.status = 200
  } catch (error) {
    ctx.body = {}
    ctx.status = 200
  }
  return ctx
})

export default router