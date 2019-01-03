import axios, { AxiosResponse } from 'axios'
import { headerFactory, optFactory } from './utils'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  console.log(error)
  if (error.response.status === 401) {
    // window.location.href = '/login'
    console.log('ssssssss')
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
  uptPostsList: optFactory('GET', 'tag/uptPostsList'),
}

const post = {
  create: optFactory('POST', 'post/create'),
  fetchPinned: optFactory('GET', 'post/fetchPinned'),
  fetchByCategory: optFactory('GET', 'post/fetchByCategory'),
  fetchById: optFactory('GET', 'post/fetchById'),
  deleteById: optFactory('GET', 'post/deleteById'),
}

function send<T>(opt: IOpt, data: any, token: string) {
  return axios(headerFactory(opt.url, opt.method, data, token))
    .then((r: AxiosResponse<T>) => r.data)
}

export default {
  auth,
  post,
  tag,
  send,
}