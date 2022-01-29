import React from 'react'
import Track from '../components/Track'

interface Props {
  data: Object[]
}

const Tracks = ({ data }: Props) => {
  return (
    <div>
      {data.map((item: any) => (
        <Track key={item.track.track_id} track={item.track} />
      ))}
    </div>
  )
}

export default Tracks
