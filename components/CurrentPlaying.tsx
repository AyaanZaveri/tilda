import React, { useEffect } from 'react'
import { useState } from 'react'

interface CurrentlyPlaying {
  name: string
}

const CurrentPlaying = ({ spotifyApi }) => {
  const [currentTrack, setCurrentTrack] = useState<CurrentlyPlaying>()

  const getCurrentTrack = () => {
    spotifyApi.getMyCurrentPlayingTrack().then(
      function (data) {
        data.body ? setCurrentTrack(data.body.item) : ''
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }

  useEffect(() => {
    setInterval(() => {
      getCurrentTrack()
    }, 1000)
  }, [])

  console.log(currentTrack)

  return (
    <div className="fixed bottom-0 w-full border-t border-gray-800 bg-slate-900 p-5">
      <span className="text-white">{currentTrack?.name}</span>
    </div>
  )
}

export default CurrentPlaying
