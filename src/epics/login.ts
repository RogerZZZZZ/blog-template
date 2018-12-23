import { of, throwError, from } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators'
import { Epic, ofType, combineEpics, createEpicMiddleware } from 'redux-observable'
import * as actions from '../actions/login'
import { ActionType, isOfType, getType } from 'typesafe-actions';
import { RootState } from '../reducers'
import { LogCons } from '../constants'

type LoginAction = ActionType<typeof actions>

const loginEpic: Epic<LoginAction, LoginAction, RootState> = (action$, store) => 
  action$.pipe(
    ofType(LogCons.LOGIN),
  )

export default [
  loginEpic,
]