import * as actions from './../actions/login'
import { ActionType } from 'typesafe-actions'
import { LogCons } from '../constants'

type LoginAction = ActionType<typeof actions>

export interface ILoginState {
  token?: string,
  login: boolean,
}

const defaultState: ILoginState = {
  login: false,
}

export const loginReducer = (state: ILoginState = defaultState, action: LoginAction) => {
  switch (action.type) {
    case LogCons.LOGIN:
      console.log('login reducers')
      return {
        ...state,
        login: true,
      }
    case LogCons.LOGOUT:
      return {
        ...state,
        login: false,
        token: null,
      }
    case LogCons.LOGGING:
      console.log('logging')
      return state
    default:
      return state
  }
}