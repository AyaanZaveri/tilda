import { HiHeart } from 'react-icons/hi'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Head from 'next/head'

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
  const [favorited, setFavorited] = useState<boolean>(false)

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
    const timer = setInterval(() => {
      getCurrentTrack()
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  console.log(currentTrack)

  const handleFavorite = () => {
    if (favorited) {
      localStorage.removeItem(currentTrack?.album.id.toString())
      setFavorited(false)
    } else {
      localStorage.setItem(
        currentTrack?.album.id.toString(),
        currentTrack?.album.id.toString()
      )
      setFavorited(true)
    }
  }

  useEffect(() => {
    if (localStorage.getItem(currentTrack?.album.id.toString())) {
      setFavorited(true)
    } else {
      setFavorited(false)
    }
  })

  return (
    <div>
      <Head>
        <title>{currentTrack?.name}</title>
      </Head>
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
              <div className='inline-flex items-center'>
                <span className="font-medium text-white hover:cursor-pointer hover:underline">
                  <a href={`/album/${currentTrack.album.id}`}>
                    {currentTrack?.name}
                  </a>
                </span>
                <div
                  onClick={handleFavorite}
                  className={`rounded-lg ml-2 ${
                    favorited ? 'text-rose-400' : 'text-slate-100'
                  } backdrop-blur transition-colors delay-150 hover:cursor-pointer hover:text-rose-300`}
                >
                  <HiHeart className="h-5 w-5" />
                </div>
              </div>

              <div className="inline-flex items-start">
                {currentTrack?.artists.map((artist, idx) => [
                  idx > 0 ? (
                    <span key={idx} className="text-sm font-light text-white">
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
