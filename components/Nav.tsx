import React from 'react'
interface Props {
  handleSubmit: any
  trackTitle: string
  setTrackTitle: any
}
import { signOut } from 'next-auth/react'

const Nav = ({ handleSubmit, trackTitle, setTrackTitle }: Props) => {
  return (
    <div className='flex flex-row gap-3'>
      <button
        type="button"
        onClick={() => signOut()}
        className="focus:ring-green inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm  font-medium text-green-500 ring-green-300 transition hover:bg-green-50 hover:text-green-500 focus:border-green-500 focus:outline-none focus:ring active:bg-green-100 active:text-green-500"
      >
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Track..."
          onChange={(e) => setTrackTitle(e.target.value)}
          value={trackTitle}
          className="w-72 rounded-md border bg-white p-2 text-slate-800 ring-slate-300 transition placeholder:text-slate-500 hover:bg-slate-50 focus:border-slate-500 focus:outline-none focus:ring active:bg-slate-200"
          autoComplete="off"
        />
      </form>
    </div>
  )
}

export default Nav
