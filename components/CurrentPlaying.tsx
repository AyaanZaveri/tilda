import React, { useEffect } from 'react'
import { useState } from 'react'

interface CurrentlyPlaying {
  name: string
  album: {
    id: string
    images: {
      url: string
    }
  }
  artists: {
    name: string
    id: string
  }[]
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
    setTimeout(() => {
      getCurrentTrack()
    }, 3000)
  })

  // console.log(currentTrack)

  return (
    <div>
      {currentTrack ? (
        <div className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-slate-900 bg-opacity-75 p-5 backdrop-blur">
          <div className="flex flex-row items-center gap-3">
            <a href={`/album/${currentTrack.album.id}`}>
              <img
                className="w-14 rounded-md shadow-2xl transition-all hover:brightness-110"
                src={currentTrack?.album.images[0].url}
                alt=""
              />
            </a>
            <div className="flex flex-col">
              <span className="font-medium text-white hover:cursor-pointer hover:underline">
                <a href={`/artist/${currentTrack.album.id}`}>
                  {currentTrack?.name}
                </a>
              </span>

              <div className="inline-flex items-start">
                {currentTrack?.artists.map((artist, idx) => [
                  idx > 0 ? (
                    <span className="text-sm font-light text-white">
                      ,&nbsp;
                    </span>
                  ) : (
                    ''
                  ),

                  <span className="text-sm font-light text-white transition-all hover:cursor-pointer hover:underline">
                    <a href={`/artist/${artist.id}`}>{artist.name}</a>
                  </span>,
                ])}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CurrentPlaying
