function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(res)
  }
  return res.json()
}

export const postRequest = async (url, body) => {
  const params = {
    method: 'POST',
    body: JSON.stringify({
      ...body,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
  const data = await fetch(`${url}`, params).then((res) => {
    return handleResponse(res)
  })

  return data
}

export const deleteRequest = async (url) => {
  let authorize
  if (!!sessionStorage.getItem('access_token')) {
    authorize = {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    }
  }
  let params = {
    method: 'DELETE',
    headers: {
      ...authorize,
    },
  }
  const data = await fetch(`${url}`, params).then((res) => {
    return handleResponse(res)
  })

  return data
}

export const putRequest = async (url, body) => {
  let authorize
  if (!!sessionStorage.getItem('access_token')) {
    authorize = {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    }
  }
  const params = {
    method: 'PUT',
    body: JSON.stringify({
      ...body,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...authorize,
    },
  }
  const data = await fetch(`${url}`, params).then((res) => {
    return handleResponse(res)
  })

  return data
}
