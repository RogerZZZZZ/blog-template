import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, error => {
  if (error.response.status === 401) {
    if (process.env.NODE_ENV === 'production') {
      window.location.reload();
    }
  }
});

const auth = {
  login: (obj: any) => axios.post('auth/login', obj).then(r => r),
}

export default auth