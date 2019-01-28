import * as jwt from 'jsonwebtoken';
import * as Router from 'koa-router';
import * as passwordHash from 'password-hash';

import { userModel } from '../../model';

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
      }, 'secretKey', {
        expiresIn: '2h'
      }) // Todo add to file.
    }
    ctx.status = 200
  } else {
    console.log('Login Fail')
    ctx.status = 402
  }
  return ctx
})

export default router