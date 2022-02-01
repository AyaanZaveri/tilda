import React, { useState } from 'react'
import Tracks from '../components/Tracks'
import Input from '../components/Input'
import { signOut, useSession } from 'next-auth/react'

const Home = () => {
  const { data: session, status } = useSession()

  console.log(session)

  return (
    <div className="mt-3 flex flex-col justify-center items-center h-screen gap-3">
      {status}
    </div>
  )
}

export default Home
