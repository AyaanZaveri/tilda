import { getProviders, signIn } from 'next-auth/react'
import logo from '../public/tilda.svg'
import spotify from '../public/spotify.svg'

const Login = ({ providers }: any) => {
  return (
    <div className="flex h-screen items-center justify-center">
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="flex flex-col items-center gap-12">
          <img src={logo.src} alt="" className='w-64' />
          <button
            type="submit"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-lg inline-flex items-center bg-green-500 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2  focus:ring-offset-green-200 "
          >
            <img
              className="-ml-1 mr-2 h-5 w-5 opacity-90"
              src={spotify.src}
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
