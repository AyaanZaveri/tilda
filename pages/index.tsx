import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Tracks from '../components/Tracks'

export default function Home() {
  const [trackTitle, setTrackTitle] = useState('havana')
  const [data, setData] = useState<any>([])

  const getData = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.NEXT_PUBLIC_KEY}`
      )
      .then((res) => {
        setData(res.data.message.body.track_list)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(data)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    getData()
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-3">
      <form onSubmit={handleSubmit}>
        <input className='border rounded-sm px-2' onChange={(e) => setTrackTitle(e.target.value)} />
      </form>
      <Tracks data={data} />
    </div>
  )
}
