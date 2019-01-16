import * as Router from 'koa-router'
import { tagModel } from '../model'

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

router.get('/fetchAll', async (ctx) => {
  console.log('fetch all tags')
  ctx.body = await tagModel.find({})
  ctx.status = 200
  return ctx
})

router.get('/uptPostsList', async (ctx) => {
  const { postId, tags } = ctx.query
  const tagList = tags.split(',')
  console.log('update posts list', tagList)
  addArticleId(tagList, postId)
  ctx.status = 200
  return ctx
})


export default router