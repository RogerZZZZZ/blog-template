import * as dotenv from 'dotenv'
import * as Router from 'koa-router'
import * as R from 'ramda'
import { userModel } from '../../model'

dotenv.config()

const router = new Router()

router.get('/fetch', async (ctx) => {
  const username = process.env.ROOT_USER
  const user = await userModel.findOne({ username })
  console.log('user: ', user)
  if (user) {
    ctx.status = 200
    delete user.password
    ctx.body = R.omit(['password', '_id', '__v'], user.toObject())
  } else {
    // target user does not exist
    ctx.status = 412
    ctx.body = {}
  }
})

export default router