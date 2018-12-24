import * as actions from './../actions/login'
import { ActionType } from 'typesafe-actions'
import { LogCons } from '../constants'

type LoginAction = ActionType<typeof actions>

export interface ILoginState {
  readonly token?: string,
  login: boolean,
  readonly logging?: boolean,
}

export const defaultState: ILoginState = {
  login: false,
  token: '',
  logging: false,
}

export const loginReducer = (state: ILoginState = defaultState, action: LoginAction): ILoginState => {
  switch (action.type) {
    case LogCons.LOGIN:
      console.log('login reducers')
      return {
        ...state,
        login: true,
        logging: true,
      }
    case LogCons.LOGSUCCESS:
      console.log('login success')
      return {
        ...state,
        login: true,
        logging: false,
      }
    case LogCons.LOGFAIL:
      return {
        ...state,
      }
    case LogCons.LOGOUT:
      return {
        ...state,
        login: false,
      }
    default:
      return state
  }
}