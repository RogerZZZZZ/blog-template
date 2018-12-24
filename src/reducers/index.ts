import { combineReducers } from 'redux'
import { loginReducer, ILoginState } from './login'

export type RootState = {
  auth: ILoginState,
}

export const initRootState = {
  auth: {
    token: '',
    logging: false,
    login: false
  }
}

export default combineReducers({
  auth: loginReducer,
})