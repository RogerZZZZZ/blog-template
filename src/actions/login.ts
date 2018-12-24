import { createAction } from 'typesafe-actions'
import { LogCons } from '../constants'

export const loginAction = createAction<string, any>(LogCons.LOGIN, resolve => {
  return (username: string, password: string) => resolve({ username, password })
})

export const logoutAction = createAction<string, any>(LogCons.LOGOUT)

export const logFailAction = createAction<string, any>(LogCons.LOGFAIL, resolve => (error: Error) => resolve(error))

export const loggingAction = createAction<string, any>(LogCons.LOGGING)