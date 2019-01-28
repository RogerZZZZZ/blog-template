import * as Router from 'koa-router'
import external from './external'
import internal from './internal'

const router = new Router()

router.use('/external', external.routes())
router.use('/internal', internal.routes())

export default router