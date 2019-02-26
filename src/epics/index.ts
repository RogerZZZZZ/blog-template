import { combineEpics } from 'redux-observable'

import loginEpic from './login'
import postEpic from './post'
import userEpic from './user'

export const loginEpics = combineEpics(
  ...loginEpic,
)

export const postEpics = combineEpics(
  ...postEpic,
)

export const userEpics = combineEpics(
  ...userEpic
)