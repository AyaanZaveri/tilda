import React, { useEffect, useState } from 'react'
import Tracks from '../components/Tracks'
import Nav from '../components/Nav'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
import Sidebar from '../components/Sidebar'
import UserInfo from '../components/UserInfo'

const Home = () => {
  const spotifyApi = new SpotifyWebApi()

  const [trackTitle, setTrackTitle] = useState<string>('')
  const [userData, setUserData] = useState<any>({})
  const [me, setMe] = useState<any>({})
  const [tracks, setTracks] = useState<any>([])

  useEffect(() => {
    spotifyApi.setAccessToken(userData.accessToken)
  }, [userData])

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

  const getMe = () => {
    spotifyApi.getMe().then(
      function (data) {
        console.log('Some information about the authenticated user', data.body)
        setMe(data.body)
      },
      function (err) {
        console.log('Something went wrong!', err)
      }
    )
  }

  //Live Input
  //useEffect(() => getTracks(), [trackTitle])

  useEffect(() => getMe(), [userData])

  console.log(tracks)

  return (
    <div className="flex flex-row gap-3">
      <Sidebar />
      <div className="mt-3 flex flex-col gap-3">
        <Nav
          trackTitle={trackTitle}
          setTrackTitle={setTrackTitle}
          handleSubmit={handleSubmit}
        />
        <Tracks tracks={tracks} />
      </div>
      <div className="mt-3 flex w-full items-start justify-end">
          <UserInfo
            userName={me.display_name}
            userImage={me.images ? me.images[0].url : null}
          />
      </div>
    </div>
  )
}

export default Home
