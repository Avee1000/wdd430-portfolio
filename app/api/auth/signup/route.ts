import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { hashPassword, createSessionToken } from '@/lib/auth'
import { ensureUsersTable } from '@/lib/auth-schema'

export async function POST(request: Request) {
  await ensureUsersTable()
  const body = await request.json().catch(() => ({}))

  const { email, password, name } = body as {
    email?: string
    password?: string
    name?: string
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required.' },
      { status: 400 }
    )
  }

  const normalizedEmail = String(email).trim().toLowerCase()

  const { rows } = await sql`
    SELECT id FROM users WHERE email = ${normalizedEmail} LIMIT 1
  `

  if (rows.length > 0) {
    return NextResponse.json(
      { error: 'An account with this email already exists.' },
      { status: 400 }
    )
  }

  const passwordHash = await hashPassword(password)

  const { rows: inserted } = await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${normalizedEmail}, ${passwordHash}, ${name ?? normalizedEmail})
    RETURNING id, email, name, role, created_at
  `

  const user = inserted[0]
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
