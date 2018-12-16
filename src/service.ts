import axios from 'axios'

axios.defaults.baseURL = 'api';

const auth = {
  login: (obj: any) => axios.post('auth/login', obj).then(r => r.data),
}

export default {
  auth,
}