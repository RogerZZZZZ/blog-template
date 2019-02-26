import { UserCons } from '@constants'
import { createAction } from 'typesafe-actions'

export const fetchProfileAction = createAction<string, any>(UserCons.FETCH_USER)

export const editProfileAction = createAction<string, any>(UserCons.EDIT_USER, resolve => {
  return (payload: any) => resolve(payload)
})

export const fetchFailedAction = createAction<string, any>(UserCons.FETCH_FAILED)