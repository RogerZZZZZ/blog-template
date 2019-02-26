import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/post'
import { PostCons } from '@constants'

import { ReducersUtils } from './utils'

type PostAction = ActionType<typeof actions>

export interface IPostState {
  readonly doing: boolean,
  readonly deleteSuccess: boolean,
  readonly message: string,
  readonly postSuccess: boolean,
}

const reducersUtils: ReducersUtils<PostAction, IPostState> = new ReducersUtils()

export const defaultState: IPostState = {
  doing: false,
  deleteSuccess: false,
  message: '',
  postSuccess: false,
}

export default reducersUtils.createReducers(defaultState, {
  [PostCons.POST_CREATE]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: true,
      postSuccess: false,
    }
  },
  [PostCons.POST_SUCCESS]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: false,
      postSuccess: true,
    }
  },
  [PostCons.POST_FAIL]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: false,
      message: payload.message,
      postSuccess: false,
    }
  },
  [PostCons.DELETE_POST]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: true,
      deleteSuccess: false,
    }
  },
  [PostCons.DELETE_SUCCESS]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: false,
      deleteSuccess: true,
    }
  },
  [PostCons.CLEAR_ACTION]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: false,
      message: '',
      deleteSuccess: false,
      postSuccess: false,
    }
  }
})