import * as actions from './../actions/login'
import { ActionType } from 'typesafe-actions'
import { LogCons } from '../constants'
import { ReducersUtils } from './utils';

type LoginAction = ActionType<typeof actions>

export interface ILoginState {
  readonly token?: string,
  login: boolean,
  readonly logging?: boolean,
}

const reducersUtils: ReducersUtils<LoginAction, ILoginState> = new ReducersUtils()

export const defaultState: ILoginState = {
  login: false,
  token: '',
  logging: false,
}

export default reducersUtils.createReducers(defaultState, {
  [LogCons.LOGIN]: (state: ILoginState, payload: any) => {
    return {
      ...state,
      logging: true,
    }
  },
  [LogCons.LOGSUCCESS]: (state: ILoginState, payload: any) => {
    return {
      ...state,
      login: true,
      logging: false,
      token: payload.token,
    }
  },
  [LogCons.LOGFAIL]: (state: ILoginState, payload: any) => {
    return {
      ...state,
      login: false,
      logging: false,
      token: undefined,
    }
  },
  [LogCons.LOGOUT]: (state: ILoginState, payload: any) => {
    return {
      ...state,
      login: false,
      logging: false,
      token: undefined
    }
  },
})