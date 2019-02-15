import * as Router from 'koa-router'
import { Types } from 'mongoose'
import { userModel } from '../../model'

const router = new Router()

router.get('/fetch', async (ctx) => {
  const { username } = ctx.query 
  console.log('Find user profile, ', username)
  const user = await userModel.findOne({ username })
  if (user) {
    ctx.status = 200
    ctx.body = user
  } else {
    // target user does not exist
    ctx.status = 412
    ctx.body = {}
  }
})

export default router