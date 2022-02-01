import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import Home from './home'

const App = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default App

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      session: await getSession(ctx),
    },
  }
}
