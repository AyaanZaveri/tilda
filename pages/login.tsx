import SpotifyWebApi from 'spotify-web-api-node'
import React from 'react'

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=b1bdc26f229a49f49b5b87fb397e12a6&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <a href={AUTH_URL}>
        <button
          type="submit"
          className="focus:ring-green inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm  font-medium text-green-500 ring-green-300 transition hover:bg-green-50 hover:text-green-500 focus:border-green-500 focus:outline-none focus:ring active:bg-green-100 active:text-green-500"
        >
          <img
            className="-ml-1 mr-2 h-5 w-5 opacity-90"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/336px-Spotify_logo_without_text.svg.png"
            alt="Spotify Logo"
          />
          Login To Spotify
        </button>
      </a>
    </div>
  )
}

export default Login
