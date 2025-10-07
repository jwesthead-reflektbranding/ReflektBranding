import crypto from 'crypto'

const COOKIE_NAME = 'reflekt_portal_session'
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 8 // 8 hours

function getSecret() {
  return process.env.PORTAL_AUTH_SECRET ?? 'reflekt-dev-secret-change-me'
}

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function base64UrlDecode(input: string) {
  const padLength = (4 - (input.length % 4)) % 4
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLength)
  return Buffer.from(padded, 'base64').toString()
}

export type SessionPayload = {
  username: string
  exp: number
}

export function createSessionToken(username: string, ttlMs = DEFAULT_TTL_MS) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload: SessionPayload = {
    username,
    exp: Date.now() + ttlMs
  }

  const headerEncoded = base64UrlEncode(JSON.stringify(header))
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))

  const data = `${headerEncoded}.${payloadEncoded}`
  const signature = crypto.createHmac('sha256', getSecret()).update(data).digest('base64url')

  return `${data}.${signature}`
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [header, payload, signature] = token.split('.')
  if (!header || !payload || !signature) {
    return null
  }

  const data = `${header}.${payload}`
  const expected = crypto.createHmac('sha256', getSecret()).update(data).digest('base64url')
  const signatureBuffer = Buffer.from(signature, 'base64url')
  const expectedBuffer = Buffer.from(expected, 'base64url')

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null
  }

  let payloadData: SessionPayload

  try {
    payloadData = JSON.parse(base64UrlDecode(payload))
  } catch {
    return null
  }

  if (Date.now() > payloadData.exp) {
    return null
  }

  return payloadData
}

export function getSessionCookieName() {
  return COOKIE_NAME
}
