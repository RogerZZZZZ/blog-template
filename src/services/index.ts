import axios, { AxiosResponse } from 'axios'
import reduxPersist from '../redux-persist'
import { LogCons } from './../constants/index'
import { extractTokenFromStorage, headerFactory } from './utils'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  return response
}, error => {
  console.log(error)
  if (error && error.response) {
    if (error.response.status === 401) {
      reduxPersist.getStore().dispatch({
        type: LogCons.CLEAR_AUTH,
      })
      window.location.href = '/login'
    } else if (error.response.status === 500) {
      console.log(error)
    }
  }
  return Promise.reject(error)
})

axios.interceptors.request.use(config => {
  config.headers.Authorization = extractTokenFromStorage()
  return config
})

const auth = {
  login: (obj: any) => axios.post('external/auth/login', obj).then(r => r),
}

const rs = (method: string, url: string, formMethod: boolean = false) => {
  return <T>(data: any) => {
    const config = headerFactory(url, method, data)
    if (formMethod) {
      Object.assign(config, {
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      })
    }
    return axios(config)
    .then((r: AxiosResponse<T>) => r.data)
  }
}

const tag = {
  fetchAll: rs('GET', 'external/tag/fetchAll'),
  fetchByIds: rs('GET', 'external/tag/fetchByIds'),
  fetchById: rs('GET', 'external/tag/fetchById'),

  create: rs('POST', 'internal/tag/create'),
  updateTag: rs('POST', 'internal/tag/update'),
  uptPostsList: rs('GET', 'internal/tag/uptPostsList'),
}

const post = {
  fetchPinned: rs('GET', 'external/post/fetchPinned'),
  fetchAll: rs('GET', 'external/post/fetchAll'),
  fetchByCategory: rs('GET', 'external/post/fetchByCategory'),
  fetchById: rs('GET', 'external/post/fetchById'),
  fetchByIds: rs('GET', 'external/post/fetchByIds'),

  create: rs('POST', 'internal/post/create'),
  deleteById: rs('GET', 'internal/post/deleteById'),
  fetchByIdsInternal: rs('GET', 'internal/post/fetchByIds'),
  fetchAllInternal: rs('GET', 'internal/post/fetchAll'),
  upload: rs('POST', 'internal/post/upload', true),
}

const category = {
  fetchAll: rs('GET', 'external/category/fetchAll'),
  fetchById: rs('GET', 'external/category/fetchById'),

  create: rs('POST', 'internal/category/create'),
  deleteById: rs('GET', 'internal/category/deleteById'),
  uptCategory: rs('POST', 'internal/category/update'),
  uptPostsList: rs('GET', 'internal/category/uptPostsList'),
}

const user = {
  fetch: rs('GET', 'external/user/fetch'),

  edit: rs('POST', 'internal/user/edit'),
}

const health = {
  admin: rs('GET', 'internal/health/admin'),
}

export default {
  auth,
  category,
  post,
  tag,
  user,
  health,
}