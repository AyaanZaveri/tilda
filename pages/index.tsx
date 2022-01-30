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
        Authorization: `Bearer BQDIl_QPeuYg0yJzKkgsh9lFoBHKrEPAPwgXtXPMTn4bFsIe1CkcNGItylRJ54mRY-b4HckuIZKeVVHlMw0Qkb86HZf9OxIhCh7h9MNmhly0UJRKUlXx1LkefDqJtgZrt3pvXOpHIV4CWe1vhy9-DdW4i180YflQsrB1QuraEewitD2d8aKq`,
      },
    }

    axios(config)
      .then((response) => {
        setData(response.data.tracks.items)
        console.log(response.data.tracks.items)
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
