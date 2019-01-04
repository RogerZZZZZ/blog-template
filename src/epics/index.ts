import { combineEpics } from 'redux-observable'

import loginEpic from './login'
import postEpic from './post'

export const loginEpics = combineEpics(
  ...loginEpic,
)

export const postEpics = combineEpics(
  ...postEpic,
)