import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { verifyPassword, createSessionToken } from '@/lib/auth'
import { ensureUsersTable } from '@/lib/auth-schema'

export async function POST(request: Request) {
  await ensureUsersTable()
  const body = await request.json().catch(() => ({}))

  const { email, password } = body as {
    email?: string
    password?: string
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required.' },
      { status: 400 }
    )
  }

  const normalizedEmail = String(email).trim().toLowerCase()

  const { rows } = await sql`
    SELECT id, email, password_hash, name, role FROM users WHERE email = ${normalizedEmail} LIMIT 1
  `

  const user = rows[0]

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 400 }
    )
  }

  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 400 }
    )
  }

  const token = await createSessionToken(Number(user.id), user.email, user.role)

  const response = NextResponse.json(
    { user: { id: Number(user.id), email: user.email, name: user.name, role: user.role } },
    { status: 200 }
  )

  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}
