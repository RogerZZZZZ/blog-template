import { ActionsObservable, Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionType } from 'typesafe-actions';

import * as actions from '@actions/user'
import { UserCons } from '@constants'
import { RootState } from '@reducers/index'

import service from '@services'

type FetchUserAction = ActionType<typeof actions.fetchProfileAction>
type EditUserAction = ActionType<typeof actions.editProfileAction>
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

const editEpic: Epic<Actions, Actions, RootState> = (action$: ActionsObservable<Actions>) =>
  action$.pipe(
    ofType<Actions, EditUserAction>(UserCons.EDIT_USER),
    mergeMap((action: any) =>
      from(service.user.edit({
        username: action.payload.username,
        name: action.payload.name,
        github: action.payload.github,
        facebook: action.payload.facebook,
        twitter: action.payload.twitter,
        weibo: action.payload.weibo,
        linkedIn: action.payload.linkedIn,
        email: action.payload.email,
        introduction: action.payload.introduction,
        education: action.payload.education,
        project: action.payload.project,
        experience: action.payload.experience,
      }))
      .pipe(
        map((res: any) => res.toString() !== '{}'
          ? actions.editSuccessAction(res)
          : actions.editFailAction()
        ),
        catchError((error: Error) => of(actions.editFailAction()))
      ),
    )
  )

export default [
  editEpic,
  fetchEpic,
]