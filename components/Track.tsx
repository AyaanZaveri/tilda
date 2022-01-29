import React from 'react'

interface Props {
  key: string
  track: string
}

const Track = ({ key, track }: Props) => {
  return (
    <div key={key} className="mt-2 flex w-80 flex-col rounded-lg border bg-white px-3 py-2 text-sm shadow-lg transition hover:bg-slate-50 hover:text-emerald-700">
      <span className="inline-flex font-medium text-emerald-900">{track.track_name}</span>
      <span className="font-normal text-emerald-500">{track.artist_name}</span>
    </div>
  )
}

export default Track
