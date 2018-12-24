import { of, from } from 'rxjs'
import { catchError, mergeMap, mapTo } from 'rxjs/operators'
import { Epic, ofType, ActionsObservable } from 'redux-observable'
import * as actions from '../actions/login'
import { ActionType } from 'typesafe-actions';
import { IRootState } from '../reducers'
import { LogCons } from '../constants'
import auth from '../services/auth'

type LoginAction = ActionType<typeof actions.loginAction>
type Actions = ActionType<typeof actions>

const loginEpic: Epic<Actions, Actions, IRootState> = (action$: ActionsObservable<Actions>, store) => 
  action$.pipe(
    ofType<Actions, LoginAction>(LogCons.LOGIN),
    mergeMap((action: any) =>
      from(auth.login({
        username: action.payload.username,
        password: action.payload.password
      })).pipe(
        mapTo(LogCons.LOGOUT),
        catchError(error => of(actions.logFailAction(error)))
      )
    )
  )

export default [
  loginEpic,
]