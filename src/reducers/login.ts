import { LoginAction } from './../actions/login'

export interface ILoginState {
  token: string,
  login: boolean,
}

export default function loginReducer (state: ILoginState, action: LoginAction) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        login: true,
      }
    case 'logout':
      return {
        ...state,
        login: false,
        token: null,
      }
    default:
      return state
  }
}