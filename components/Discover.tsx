import React, { useEffect, useState } from 'react'
import { IconCompass } from '@tabler/icons'

const Discover = ({ spotifyApi }: any) => {
  const charts = ['37i9dQZEVXbMDoHDwVN2tF', '37i9dQZEVXbKj23U1GF4IR']

  const [playlist, setPlaylist] = useState<any>([])

  return (
    <div className="ml-3 flex flex-col gap-5">
      <div className="inline-flex items-center gap-2 text-4xl font-bold text-slate-100">
        Discover
        <IconCompass className="mt-1 h-8 w-8" />
      </div>
      <div className="flex flex-row flex-wrap">
        {charts.map((chart: any) => {
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
        })}
      </div>
    </div>
  )
}

export default Discover
