import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaPlay } from 'react-icons/fa';

interface Props {
  key: string
  track: any
}

const Track = ({ key, track }: Props) => {
  return (
    <div
      key={key}
      className="flex h-16 w-full flex-row items-center border bg-white px-3 text-sm shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
    >
      <div className="flex flex-row gap-3 items-center">
        <img
          className="w-[2.5rem] rounded-md"
          src={track.album.images[0].url}
          alt=""
        />
        <FaPlay className='w-2 text-slate-800' />
        <span className="font-semibold text-slate-800">{track.name}</span>
        <span className="font-normal text-slate-500">
          {track.artists[0].name}
        </span>
      </div>
    </div>
  )
}

export default Track
