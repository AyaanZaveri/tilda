import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })

  // If the token is valid.
  if (req.nextUrl.pathname.includes('/api/auth') || token) {
    // Continue to the app.
    return NextResponse.next()
  }

  // If the token is invalid.
  if (!token && req.nextUrl.pathname !== '/login') {
    // Redirect to the login page.
    return NextResponse.redirect('/login')
  }
}
