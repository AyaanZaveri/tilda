import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useAuth = (authCode: Object) => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const [expiresIn, setExpiresIn] = useState<number>(0)
  useEffect(() => {
    axios
      .post('http://localhost:3001/login', {
        authCode,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, '', '/')
      })
  })
}

export default useAuth
