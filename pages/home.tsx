import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Tracks from '../components/Tracks'
import Input from '../components/Input'
import Login from './login'

const Home = () => {
  const [trackTitle, setTrackTitle] = useState<string>('')
  const [data, setData] = useState<any>([])
  const [code, setCode] = useState<string>()

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="flex flex-col items-center">
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