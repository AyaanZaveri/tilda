import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

interface Props {
  userName: any
  userImage: any
}

const UserInfo = ({ userName, userImage }: Props) => {
  return (
    <div className="m-3">
      <button
        className="flex items-center gap-2 rounded-full bg-slate-800 p-0.5"
        type="button"
        data-testid="user-widget-link"
        aria-expanded="false"
      >
        <img
          className="h-7 w-7 rounded-full"
          aria-hidden="false"
          draggable="false"
          loading="eager"
          src={userImage}
          alt={userName}
        />
        <span className="text-white font-medium" dir="auto" data-testid="user-widget-name">
          {userName}
        </span>
        <ChevronDownIcon className='w-4 h-4 text-white mr-2' />
      </button>
    </div>
  )
}

export default UserInfo
