import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshToken } = await spotifyApi.refreshAccessToken()
    console.log('refreshToken:', refreshToken)

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpiresAt: Date.now() + refreshToken.expires_in * 1000,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'Refresh token failed',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial Sign-In when there is no accessToken or refreshToken
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresIn: account.expires_at * 1000,
          userName: account.providerAccountId,
        }
      }

      // Returning the previous token if the accessToken is still valid.
      if (Date.now() < token.expiresIn) {
        console('Token is still valid!')
        return token
      }

      // If accessToken is expired, refresh it.
      console('Token is not valid anymore!')
      return await refreshAccessToken(token)
    },

    async session(session, token) {
      if (token) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username
      }

      return session
    },
  },
})
