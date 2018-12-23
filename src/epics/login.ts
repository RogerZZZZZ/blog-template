import { of, throwError, from } from 'rxjs'
import { map, filter, catchError, mergeMap, switchMap, mapTo } from 'rxjs/operators'
import { Epic, ofType } from 'redux-observable'
import * as actions from '../actions/login'
import { ActionType, isOfType, getType } from 'typesafe-actions';
import { RootState } from '../reducers'
import { LogCons } from '../constants'
import auth from '../services/auth'

type LoginAction = ActionType<typeof actions.loginAction>

const loginEpic: Epic<LoginAction, LoginAction, RootState> = (action$, store) => 
  action$.pipe(
    ofType(LogCons.LOGIN),
    mapTo(LogCons.LOGGING),
    switchMap((action: LoginAction) => {
      from(auth.login({
        username: action.payload.username,
        password: action.payload.password
      })).pipe(
        mapTo(LogCons.LOGOUT),
        catchError(error => of(actions.logFailAction(error)))
      )
    })
  )

export default [
  loginEpic,
]