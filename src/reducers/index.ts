import { combineReducers, createStore, applyMiddleware } from 'redux'
import { loginReducer, ILoginState } from './login'

export type RootState = {
  loginReducer: ILoginState,
}

export default combineReducers({
  loginReducer,
})