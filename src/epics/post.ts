import { ActionsObservable, Epic, ofType } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/post'
import { PostCons } from '@constants'
import { RootState } from '@reducers/index'

import service from '@services'

type PostAction = ActionType<typeof actions.postAction>
type Actions = ActionType<typeof actions>

const postEpic: Epic<Actions, Actions, RootState> = (actions$: ActionsObservable<Actions>) => {
  console.log('post epic')
  return actions$.pipe(
    ofType<Actions, PostAction>(PostCons.POST_CREATE),
    mergeMap((action: any) =>
      from(service.send(service.post.create, {
        title: action.payload.title,
        post: action.payload.post,
        abstract: action.payload.abstract,
        tags: action.payload.tags,
      }, action.payload.token))
      .pipe(
        map((res: any) => res.status === 200
          ? actions.postSuccessAction()
          : actions.postFailAction('Fail to post')),
        catchError((error: Error) => of(actions.postFailAction(error.message)))
    )
  )
)
}

export default [
  postEpic,
]