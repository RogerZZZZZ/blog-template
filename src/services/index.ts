import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  console.log(error)
  if (error.response.status === 401) {
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

const optFactory = (method: string, url: string) => ({
  method,
  url,
})

const tag = {
  create: optFactory('POST', 'tag/create'),
  fetchAll: optFactory('GET', 'tag/fetchAll')
}

const headerFactory = (url: string, method: string, data: any, token: string) => ({
  method,
  url,
  data,
  headers: {
    'Authorization': token,
  },
  json: true,
})

function send<T>(opt: IOpt, data: any, token: string) {
  return axios(headerFactory(opt.url, opt.method, data, token))
    .then((r: AxiosResponse<T>) => r.data)
}

export default {
  auth,
  tag,
  send,
}