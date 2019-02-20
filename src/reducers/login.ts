import { ActionType } from 'typesafe-actions';

import * as actions from '@actions/login';
import { LogCons } from '@constants';

import { ReducersUtils } from './utils';

type LoginAction = ActionType<typeof actions>

export interface ILoginState {
  readonly token?: string
  login: boolean
  readonly logging?: boolean
  readonly message?: string
  readonly username?: string
}

const reducersUtils: ReducersUtils<LoginAction, ILoginState> = new ReducersUtils()

export const defaultState: ILoginState = {
  login: false,
  token: '',
  logging: false,
  message: '',
  username: '',
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
      message: '',
      username: payload.username,
    }
  },
  [LogCons.LOGFAIL]: (state: ILoginState, payload: any) => {
    return {
      ...state,
      login: false,
      logging: false,
      token: undefined,
      message: payload.message,
      username: '',
    }
  },
  [LogCons.LOGOUT]: (state: ILoginState, payload: any) => {
    return {
      ...state,
      login: false,
      logging: false,
      token: undefined,
      username: '',
    }
  },
  [LogCons.CLEAR_AUTH]: (state: ILoginState, payload: any) => {
    return {
      ...defaultState,
    }
  },
})