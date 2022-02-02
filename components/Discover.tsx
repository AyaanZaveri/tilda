import React, { useEffect, useState } from 'react'
import { IconCompass } from '@tabler/icons'

const Discover = ({ spotifyApi }: any) => {
  const charts = ['37i9dQZEVXbMDoHDwVN2tF', '37i9dQZEVXbKj23U1GF4IR']

  const [playlist, setPlaylist] = useState<any>([])

  charts.map((chart: any) => {
    const getPlaylist = () => {
      spotifyApi.getPlaylist(chart).then(
        function (data) {
          console.log('Some information about this playlist', data.body)
          setPlaylist(data.body)
        },
        function (err) {
          console.log('Something went wrong!', err)
        }
      )
    }

    useEffect(() => {
      getPlaylist()
    }, [])
  })
  return (
    <div className="ml-3 flex flex-col gap-5">
      <div className="inline-flex items-center gap-2 text-4xl font-bold text-slate-100">
        Discover
        <IconCompass className="mt-1 h-8 w-8" />
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="flex h-48 w-48 flex-col gap-3 rounded-lg bg-slate-500">
          <img
            src={playlist.images ? playlist.images[0].url : null}
            alt=""
            className="rounded-lg"
          />
          <span className="mb-3 inline-flex h-full w-full items-end justify-center font-bold text-white">
            {playlist.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Discover
