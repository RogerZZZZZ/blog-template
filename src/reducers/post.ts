import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/post'
import { PostCons } from '@constants'
import { IPostCard } from '@interface'

import { ReducersUtils } from './utils'

type PostAction = ActionType<typeof actions>

export interface IPostState {
  readonly doing: boolean,
  readonly deleteSuccess: boolean,
  readonly message: string,
}

const reducersUtils: ReducersUtils<PostAction, IPostState> = new ReducersUtils()

export const defaultState: IPostState = {
  doing: false,
  deleteSuccess: false,
  message: '',
}

export default reducersUtils.createReducers(defaultState, {
  [PostCons.POST_CREATE]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: true,
    }
  },
  [PostCons.POST_SUCCESS]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: false,
    }
  },
  [PostCons.POST_FAIL]: (state: IPostState, payload: any) => {
    return {
      ...state,
      doing: false,
      message: payload.message,
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
    }
  }
})