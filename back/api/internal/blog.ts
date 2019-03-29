import * as Router from 'koa-router'
import { Types } from 'mongoose'
import { postModel } from '../../model'
import upload from '../../upload'
import { postIdOutTag } from './tag'

const router = new Router()

export const tagIdOutofArticle = async (tagId: string) => {
  if (tagId && tagId !== '') {
    const articles = await postModel.find({})
    articles.map(async (item) => {
      const tags: string[] = (item.tags && item.tags.filter(v => v !== tagId)) || []
      const _id = item._id
      delete item._id
      await postModel.findOneAndUpdate({
        _id,
      }, {
        tags,
      })
    })
  }
}

export const removeArticlesCategory = async (ids: string[]) => {
  if (ids && ids.length > 0) {
    ids.map(async (id: string) => {
      await postModel.findOneAndUpdate({
        _id: id,
      }, {
        categoryId: '',
      })
    })
  }
}

router.get('/fetchAll', async (ctx) => {
  const posts = await postModel.find({})
  ctx.body = posts
  ctx.status = 200
  return ctx
})

router.get('/fetchByIds', async (ctx) => {
  const ids = ctx.query.articles.split(',')
  console.log('articles: ', ids)
  ctx.body = await postModel.find({
    _id: {
      $in: ids.filter((v: string) => v !== '')
            .map((el: string) => Types.ObjectId(el))
    },
  })
  ctx.status = 200
  return ctx
})

router.post('/create', async (ctx) => {
  console.log('createOrUpdate post')
  const data = ctx.request.body
  let post
  const _id = data._id
  delete data._id
  if (_id !== '') {
    const old = await postModel.findById(_id)
    post = await postModel.findByIdAndUpdate({ _id }, data)
    if (old) {
      postIdOutTag(old.tags.filter(v => !data.tags.includes(v)), _id)
    }
  } else {
    post = await postModel.create(data)
  }
  ctx.body = post
  ctx.status = 200
  return ctx
})

router.get('/deleteById', async (ctx) => {
  const id: string = ctx.query.id
  const post = await postModel.findById(id)
  if (post && post.tags) {
    postIdOutTag(post.tags, id)
  }
  ctx.body = await postModel.remove({
    _id: id
  })
  ctx.status = 200
  return ctx
})

router.post('/upload', upload.single('file'), async (ctx) => {
  console.log(ctx)
})

export default router