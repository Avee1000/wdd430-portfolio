const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production'

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
