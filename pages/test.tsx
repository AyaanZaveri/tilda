import { useSession, signIn, signOut } from 'next-auth/react'

const Test = () => {
  const { data: session } = useSession()

  return <div>{session}</div>
}

export default Test
