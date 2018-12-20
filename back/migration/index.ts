import { userModel, versionModel } from '../model'

enum VERSION {
  FIRST_DEPLOY,
  AFTER_DEPLOY,
}

const action = {
  [VERSION.FIRST_DEPLOY]: async () => {
    await userModel.create({
      username: 'admin',
      password: 'rogerzzzz'
    })
    await userModel.create({
      version: 'version',
      value: 1,
    })
  },
  [VERSION.AFTER_DEPLOY]: () => {
    console.log('do nothing')
  },
}

const up = async () => {
  const model = await versionModel.findOne({ version: 'version' });
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
