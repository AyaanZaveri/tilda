import React from 'react'
import { HomeIcon, MusicNoteIcon } from '@heroicons/react/outline'

const Sidebar = () => {
  return (
    <div className="h-sull flex flex-col border-r-2 border-gray-800 bg-gradient-to-bl from-slate-900 to-slate-800 px-28 pl-8">
      <div className="mt-5 flex flex-col gap-5">
        <div
          onClick={() => (location.href = 'http://localhost:3000/home')}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-50"
        >
          <HomeIcon className="h-6 w-6" />
          <span className="w-24">Home</span>
        </div>

        <div
          onClick={() => (location.href = 'http://localhost:3000/playlists')}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-50"
        >
          <MusicNoteIcon className="h-6 w-6" />
          <span className="w-24">Your Library</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
