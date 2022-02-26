import React from 'react'
interface Props {
  handleSubmit: any
  trackTitle: string
  setTrackTitle: any
  me: any
}
import { signOut } from 'next-auth/react'
import UserInfo from './UserInfo'

const Nav = ({ handleSubmit, trackTitle, setTrackTitle, me }: Props) => {
  console.log(me)
  return (
    <div className="ml-3 flex w-full flex-row items-center space-x-3">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Track..."
          onChange={(e) => setTrackTitle(e.target.value)}
          value={trackTitle}
          className="w-96 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
          autoComplete="off"
        />
      </form>
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
      >
        Logout
      </button>
      <div>
        <UserInfo userImage={me.images ? me.images[0].url : null} userName={me.display_name ? me.display_name : null} />
      </div>
    </div>
  )
}

export default Nav
