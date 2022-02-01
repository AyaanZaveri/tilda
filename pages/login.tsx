import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }: any) => {
  return (
    <div className="flex h-screen items-center justify-center">
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            type="submit"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="focus:ring-green inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-sm  font-medium text-green-500 ring-green-300 transition hover:bg-green-50 hover:text-green-500 focus:border-green-500 focus:outline-none focus:ring active:bg-green-100 active:text-green-500"
          >
            <img
              className="-ml-1 mr-2 h-5 w-5 opacity-90"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/336px-Spotify_logo_without_text.svg.png"
              alt="Spotify Logo"
            />
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
