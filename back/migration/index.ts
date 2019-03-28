import * as dotenv from 'dotenv'
import { userModel, versionModel } from '../model'

dotenv.config()

enum VERSION {
  FIRST_DEPLOY,
  AFTER_DEPLOY,
}

const action = {
  [VERSION.FIRST_DEPLOY]: async () => {
    await userModel.create({
      username: process.env.ROOT_USER,
      password: process.env.ROOT_USER_PWD,
    })
    await versionModel.create({
      version: 'version',
      value: 1,
    })
  },
  [VERSION.AFTER_DEPLOY]: () => {
    console.log('do nothing')
  },
}

const up = async () => {
  const model = await versionModel.findOne({ version: 'version' })
  const version = (model && model.value) || 0
  for (let v = version; v <= getVersion(); v++) {
    const migrate = action[v]
    await migrate()
  }
}

const getVersion = () => {
  return VERSION.FIRST_DEPLOY
}

export default {
  up,
  getVersion,
}
