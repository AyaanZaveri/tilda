import React from 'react'
import Track from '../components/Track'

interface Props {
  tracks: Object[]
}

const Tracks = ({ tracks }: Props) => {

  return (
    <div className="flex flex-row flex-wrap">
      {tracks.map((item: any) => (
        <Track key={item.id} track={item} />
      ))}
    </div>
  )
}

export default Tracks
