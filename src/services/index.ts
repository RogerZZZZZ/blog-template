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

const auth = {
  login: (obj: any) => axios.post('auth/login', obj).then(r => r),
}

const tag = {
  create: (obj: any) => axios.post('tag/create', obj).then(r => r),
}

export default {
  auth,
  tag,
}