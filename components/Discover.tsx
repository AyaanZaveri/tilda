import React from 'react'
import { IconCompass } from '@tabler/icons'

const Discover = ({ playlist }: any) => {
  return (
    <div className="ml-3 flex flex-col gap-3">
      <div className="inline-flex items-center gap-2 text-4xl font-bold text-slate-100">
        Discover
        <IconCompass className="mt-1 h-8 w-8" />
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-col h-48 w-48 rounded-lg items-center gap-3 bg-white">
          <span className='mt-3'>{playlist.name}</span>
        </div>
      </div>
    </div>
  )
}

export default Discover
