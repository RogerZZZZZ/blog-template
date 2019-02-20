import { RootState } from './index'

export const logState = (state: RootState) => ({
  logging: state.auth.logging,
  token: state.auth.token,
  message: state.auth.message,
  login: state.auth.login,
  username: state.auth.username,
})

export const postState = (state: RootState) => ({
  doing: state.post.doing,
  deleteSuccess: state.post.deleteSuccess,
  message: state.post.message,
  postSuccess: state.post.postSuccess,
})
