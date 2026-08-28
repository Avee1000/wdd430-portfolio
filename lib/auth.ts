const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production'
const JWT_EXPIRES = '7d'

function base64UrlEncode(data: ArrayBuffer | ArrayLike<number>): string {
  const bytes = new Uint8Array(data)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
  return base64UrlEncode(signature)
}

async function verifyHmac(message: string, signatureB64Url: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )
  try {
    const padded = signatureB64Url.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(padded)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return crypto.subtle.verify('HMAC', key, bytes.buffer, encoder.encode(message))
  } catch {
    return false
  }
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes.buffer)
}

export async function hashPassword(password: string) {
  const salt = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('hex')
  const iterations = 100000
  
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  )
  
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: Buffer.from(salt, 'hex'),
      iterations,
      hash: 'SHA-256',
    },
    key,
    256
  )
  
  const hash = Buffer.from(bits).toString('hex')
  return `${salt}:${iterations}:${hash}`
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, iterationsStr, hash] = stored.split(':')
  if (!salt || !iterationsStr || !hash) return false
  
  const iterations = Number(iterationsStr)
  if (!Number.isFinite(iterations) || iterations <= 0) return false
  
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    )
    
    const bits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: Buffer.from(salt, 'hex'),
        iterations,
        hash: 'SHA-256',
      },
      key,
      256
    )
    
    const derivedHash = Buffer.from(bits).toString('hex')
    return derivedHash === hash
  } catch {
    return false
  }
}

export async function createSessionToken(userId: number, email: string, role: string = 'user') {
  const payload = {
    sub: Number(userId),
    email,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  }
  const header = base64UrlEncode(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const body = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)))
  const signature = await hmacSha256(`${header}.${body}`, JWT_SECRET)
  return `${header}.${body}.${signature}`
}

export async function readSessionToken(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [headerB64, bodyB64, signature] = parts
  if (!headerB64 || !bodyB64 || !signature) return null

  const signingInput = `${headerB64}.${bodyB64}`

  const valid = await verifyHmac(signingInput, signature, JWT_SECRET)
  if (!valid) return null

  try {
    const payload = JSON.parse(base64UrlDecode(bodyB64))
    if (typeof payload.exp === 'number' && Date.now() / 1000 > payload.exp) return null
    if (typeof payload.sub !== 'number') return null
    return {
      userId: payload.sub,
      email: typeof payload.email === 'string' ? payload.email : '',
      role: typeof payload.role === 'string' ? payload.role : 'user',
    }
  } catch {
    return null
  }
}

export function getJwtSecret() {
  return JWT_SECRET
}

export function getJwtExpires() {
  return JWT_EXPIRES
}
