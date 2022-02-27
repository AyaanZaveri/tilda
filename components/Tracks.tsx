import React from 'react'
import Track from '../components/Track'

interface Props {
  tracks: Object[]
}

const Tracks = ({ tracks }: Props) => {
  return (
    <div className='w-full'>
      {tracks.map((item: any) => (
        <Track track={item} />
      ))}
    </div>
  )
}

export default Tracks
