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

export const headerFactory = (url: string, method: string, data: any, token: string) => {
  const header = {
    method,
      url,
      headers: {
        'Authorization': token,
      },
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

export const optFactory = (method: string, url: string) => ({
  method,
  url,
})