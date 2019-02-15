import * as Router from 'koa-router'
import auth from './auth'
import blog from './blog'
import category from './category'
import tag from './tag'
import user from './user'

const router = new Router()

router.use('/auth', auth.routes())
router.use('/post', blog.routes())
router.use('/category', category.routes())
router.use('/tag', tag.routes())
router.use('/user', user.routes())

export default router