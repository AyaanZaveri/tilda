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
        `https://cors-anywhere-production-f183.up.railway.app/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.NEXT_PUBLIC_KEY}`
      )
      .then((res) => {
        const tracklist = res.data.message.body.track_list
        console.log(tracklist)
        setData(tracklist)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    getData()
  }

  return (
    <div className="mt-3 flex flex-col items-center justify-center gap-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Track..."
          onChange={(e) => setTrackTitle(e.target.value)}
          value={trackTitle}
          className="w-72 rounded-md border bg-slate-50 p-2 text-slate-800 ring-slate-300 transition placeholder:text-slate-500 hover:bg-slate-50 focus:border-slate-500 focus:outline-none focus:ring active:bg-slate-200"
          autoComplete="off"
        />
      </form>
      <Tracks data={data} />
    </div>
  )
}
