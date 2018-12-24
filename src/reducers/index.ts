import { combineReducers, createStore, applyMiddleware } from 'redux'
import { loginReducer, ILoginState } from './login'

export interface IRootState {
  loginReducer: ILoginState,
}

export default combineReducers({
  loginReducer,
})