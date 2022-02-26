import React, { useEffect } from 'react'
import { useState } from 'react'

interface CurrentlyPlaying {
  name: string
  album: {
    images: {
      url: string
    }
  }
  artists: {
    name: string
  }[]
}

const CurrentPlaying = ({ spotifyApi }) => {
  const [currentTrack, setCurrentTrack] = useState<CurrentlyPlaying>()

  const getCurrentTrack = () => {
    spotifyApi!.getMyCurrentPlayingTrack().then(
      function (data) {
        data.body ? setCurrentTrack(data.body.item) : ''
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }

  spotifyApi.getMyDevices()
  .then(function(data) {
    let availableDevices = data.body.devices;
    console.log(availableDevices);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  useEffect(() => {
    setInterval(() => {
      getCurrentTrack()
    }, 2000)
  }, [])

  console.log(currentTrack)

  return (
    <div>
      {currentTrack ? (
        <div className="fixed bottom-0 w-full border-t border-gray-800 bg-slate-900 p-5">
          <div className="flex flex-row items-center gap-3">
            <img
              className="w-14 rounded-md"
              src={currentTrack?.album.images[0].url}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-medium text-white">
                {currentTrack?.name}
              </span>
              <span className="text-sm font-light text-white">
                {currentTrack?.artists.map((artist) => artist.name).join(', ')}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CurrentPlaying
