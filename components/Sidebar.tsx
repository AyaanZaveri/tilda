import React from 'react'
import { HomeIcon } from '@heroicons/react/outline'

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col border-r-2 border-gray-800 bg-gray-900 px-28 pl-8">
      <div className="mt-8 flex flex-col gap-5">
        <div onClick={() => location.href="http://localhost:3000/home"} className="text-sm cursor-pointer inline-flex items-center gap-2 font-medium text-slate-50">
          <HomeIcon className="h-6 w-6" />
          Home
        </div>

        <div className="text-sm inline-flex items-center gap-2 font-medium text-slate-50">
          <HomeIcon className="h-6 w-6" />
          Library
        </div>
      </div>
    </div>
  )
}

export default Sidebar
