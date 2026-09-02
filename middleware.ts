import { NextRequest, NextResponse } from 'next/server'
import { readSessionToken } from '@/lib/auth-edge'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/signup' || pathname.startsWith('/signup/')) {
    // return new NextResponse(null, { status: 404, statusText: 'Not Found' })
    // return new NextResponse('This page no longer exists.', {
    //   status: 404,
    //   headers: { 'Content-Type': 'text/plain' },
    // })
    //   return NextResponse.json(
    //   { error: 'Signup endpoint disabled', code: 'FEATURE_DISABLED' },
    //   { status: 404 }
    // )
    // const html = `<h1>404 - Not Found</h1><p>Signups are currently disabled.</p>`

    // return new NextResponse(html, {
    //   status: 404,
    //   headers: { 'Content-Type': 'text/html' },
    // })
    if (pathname === '/signup' || pathname.startsWith('/signup/')) {
      return NextResponse.rewrite(new URL('/403', request.url), { status: 403 })
    }
  }

  const token = request.cookies.get('session')?.value ?? null

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  const session = await readSessionToken(token)

  if (!session) {
    const loginUrl = new URL('/login', request.url)
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
  matcher: ['/projects/:path*', '/signup/:path*', '/resume/more/:path*'],
}