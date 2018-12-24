import * as Router from 'koa-router'
import auth from './auth'
import blog from './blog'

const router = new Router()

router.use('/auth', auth.routes())
router.use('/blog', blog.routes())

export default router