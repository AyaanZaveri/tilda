import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Props {
  key: string
  track: any
}

const Track = ({ key, track }: Props) => {

  const [albumData, setAlbumData] = useState<any>();

  const getAlbumData = (albumID:any) => {
    axios
      .get(
        `https://cors-anywhere-production-f183.up.railway.app/http://api.musixmatch.com/ws/1.1/album.get?album_id=${albumID}&apikey=${process.env.NEXT_PUBLIC_KEY}`
      )
      .then((res) => {
        const album = res.data.message.body.album.external_ids.spotify[0]
        //console.log(album)
        setAlbumData(album)
      })
      .catch((err) => console.log(err))
  }

  const getArtworkData = () => {
    axios
      .get(
        `https://open.spotify.com/oembed?url=http://open.spotify.com/album/${albumData}`
      )
      .then((res) => {
        const artwork = res.data.thumbnail_url
        console.log(artwork)
        return artwork
      })
      .catch((err) => console.log(err))
  }

  //useEffect(() => getAlbumData(track.album_id), [])
  //console.log(`https://open.spotify.com/oembed?url=http://open.spotify.com/album/${albumData}`)
  useEffect(() => getArtworkData(), [])

  console.log(albumData)

  //console.log(albumData)

  return (
    <div
      key={key}
      className="mt-2 flex h-48 w-80 flex-col rounded-lg border bg-white px-3 pt-2 text-sm shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
    >
      <span className="inline-flex font-semibold text-slate-900">
        {track.track_name}
      </span>
      <span className="font-normal text-slate-500">{track.artist_name}</span>
    </div>
  )
}

export default Track
