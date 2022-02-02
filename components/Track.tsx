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
      className="flex h-16 w-full flex-row items-center rounded-md gap-3 px-3 text-sm shadow-sm transition hover:bg-white text-white hover:text-slate-700"
    >
      <img
        className="w-[2.5rem] rounded-md"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="flex flex-row items-center gap-3">
        {playing ? (
          <FaPause
            className="w-2  hover:cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />
        ) : (
          <FaPlay
            className="w-2  hover:cursor-pointer"
            onClick={() => setPlaying(!playing)}
          />
        )}
        {track.explicit ? (
          <span className="mr-[-0.325rem] ">🅴</span>
        ) : null}
        <span className="font-semibold ">{track.name}</span>
        <span className="font-normal">
          {track.artists[0].name}
        </span>
        <span className="flex justify-end font-normal">
          {millisToMinutesAndSeconds(track.duration_ms)}
        </span>
      </div>
    </div>
  )
}

export default Track
