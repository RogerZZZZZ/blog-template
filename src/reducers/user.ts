import { ActionType } from 'typesafe-actions'

import * as actions from '@actions/user'
import { UserCons } from '@constants'

import { ReducersUtils } from './utils'

import { IEducation, IExperience, IProject } from '@interface/profile'

type UserAction = ActionType<typeof actions>

export interface IUserState {
  readonly username?: string
  readonly name?: string
  readonly github?: string
  readonly linkedIn?: string
  readonly email?: string
  readonly introduction?: string
  readonly education?: IEducation[]
  readonly project?: IProject[]
  readonly experience?: IExperience[]
  success: boolean,
}

const reducersUtils: ReducersUtils<UserAction, IUserState> = new ReducersUtils()

export const defaultState: IUserState = {
  username: '',
  name: '',
  github: '',
  linkedIn: '',
  email: '',
  introduction: '',
  education: [],
  project: [],
  experience: [],
  success: false,
}

export default reducersUtils.createReducers(defaultState, {
  [UserCons.FETCH_USER]: (state: IUserState) => {
    return {
      ...state,
    }
  },
  [UserCons.FETCH_SUCCESS]: (state: IUserState, payload: any) => {
    return {
      ...state,
      ...payload,
      success: true,
    }
  },
  [UserCons.FETCH_FAILED]: (state: IUserState, payload: any) => {
    return {
      ...state,
      success: false,
    }
  },
  [UserCons.EDIT_USER]: (state: IUserState, payload: any) => {
    return {
      ...state,
      ...payload,
    }
  },
  [UserCons.EDIT_SUCCESS]: (state: IUserState, payload: any) => {
    return {
      ...state,
      ...payload,
    }
  },
  [UserCons.EDIT_FAIL]: (state: IUserState, payload: any) => {
    return {
      ...state,
      ...payload,
    }
  },
})