import { combineEpics } from 'redux-observable'

import loginEpic from './login'
import postEpic from './login'

export const loginEpics = combineEpics(
  ...loginEpic,
)

export const postEpics = combineEpics(
  ...postEpic,
)