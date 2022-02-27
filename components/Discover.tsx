import React, { useEffect, useState } from 'react'
import { IconCompass } from '@tabler/icons'

const Discover = ({ spotifyApi, name }: any) => {
  const [playlists, setPlaylists] = useState<any>([])

  const getPlaylists = () => {
    spotifyApi.getUserPlaylists('vrmatmz7epknohvbr7clthcnu').then(
      function (data) {
        setPlaylists(data.body.items)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }

  useEffect(() => {
    getPlaylists()
  }, [])

  console.log(playlists)
  playlists.map((playlist: any) => console.log(playlist.images[0]?.url))

  return (
    <div className="ml-3 flex flex-col gap-5">
      <div className="inline-flex items-center gap-2 text-4xl font-bold text-slate-100">
        Welcome Back, {name}!
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        {playlists.map((playlist: any) => (
          <div className="flex h-48 w-48 flex-col gap-3 rounded-lg bg-slate-500">
            <img
              src={playlist.images[0] ? playlist.images[0]?.url : null}
              alt=""
              className={`absolute h-[12rem] w-[12rem] rounded-lg ${
                playlist.images[0]
                  ? ''
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              }`}
            />
            <span className="z-10 inline-flex h-full w-full items-end justify-center rounded-lg bg-gradient-to-t from-slate-700 p-3 font-bold text-white">
              {playlist.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Discover
