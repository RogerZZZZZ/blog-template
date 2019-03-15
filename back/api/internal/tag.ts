import * as Router from 'koa-router'
import { tagModel } from '../../model'
import { tagIdOutofArticle } from './blog'

const router = new Router()

export const postIdOutTag = (tagIds: string[], article: string) => {
  tagIds.map(async (tagId: string) => {
    const tag = await tagModel.findById(tagId)
    const articles: string[] = (tag && tag.articles) || []
    await tagModel.findByIdAndUpdate(tagId, {
      $set: {
        articles: articles.filter(v => v !== article)
      }
    })
  })
}

export const addArticleId = (tagIds: string[], article: string) => {
  tagIds.map(async (tagId: string) => {
    const tag = await tagModel.findById(tagId)
    if (tag) {
      const articles = tag.articles || []
      const set = new Set(articles.concat(article))
      await tagModel.findByIdAndUpdate(tagId, {
        articles: Array.from(set),
      })
    }
  })
}

/**
 * create new tag
 */
router.post('/create', async (ctx) => {
  console.log('create tag')
  const data = ctx.request.body
  const tag = await tagModel.create(data)
  console.log(tag)
  ctx.body = {
    tag
  }
  ctx.status = 200
  return ctx
})

/**
 * update tag article list
 */
router.get('/uptPostsList', async (ctx) => {
  const { postId, tags } = ctx.query
  const tagList = tags.split(',')
  console.log('update posts list', tagList)
  addArticleId(tagList, postId)
  ctx.status = 200
  return ctx
})

router.post('/update', async (ctx) => {
  const data = ctx.request.body
  const id = data._id
  console.log('update', id)
  delete data._id
  ctx.body = await tagModel.findOneAndUpdate({
    _id: id
  }, data)
  ctx.status = 200
  return ctx
})

/**
 * delete tag by id
 */
router.delete('/delete/:id', async (ctx) => {
  const { id } = ctx.params
  await tagModel.findByIdAndRemove()
  tagIdOutofArticle(id)
  ctx.status = 200
  return ctx
})


export default router