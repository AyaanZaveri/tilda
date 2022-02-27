import { useSession } from 'next-auth/react'
import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const PersonInfo = () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  })

  const { data: session, status } = useSession()

  const sessionUser = session ? session.user : null

  spotifyApi.setAccessToken(sessionUser ? sessionUser['accessToken'] : null)

  spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3').then(
    function (data) {
      console.log('Artist information', data.body)
    },
    function (err) {
      console.error(err)
    }
  )

  return <div></div>
}

export default PersonInfo
