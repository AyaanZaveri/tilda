import React, { useEffect, useState } from 'react'
import Tracks from '../components/Tracks'
import Nav from '../components/Nav'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
import Sidebar from '../components/Sidebar'
import Discover from '../components/Discover'
import CurrentPlaying from '../components/CurrentPlaying'

const Home = () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  })

  const [trackTitle, setTrackTitle] = useState<string>('')
  const [userData, setUserData] = useState<any>()
  const [me, setMe] = useState<any>({})
  const [tracks, setTracks] = useState<any>([])
  const [playlist, setPlaylist] = useState<any>([])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    searchTracks()
  }

  const { data: session, status } = useSession()

  const sessionUser = session ? session.user : null

  spotifyApi.setAccessToken(sessionUser ? sessionUser['accessToken'] : null)

  const searchTracks = () => {
    trackTitle && me && session
      ? spotifyApi.searchTracks(trackTitle, { market: 'US' }).then(
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

  useEffect(() => {
    getMe()
  }, [userData])

  //Live Input
  //useEffect(() => getTracks(), [trackTitle])

  return (
    <div>
      <div className="flex flex-row">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="ml-72 mt-3 flex w-9/12 flex-col gap-3">          
          <Nav
            trackTitle={trackTitle}
            setTrackTitle={setTrackTitle}
            handleSubmit={handleSubmit}
            me={me}
          />
          <Tracks tracks={tracks} />
          {tracks.length == 0 ? (
            <Discover name={me.display_name} spotifyApi={spotifyApi} />
          ) : null}
        </div>
        <CurrentPlaying spotifyApi={spotifyApi} />
      </div>
      {/* <UserInfo
          userName={me.display_name}
          userImage={me.images ? me.images[0].url : null}
        /> */}
    </div>
  )
}

export default Home
