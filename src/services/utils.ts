const getParamsCreate = (obj: any) => {
  if (!obj) {
    return ''
  }
  const arr = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(`${key}=${obj[key]}`)
    }
  }
  return `?${arr.join('&')}`
}

const putParamsCreate = (obj: any) => {
  if (!obj) {
    return ''
  }
  const arr = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(obj[key])
    }
  }
  return `/${arr.join('/')}`
}

export const headerFactory = (url: string, method: string, data: any) => {
  const header = {
    method,
      url,
      json: true,
  }
  if (method === 'POST') {
    return Object.assign(header, {data})
  } else if (method === 'PUT') {
    return Object.assign(header, {
      url: `${url}${putParamsCreate(data)}`
    })
  }

  return Object.assign(header, {
    url: `${url}${getParamsCreate(data)}`
  })
}

export const extractTokenFromStorage = () => {
  const storage = window.localStorage.getItem('persist:auth')
  if (!storage) {
    return ''
  }
  try {
    const json = JSON.parse(storage)
    const token = json.token
    if (token) {
      return token.substr(1).slice(0, -1)
    } else {
      return ''
    }
  } catch (err) {
    console.error(err)
    return ''
  }
}
