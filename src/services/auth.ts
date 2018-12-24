import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

axios.interceptors.response.use(response => {
  // Do something with response data
  console.log(response.status)
  return response;
}, error => {
  if (error.response.status === 401) {
    console.log('fail fail')
    if (process.env.NODE_ENV === 'production') {
      window.location.reload();
    } else {
      alert('Login Error');
    }
  }
});

const auth = {
  login: (obj: any) => axios.post('auth/login', obj).then(r => r),
}

export default auth