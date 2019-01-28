import * as Router from 'koa-router'
import { categoryModel } from '../../model'
import { removeArticlesCategory } from './blog'

const router = new Router()

export const addArticleId = async (categoryId: string, articleId: string) => {
  const category = await categoryModel.findById(categoryId)
  const articles: string[] = (category && category.articles) || []
  const set = new Set(articles.concat(articleId))
  return await categoryModel.findOneAndUpdate(categoryId, {
    articles: Array.from(set),
  })
}

router.post('/create', async (ctx) => {
  console.log('create category')
  const data = ctx.request.body
  const category = await categoryModel.create(data)
  ctx.body = category
  ctx.status = 200
  return ctx
})

router.post('/update', async (ctx) => {
  console.log('udpate category')
  const data = ctx.request.body
  const id = data._id
  delete data._id
  const category = await categoryModel.findOneAndUpdate(id, data)
  ctx.body = category
  ctx.status = 200
  return ctx
})

router.get('/deleteById', async (ctx) => {
  console.log('delete category by id')
  const { id, articles } = ctx.query
  removeArticlesCategory(articles)
  ctx.body = await categoryModel.remove({
    _id: id,
  })
  ctx.status = 200
  return ctx
})

/**
 * update tag article list
 */
router.get('/uptPostsList', async (ctx) => {
  const { articleId, categoryId } = ctx.query
  console.log('update posts list', categoryId)
  ctx.body = addArticleId(categoryId, articleId)
  ctx.status = 200
  return ctx
})

export default router