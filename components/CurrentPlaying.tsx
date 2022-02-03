import React from 'react'
import { useState } from 'react'

const CurrentPlaying = ({ spotifyApi }) => {
  const [currentTrack, setCurrentTrack] = useState<string>('')

  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      data.body ? setCurrentTrack(data.body.item.name) : ''
    },
    function (err) {
      console.log('Something went wrong!', err)
    }
  )

  return (
    <div className='w-full bg-white flex justify-end'>
      <span className='text-black'>Currently playing {currentTrack}</span>
    </div>
  )
}

export default CurrentPlaying
