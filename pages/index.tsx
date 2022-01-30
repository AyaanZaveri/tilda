import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Tracks from '../components/Tracks'
import Input from '../components/Input'

export default function Home() {
  const [trackTitle, setTrackTitle] = useState<string>('')
  const [data, setData] = useState<any>([])
  const [albumData, setAlbumData] = useState<any>([]);

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
    <div className="mt-3 flex flex-col items-center justify-center gap-3">
      <Input trackTitle={trackTitle} setTrackTitle={setTrackTitle} handleSubmit={handleSubmit} />
      <Tracks data={data} />
    </div>
  )
}
