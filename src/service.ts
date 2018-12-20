import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

const auth = {
  login: (obj: any) => axios.post('auth/login', obj).then(r => r),
}

export default {
  auth,
}