import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer, { ILoginState } from './login'

export type RootState = {
  auth: ILoginState,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['logging', 'message']
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, loginReducer),
})