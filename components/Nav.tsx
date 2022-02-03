import React from 'react'
interface Props {
  handleSubmit: any
  trackTitle: string
  setTrackTitle: any
  me: any
}
import { signOut } from 'next-auth/react'

const Nav = ({ handleSubmit, trackTitle, setTrackTitle, me }: Props) => {
  return (
    <div className="flex flex-row w-full ml-3 space-x-3">
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
    </div>
  )
}

export default Nav
