const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/',
    clientId: 'b1bdc26f229a49f49b5b87fb397e12a6',
    clientSecret: '7723acba7cf548e28cd333bef2eff41d',
  })

  spotifyApi.authorizationCodeGrant(code).then((data) => {
    res
      .json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
      .catch(() => {
        res.sendStatus(400)
      })
  })
})

app.listen(3001)