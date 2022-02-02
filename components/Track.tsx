import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaPlay, FaPause } from 'react-icons/fa'
import useSound from 'use-sound'
import SpotifyWebApi from 'spotify-web-api-node'

interface Props {
  track: any
}

const Track = ({ track }: Props) => {
  const [playing, setPlaying] = useState<boolean>(false)

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000)
    var seconds: any = ((millis % 60000) / 1000).toFixed(0)
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  return (
    <div
      key={track}
      className="flex h-16 w-full flex-row items-center gap-3 rounded-md from-slate-50 to-slate-300 px-3 text-sm text-white shadow-sm transition hover:bg-gradient-to-br hover:text-slate-700"
    >
      <img
        className="w-[2.5rem] rounded-md"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="flex flex-row items-center gap-3">
        {playing ? (
          <FaPause
            className="w-2 hover:cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />
        ) : (
          <FaPlay
            className="w-2 hover:cursor-pointer"
            onClick={() => console.log(track.preview_url)}
          />
        )}
        {track.explicit ? <span className="mr-[-0.325rem] ">🅴</span> : null}
        <span className="font-semibold ">{track.name}</span>
        <span className="font-normal">{track.artists[0].name}</span>
        <span className="flex justify-end font-normal">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </span>
      </div>
    </div>
  )
}

export default Track
