import { NextRequest, NextResponse } from 'next/server'
import { readSessionToken } from '@/lib/auth-edge'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value ?? null

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  const session = await readSessionToken(token)

  if (!session) {
    const loginUrl = new URL('/login', request.nextUrl.origin + '/login')
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: request.nextUrl.protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/projects/:path*'],
}
