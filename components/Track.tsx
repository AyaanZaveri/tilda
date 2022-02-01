import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaPlay, FaPause } from 'react-icons/fa'

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
      className="flex h-16 w-full flex-row items-center gap-3 border bg-white px-3 text-sm shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
    >
      <img
        className="w-[2.5rem] rounded-md"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="flex flex-row items-center gap-3">
        {playing ? (
          <FaPause
            className="w-2 text-slate-800 hover:cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />
        ) : (
          <FaPlay
            className="w-2 text-slate-800 hover:cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />
        )}
        {track.explicit ? (
          <span className="mr-[-0.325rem] text-slate-800">🅴</span>
        ) : null}
        <span className="font-semibold text-slate-800">{track.name}</span>
        <span className="font-normal text-slate-500">
          {track.artists[0].name}
        </span>
        <span className="flex justify-end font-normal text-slate-500">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </span>
      </div>
    </div>
  )
}

export default Track
