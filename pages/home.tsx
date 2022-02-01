import React, { useEffect, useState } from 'react'
import Tracks from '../components/Tracks'
import Nav from '../components/Nav'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'

const Home = () => {
  const spotifyApi = new SpotifyWebApi()

  const [trackTitle, setTrackTitle] = useState<string>('')
  const [userData, setUserData] = useState<any>({})

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const { data: session, status } = useSession()

  console.log(session as any, status)

  useEffect(() => {
    if (session) {
      setUserData(session.user)
    }
  }, [session])

  //console.log(userData.accessToken)

  spotifyApi.setAccessToken(userData.accessToken)

  spotifyApi.searchTracks('Positions')
  .then(function(data) {
    console.log('Search by "Positions"', data.body);
  }, function(err) {
    console.error(err);
  });

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="flex flex-col items-center gap-3">
        <Nav
          trackTitle={trackTitle}
          setTrackTitle={setTrackTitle}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Home
