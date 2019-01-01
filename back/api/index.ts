import * as Router from 'koa-router'
import auth from './auth'
import blog from './blog'
import tag from './tag'

const router = new Router()

router.use('/auth', auth.routes())
router.use('/blog', blog.routes())
router.use('/tag', tag.routes())

export default router