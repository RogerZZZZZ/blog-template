import { createAction } from 'typesafe-actions'
import { LogCons } from '../constants'

export const loginAction = createAction<string, any>(LogCons.LOGIN, resolve => {
  return (username: string, password: string) => resolve({ username, password })
})

export const logoutAction = createAction<string, any>(LogCons.LOGOUT)

export const logFailAction = createAction<string, any>(LogCons.LOGFAIL, resolve => {
  return (message: string) => resolve({ message })
})

export const logSuccessAction = createAction<string, any>(LogCons.LOGSUCCESS, resolve => {
  return (payload: {token: string}) => resolve(payload)
})