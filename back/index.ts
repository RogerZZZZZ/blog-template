import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import api from './api'

const app = new Koa()
const router = new Router()
const port = process.env.PORT || 8080

app.use(bodyParser())

router.use('/api', api.routes())
app.use(router.routes())

app.listen(port)
