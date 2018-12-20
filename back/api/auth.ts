import { userModel } from '../model';
import * as Router from 'koa-router'
import * as passwordHash from 'password-hash'
import * as jwt from 'jsonwebtoken'

const router = new Router()

router.post('/login', async (ctx) => {
  console.log('login', ctx.request.body)
  const data = ctx.request.body
  const user = await userModel.findOne({ username: data.username })
  if (user && passwordHash.verify(data.password, user.password)) {
    console.log('success')
    ctx.body = {
      token: jwt.sign({
        role: 'admin',
      }, 'secretKey') // Todo add to file.
    }
    ctx.status = 200
  } else {
    console.log('fail')
    ctx.status = 401
  }
  return ctx
})

export default router