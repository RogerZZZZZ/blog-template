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

export const profileState = (state: RootState) => ({
  email: state.user.email,
  username: state.user.username,
  name: state.user.name,
  github: state.user.github,
  linkedIn: state.user.linkedIn,
  facebook: state.user.facebook,
  twitter: state.user.twitter,
  weibo: state.user.weibo,
  introduction: state.user.introduction,
  success: state.user.success,
  education: state.user.education,
  project: state.user.project,
  experience: state.user.experience,
})
