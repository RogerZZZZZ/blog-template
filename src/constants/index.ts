const createConstants = (...contants: string[]) => {
  return contants.reduce((acc, el) => {
    acc[el] = el
    return acc
  }, {})
}

export const AuthCons = createConstants(
  'AUTH_FAIL',
  'AUTH_SUCCESS',
  'USER_LOGOUT',
  'USER_LOGIN',
)