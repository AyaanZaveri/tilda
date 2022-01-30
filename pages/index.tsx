import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Tracks from '../components/Tracks'
import Input from '../components/Input'

export default function Home() {
  const [trackTitle, setTrackTitle] = useState<string>('')
  const [data, setData] = useState<any>([])

  const getData = () => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${trackTitle}&type=track`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY}`,
      },
    }

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })

    axios(config)
      .then((response) => {
        setData(response.data.tracks.items)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    getData()
  }

  console.log(data)

  return (
    <div className="mt-3 flex flex-col items-center justify-center gap-3">
      <Input
        trackTitle={trackTitle}
        setTrackTitle={setTrackTitle}
        handleSubmit={handleSubmit}
      />
      <Tracks data={data} />
    </div>
  )
}
