import { ActionsObservable, Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/login'
import { LogCons } from '@constants'
import { RootState } from '@reducers/index'

import service from '@services'

type LoginAction = ActionType<typeof actions.loginAction>
type Actions = ActionType<typeof actions>

const loginEpic: Epic<Actions, Actions, RootState> = (action$: ActionsObservable<Actions>) =>
  action$.pipe(
    ofType<Actions, LoginAction>(LogCons.LOGIN),
    mergeMap((action: any) =>
      from(service.auth.login({
        username: action.payload.username,
        password: action.payload.password
      }))
      .pipe(
        map((res) => res.status === 200
          ? actions.logSuccessAction(res.data)
          : actions.logFailAction('Authentication failed')
        ),
        catchError((error: Error) => of(actions.logFailAction('Authentication failed')))
      )
    )
  )

export default [
  loginEpic,
]