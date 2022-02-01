import React from 'react'
interface Props {
  handleSubmit: any
  trackTitle: string
  setTrackTitle: any
}

const Input = ({ handleSubmit, trackTitle, setTrackTitle }: Props) => {

  return (
    <div>
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

export default Input
