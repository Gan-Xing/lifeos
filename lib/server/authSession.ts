import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { createHmac } from 'crypto'

import type { AuthUser } from '@/lib/server/authStore'

const SESSION_COOKIE = 'lifeos-session'
const SESSION_TTL = 60 * 60 * 24 * 7
const secret = process.env.AUTH_SECRET ?? 'dev-secret'

export interface SessionUser {
  id: number
  username: string
  email: string
  displayName: string
  issuedAt: number
}

const sign = (payload: string) => createHmac('sha256', secret).update(payload).digest('base64url')

const encode = (user: SessionUser) => {
  const body = Buffer.from(JSON.stringify(user)).toString('base64url')
  const signature = sign(body)
  return `${body}.${signature}`
}

const decode = (token: string): SessionUser | null => {
  const [body, signature] = token.split('.')
  if (!body || !signature) return null
  const expected = sign(body)
  if (expected !== signature) return null
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionUser
  } catch {
    return null
  }
}

export const issueSession = async (user: AuthUser) => {
  noStore()
  const session: SessionUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    issuedAt: Date.now(),
  }
  const token = encode(session)
  const jar = await cookies()
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_TTL,
    path: '/',
  })
  return session
}

export const clearSession = async () => {
  noStore()
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
  noStore()
  const jar = await cookies()
  const token = jar.get(SESSION_COOKIE)?.value
  if (!token) return null
  return decode(token)
}

export const requireSession = async () => {
  const user = await getSessionUser()
  if (!user) {
    throw new Error('UNAUTHORIZED')
  }
  return user
}
