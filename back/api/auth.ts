import * as Router from 'koa-router'
import * as passwordHash from 'password-hash'

const router = new Router()

router.post('/login', async (context) => {
  console.log('login', context.request.body)
  context.body = ''
})

export default router