import axios, { AxiosResponse } from 'axios'
import { headerFactory, optFactory } from './utils'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  console.log(error)
  if (error.response.status === 401) {
    window.localStorage.setItem('persist:auth', '')
    window.location.href = '/login'
  }
});

interface IOpt {
  method: string
  url: string
}

const auth = {
  login: (obj: any) => axios.post('external/auth/login', obj).then(r => r),
}

const tag = {
  fetchAll: optFactory('GET', 'external/tag/fetchAll'),

  create: optFactory('POST', 'internal/tag/create'),
  updateTag: optFactory('POST', 'internal/internal/tag/update'),
  uptPostsList: optFactory('GET', 'internal/tag/uptPostsList'),
}

const post = {
  fetchPinned: optFactory('GET', 'external/post/fetchPinned'),
  fetchAll: optFactory('GET', 'external/post/fetchAll'),
  fetchByCategory: optFactory('GET', 'external/post/fetchByCategory'),
  fetchById: optFactory('GET', 'external/post/fetchById'),

  create: optFactory('POST', 'internal/post/create'),
  deleteById: optFactory('GET', 'internal/post/deleteById'),
  fetchByIds: optFactory('GET', 'external/post/fetchByIds'),
}

const category = {
  fetchAll: optFactory('GET', 'external/category/fetchAll'),
  fetchById: optFactory('GET', 'external/category/fetchById'),

  create: optFactory('POST', 'internal/category/create'),
  deleteById: optFactory('GET', 'internal/category/deleteById'),
  uptCategory: optFactory('POST', 'internal/category/update'),
  uptPostsList: optFactory('GET', 'internal/category/uptPostsList'),
}

const health = {
  admin: optFactory('GET', 'internal/health/admin'),
}

function send<T>(opt: IOpt, data: any, token: string) {
  return axios(headerFactory(opt.url, opt.method, data, token))
    .then((r: AxiosResponse<T>) => r.data)
}

export default {
  auth,
  category,
  post,
  tag,
  send,
  health,
}