import React, { useEffect, useState } from 'react'
import Home from './home'
import Login from './login'

const App = () => {
  const [code, setCode] = useState<string>()

  if (typeof window !== 'undefined') {
    const codeToken = new URLSearchParams(window.location.search).get('code')
    useEffect(() => {
      codeToken ? setCode(codeToken) : null
    })
  }

  return (
    <div>
      {code ? <Home /> : <Login />}
    </div>
  )
}

export default App
