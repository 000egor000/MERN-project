import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'

const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState(null)
  const login = useCallback((token, userId, email) => {
    setToken(token)
    setUserId(userId)
    setEmail(email)
    localStorage.setItem(
      'user',
      JSON.stringify({ token: token, userId: userId, email: email })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setEmail(null)
    localStorage.removeItem('user')
  }, [])

  useEffect(() => {
    const data = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null

    if (!!data) {
      const { token, userId, email } = data
      if (token && userId) login(token, userId, email)
    }
  }, [login, logout, token, userId, email])

  return { token, userId, login, logout, email }
}
export default useAuth
