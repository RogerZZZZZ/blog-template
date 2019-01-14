import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/post'
import { PostCons } from '@constants'

import { ReducersUtils } from './utils'

type PostAction = ActionType<typeof actions>

export interface IPostState {
  readonly creating: boolean,
}

const reducersUtils: ReducersUtils<PostAction, IPostState> = new ReducersUtils()

export const defaultState: IPostState = {
  creating: false,
}

export default reducersUtils.createReducers(defaultState, {
  [PostCons.POST_CREATE]: (state: IPostState, payload: any) => {
    return {
      ...state,
      creating: true,
    }
  },
  [PostCons.POST_SUCCESS]: (state: IPostState, payload: any) => {
    return {
      ...state,
      creating: false,
    }
  },
  [PostCons.POST_FAIL]: (state: IPostState, payload: any) => {
    return {
      ...state,
      creating: false,
      message: payload.message,
    }
  },
  [PostCons.DELETE_POST]: (state: IPostState, payload: any) => {
    return {
      ...state,
      creating: false,
    }
  }
})