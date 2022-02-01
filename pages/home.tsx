import React, { useState } from 'react'
import Tracks from '../components/Tracks'
import Input from '../components/Input'
import { signOut, useSession } from 'next-auth/react'

const Home = () => {
  const [trackTitle, setTrackTitle] = useState<string>('')
  const [data, setData] = useState<any>([])

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const { data: session, status } = useSession()

  console.log(session, status)

  //console.log(session)

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="flex flex-col items-center gap-3">
        <Input
          trackTitle={trackTitle}
          setTrackTitle={setTrackTitle}
          handleSubmit={handleSubmit}
        />

      </div>
      {data > 0 ? (
        <h1 className="ml-3 text-sm text-slate-500">
          Search results for: "{trackTitle}"
        </h1>
      ) : null}
      <Tracks data={data} />
    </div>
  )
}

export default Home
