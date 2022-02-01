import React from 'react'
import Track from '../components/Track'

interface Props {
  tracks: Object[]
}

const Tracks = ({ tracks }: Props) => {

  return (
    <div className="flex flex-row flex-wrap">
      {tracks.map((item: any) => (
        <Track track={item} />
      ))}
    </div>
  )
}

export default Tracks
