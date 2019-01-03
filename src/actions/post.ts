import { PostCons } from '@constants'
import { createAction } from 'typesafe-actions'

export const postAction = createAction<string, any>(PostCons.POST_CREATE, resolve => {
  console.log('action post')
  return (payload: {post: string, title: string, abstract: string, tags: string[]}) => resolve(payload)
})

export const postSuccessAction = createAction<string, any>(PostCons.POST_SUCCESS)

export const postFailAction = createAction<string, any>(PostCons.POST_FAIL, resolve => {
  return (message: string) => resolve({ message })
})