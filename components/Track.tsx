import React from 'react'

interface Props {
  key: string
  track: any
}

const Track = ({ key, track }: Props) => {
  return (
    <div
      key={key}
      className="mt-2 flex w-80 h-48 flex-col rounded-lg border bg-white px-3 pt-2 text-sm shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
    >
      <span className="inline-flex font-semibold text-slate-900">
        {track.track_name}
      </span>
      <span className="font-normal text-slate-500">{track.artist_name}</span>
    </div>
  )
}

export default Track
