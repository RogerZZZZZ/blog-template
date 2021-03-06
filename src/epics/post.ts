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
        data: await service.post.create<any>({
                title: action.payload.title,
                post: action.payload.post,
                categoryId: action.payload.categoryId,
                abstract: action.payload.abstract,
                tags: action.payload.tags,
                open: action.payload.open,
                minutes: action.payload.minutes,
                pinned: action.payload.pinned,
                _id: action.payload.id,
        }),
        tags: action.payload.tags,
      })
    }),
    concatMap(async ({value}: any) => {
      return of({
        data: await service.tag.uptPostsList<any>({
              postId: value.data._id,
              tags: value.tags,
          }),
        categoryId: value.data.categoryId,
        articleId: value.data._id,
      })
    }),
    concatMap(async ({value}: any) => {
      return of(await service.category.uptPostsList<any>({
            articleId: value.articleId,
            categoryId: value.categoryId,
        })
      )
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
        data: await service.post.deleteById<any>({
          id: action.payload.id,
        }),
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