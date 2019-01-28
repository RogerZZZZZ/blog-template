import * as Router from 'koa-router'
import { tagModel } from '../../model'

const router = new Router()

/**
 * fetch all tags
 */
router.get('/fetchAll', async (ctx) => {
  console.log('fetch all tags')
  ctx.body = await tagModel.find({})
  ctx.status = 200
  return ctx
})

export default router