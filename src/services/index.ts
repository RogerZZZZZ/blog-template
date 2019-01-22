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
  login: (obj: any) => axios.post('auth/login', obj).then(r => r),
}

const tag = {
  create: optFactory('POST', 'tag/create'),
  fetchAll: optFactory('GET', 'tag/fetchAll'),
  updateTag: optFactory('POST', 'tag/update'),
  uptPostsList: optFactory('GET', 'tag/uptPostsList'),
}

const post = {
  create: optFactory('POST', 'post/create'),
  fetchPinned: optFactory('GET', 'post/fetchPinned'),
  fetchAll: optFactory('GET', 'post/fetchAll'),
  fetchByCategory: optFactory('GET', 'post/fetchByCategory'),
  fetchById: optFactory('GET', 'post/fetchById'),
  deleteById: optFactory('GET', 'post/deleteById'),
  fetchByIds: optFactory('GET', 'post/fetchByIds'),
}

const category = {
  create: optFactory('POST', 'category/create'),
  fetchAll: optFactory('GET', 'category/fetchAll'),
  fetchById: optFactory('GET', 'category/fetchById'),
  deleteById: optFactory('GET', 'category/deleteById'),
  uptCategory: optFactory('POST', 'category/update'),
  uptPostsList: optFactory('GET', 'category/uptPostsList'),
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
}