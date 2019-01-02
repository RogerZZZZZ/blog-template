import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

// const key = 'Authorization'
// axios.defaults.headers.common[key] = useMappedState(tokenState)

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

const tag = {
  create: {
    method: 'POST',
    url: 'tag/create',
  }
}

const OptsFactory = (url: string, method: string, data: any, token: string) => ({
  method,
  url,
  data,
  headers: {
    'Authorization': token,
  },
  json: true,
})

const requestFactory = (opt: IOpt, data: any, token: string) => {
  return axios(OptsFactory(opt.url, opt.method, data, token)).then(r => r)
}

export default {
  auth,
  tag,
  requestFactory,
}