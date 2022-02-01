import React, { useEffect, useState } from 'react'
import Tracks from '../components/Tracks'
import Nav from '../components/Nav'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'

const Home = () => {
  const spotifyApi = new SpotifyWebApi()

  const [trackTitle, setTrackTitle] = useState<string>('')
  const [userData, setUserData] = useState<any>({})
  const [tracks, setTracks] = useState<any>([])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    getTracks()
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

  const getTracks = () => {
    trackTitle
      ? spotifyApi.searchTracks(trackTitle).then(
          function (data) {
            console.log(`Search by ${trackTitle}`, data.body)
            setTracks(data.body.tracks?.items)
          },
          function (err) {
            console.error(err)
          }
        )
      : null
  }

  //Live Input
  //useEffect(() => getTracks(), [trackTitle])

  console.log(tracks)

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="flex flex-col items-center gap-3">
        <Nav
          trackTitle={trackTitle}
          setTrackTitle={setTrackTitle}
          handleSubmit={handleSubmit}
        />
        <Tracks tracks={tracks} />
      </div>
    </div>
  )
}

export default Home
