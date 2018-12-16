import * as Router from 'koa-router'

const router = new Router()

router.post('/login', (context) => {
  console.log('login', context.request.body)
})

export default router