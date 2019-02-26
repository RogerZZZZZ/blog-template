import { ActionsObservable, Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionType } from 'typesafe-actions';

import * as actions from '@actions/user'
import { UserCons } from '@constants'
import { RootState } from '@reducers/index'

import service from '@services'

type FetchUserAction = ActionType<typeof actions.fetchProfileAction>
type Actions = ActionType<typeof actions>

const fetchEpic: Epic<Actions, Actions, RootState> = (action$: ActionsObservable<Actions>) =>
  action$.pipe(
    ofType<Actions, FetchUserAction>(UserCons.FETCH_USER),
    mergeMap((action: any) =>
      from(service.user.fetch({}))
      .pipe(
        map((res: any) => res !== {}
          ? actions.fetchSuccessAction(res)
          : actions.fetchFailedAction('Fetch Failed')
        ),
        catchError((error: Error) => of(actions.fetchFailedAction('Fetch failed')))
    ),
  )
)

export default [
  fetchEpic,
]