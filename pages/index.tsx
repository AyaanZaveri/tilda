import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Tracks from '../components/Tracks'

export default function Home() {
  const [trackTitle, setTrackTitle] = useState('havana')
  const [data, setData] = useState(null)

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Tracks data={data} />
    </div>
  )
}
