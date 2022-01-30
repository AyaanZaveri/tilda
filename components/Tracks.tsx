import React from 'react'
import Track from '../components/Track'

interface Props {
  data: Object[]
}

const Tracks = ({ data }: Props) => {

  return (
    <div className="flex flex-row flex-wrap">
      {data.map((item: any) => (
        <Track key={item.id} track={item} />
      ))}
    </div>
  )
}

export default Tracks
