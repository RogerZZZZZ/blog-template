import { createAction } from 'typesafe-actions'
import { LogCons } from '../constants'

export const loginAction = createAction(LogCons.LOGIN, resolve => (username: string, password: string) => resolve({ username, password }))

export const logoutAction = createAction(LogCons.LOGOUT)

export const logFailAction = createAction(LogCons.LOGFAIL, resolve => (error: Error) => resolve(error))

export const loggingAction = createAction(LogCons.LOGGING)