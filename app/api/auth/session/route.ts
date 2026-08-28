import { NextResponse } from 'next/server'
import { readSessionToken } from '@/lib/auth'

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const match = cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith('session='))
  const token = match ? decodeURIComponent(match.slice(8)) : null

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  const session = await readSessionToken(token)

  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  return NextResponse.json(
    { user: { id: session.userId, email: session.email, role: session.role } },
    { status: 200 }
  )
}
