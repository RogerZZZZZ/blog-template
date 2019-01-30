import axios, { AxiosResponse } from 'axios'
import { extractTokenFromStorage, headerFactory } from './utils'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  console.log(error)
  if (error.response.status === 401) {
    window.localStorage.setItem('persist:auth', '')
    window.location.href = '/login'
  } else if (error.response.status === 500) {
    alert('something wrong')
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

const rs = (method: string, url: string) => {
  return <T>(data: any) => {
    return axios(headerFactory(url, method, data))
    .then((r: AxiosResponse<T>) => r.data)
  }
}

const tag = {
  fetchAll: rs('GET', 'external/tag/fetchAll'),
  fetchByIds: rs('GET', 'external/tag/fetchByIds'),

  create: rs('POST', 'internal/tag/create'),
  updateTag: rs('POST', 'internal/internal/tag/update'),
  uptPostsList: rs('GET', 'internal/tag/uptPostsList'),
}

const post = {
  fetchPinned: rs('GET', 'external/post/fetchPinned'),
  fetchAll: rs('GET', 'external/post/fetchAll'),
  fetchByCategory: rs('GET', 'external/post/fetchByCategory'),
  fetchById: rs('GET', 'external/post/fetchById'),

  create: rs('POST', 'internal/post/create'),
  deleteById: rs('GET', 'internal/post/deleteById'),
  fetchByIds: rs('GET', 'external/post/fetchByIds'),
}

const category = {
  fetchAll: rs('GET', 'external/category/fetchAll'),
  fetchById: rs('GET', 'external/category/fetchById'),

  create: rs('POST', 'internal/category/create'),
  deleteById: rs('GET', 'internal/category/deleteById'),
  uptCategory: rs('POST', 'internal/category/update'),
  uptPostsList: rs('GET', 'internal/category/uptPostsList'),
}

const health = {
  admin: rs('GET', 'internal/health/admin'),
}

export default {
  auth,
  category,
  post,
  tag,
  health,
}