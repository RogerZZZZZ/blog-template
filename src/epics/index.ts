import { combineEpics } from 'redux-observable'

import loginEpic from './login'

const epics = combineEpics(
  ...loginEpic
)

export default epics