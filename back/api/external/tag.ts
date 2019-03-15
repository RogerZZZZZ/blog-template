import * as Router from 'koa-router'
import { Types } from 'mongoose'
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

router.get('/fetchByIds', async (ctx) => {
  console.log('fetch tags by ids')
  const ids = ctx.query.ids.split(',')
  ctx.body = await tagModel.find({
    _id: {
      $in: ids.filter((v: string) => v !== '')
            .map((el: string) => Types.ObjectId(el))
    }
  })
  ctx.status = 200
  return ctx
})

router.get('/fetchById', async (ctx) => {
  console.log('fetch tag by id')
  const id = ctx.query.id
  ctx.body = await tagModel.findById(id)
  ctx.status = 200
  return ctx
})

export default router