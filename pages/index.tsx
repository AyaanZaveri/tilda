import React, { useEffect, useState } from 'react'
import Home from './home'
import Login from './login'

const App = () => {
  const [authCode, setAuthCode] = useState<string>()

  return (
    <div>
      <Home />
    </div>
  )
}

export default App
