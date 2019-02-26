import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer, { ILoginState } from './login'
import postReducer, { IPostState } from './post'
import userReducer, { IUserState } from './user'

export type RootState = {
  auth: ILoginState,
  post: IPostState,
  user: IUserState,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['logging', 'message'],
}

const postPersistConfig = {
  key: 'post',
  storage,
  blacklist: ['doing', 'message', 'postSuccess', 'deleteSuccess'],
}

const userPersistConfig = {
  key: 'user',
  storage,
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, loginReducer),
  post: persistReducer(postPersistConfig, postReducer),
  user: persistReducer(userPersistConfig, userReducer),
})