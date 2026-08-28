import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))

  const { email, password, name, secret } = body as {
    email?: string
    password?: string
    name?: string
    secret?: string
  }

  const setupSecret = process.env.ADMIN_SETUP_SECRET || 'change-me-setup-secret'

  if (secret !== setupSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required.' },
      { status: 400 }
    )
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const passwordHash = await hashPassword(password)

  const { rows } = await sql`
    INSERT INTO users (email, password_hash, name, role)
    VALUES (${normalizedEmail}, ${passwordHash}, ${name ?? normalizedEmail}, 'admin')
    ON CONFLICT (email) DO UPDATE SET role = 'admin', updated_at = NOW()
    RETURNING id, email, name, role
  `

  return NextResponse.json({ user: rows[0] }, { status: 200 })
}
