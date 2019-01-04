import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer, { ILoginState } from './login'
import postReducer, { IPostState } from './post'

export type RootState = {
  auth: ILoginState,
  post: IPostState,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['logging', 'message'],
}

const postPersistConfig = {
  key: 'post',
  storage,
  blacklist: ['creating', 'message'],
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, loginReducer),
  post: persistReducer(postPersistConfig, postReducer),
})