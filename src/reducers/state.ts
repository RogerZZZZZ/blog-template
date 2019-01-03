import { RootState } from './index'

export const logState = (state: RootState) => ({
  logging: state.auth.logging,
  token: state.auth.token,
  message: state.auth.message,
  login: state.auth.login,
})

export const tokenState = (state: RootState) => ({
  token: state.auth.token,
})