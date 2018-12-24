import { combineReducers } from 'redux'
import loginReducer, { ILoginState } from './login'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type RootState = {
  auth: ILoginState,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['logging']
}

export default combineReducers({
  auth: persistReducer(authPersistConfig, loginReducer),
})