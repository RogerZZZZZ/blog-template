import { ActionsObservable, Epic, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { catchError, concatMap, map } from 'rxjs/operators'
import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/post'
import { PostCons } from '@constants'
import { RootState } from '@reducers/index'

import service from '@services'

type PostAction = ActionType<typeof actions.postAction>
type DeleteAction = ActionType<typeof actions.deletePostAction>
type Actions = ActionType<typeof actions>

const postEpic: Epic<Actions, Actions, RootState> = (actions$: ActionsObservable<Actions>) =>
  actions$.pipe(
    ofType<Actions, PostAction>(PostCons.POST_CREATE),
    concatMap(async (action: any) => {
      return of({
        data: await service.send<any>(service.post.create, {
                title: action.payload.title,
                post: action.payload.post,
                abstract: action.payload.abstract,
                tags: action.payload.tags,
                pinned: action.payload.pinned,
        }, action.payload.token),
        token: action.payload.token
      })
    }),
    concatMap(async ({value}: any) => {
      return of(await service.send<any>(service.tag.uptPostsList, {
          postId: value.data._id,
          tags: value.data.tags,
        }, value.token))
    }),
    map((res: any) =>
      res
        ? actions.postSuccessAction()
        : actions.postFailAction('Fail to post')
    ),
    catchError((error: Error) => of(actions.postFailAction(error.message)))
  )

const deleteEpic: Epic<Actions, Actions, RootState> = (actions$: ActionsObservable<Actions>) =>
  actions$.pipe(
    ofType<Actions, DeleteAction>(PostCons.DELETE_POST),
    concatMap(async (action: any) => {
      return of({
        data: await service.send<any>(service.post.deleteById, {
          id: action.payload.id,
        }, action.payload.token),
      })
    }),
    map((res: any) =>
      res
        ? actions.deleteSuccessAction()
        : actions.postFailAction('Fail to delete')
    )
  )

export default [
  postEpic,
  deleteEpic,
]