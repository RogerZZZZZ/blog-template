import * as Router from 'koa-router'
import { userModel } from '../../model'

const router = new Router()

router.post('/update', async (ctx) => {
  console.log('update user profile')
  const data = ctx.request.body
  const { username } = data
  const update = await userModel.findOneAndUpdate({
    username,
  }, data)
  ctx.body = update
  ctx.status = 200
  return ctx
})

export default router