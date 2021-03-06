import * as Router from 'koa-router'
import blog from './blog'
import category from './category'
import health from './health'
import tag from './tag'
import user from './user'

const router = new Router()

router.use('/post', blog.routes())
router.use('/category', category.routes())
router.use('/tag', tag.routes())
router.use('/health', health.routes())
router.use('/user', user.routes())

export default router