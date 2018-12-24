import { of, from } from 'rxjs'
import { catchError, mergeMap, map, delay } from 'rxjs/operators'
import { Epic, ofType, ActionsObservable } from 'redux-observable'
import * as actions from '../actions/login'
import { ActionType } from 'typesafe-actions';
import { RootState } from '../reducers'
import { LogCons } from '../constants'
import auth from '../services/auth'

type LoginAction = ActionType<typeof actions.loginAction>
type Actions = ActionType<typeof actions>

const loginEpic: Epic<Actions, Actions, RootState> = (action$: ActionsObservable<Actions>) =>
  action$.pipe(
    ofType<Actions, LoginAction>(LogCons.LOGIN),
    delay(2000),
    mergeMap((action: any) =>
      from(auth.login({
        username: action.payload.username,
        password: action.payload.password
      }))
      .pipe(
        map((res) => res.status === 200
          ? actions.logSuccessAction(res.data)
          : actions.logFailAction('Authentication failed')
        ),
        catchError((error: Error) => of(actions.logFailAction(error.message)))
      )
    )
  )

export default [
  loginEpic,
]