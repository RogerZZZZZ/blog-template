import { userModel } from '../model';
import * as Router from 'koa-router'
import * as passwordHash from 'password-hash'

const router = new Router()

router.post('/login', async (context) => {
  console.log('login', context.request.body)
  const data = context.request.body
  const user = await userModel.findOne({ username: data.username })
  if (user && passwordHash.verify(data.password, user.password)) {
    console.log('success')
  } else {
    console.log('fail')
  }
  context.body = ''
})

export default router