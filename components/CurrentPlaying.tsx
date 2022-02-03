import React from 'react'
import { useState } from 'react'

const CurrentPlaying = ({ spotifyApi }) => {
  const [currentTrack, setCurrentTrack] = useState<string>('')

  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      console.log('Now playing: ' + data.body.item.name)
      data.body.item ? setCurrentTrack(data.body.item.name) : null
    },
    function (err) {
      console.log('Something went wrong!', err)
    }
  )

  return (
    <div>
      <span className='text-white'>Currently playing {currentTrack}</span>
    </div>
  )
}

export default CurrentPlaying
