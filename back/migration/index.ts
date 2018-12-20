import { User } from './../model/User/user.schema';
import { Version } from './../model/Version/version.schema';

enum VERSION {
  FIRST_DEPLOY,
  AFTER_DEPLOY,
}

const action = {
  [VERSION.FIRST_DEPLOY]: async () => {
    await User.create({
      username: 'admin',
      password: 'rogerzzzz'
    })
    await Version.create({
      version: 'version',
      value: 1,
    })
  },
  [VERSION.AFTER_DEPLOY]: () => {
    console.log('do nothing')
  },
}

const up = async () => {
  const versionModel = await Version.findOne({ version: 'version' });
  console.log('version ', versionModel)
  const version = (versionModel && versionModel.value) || 0
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
