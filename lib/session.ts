import { cookies } from 'next/headers'

import { getCustomer } from '@/lib/customerData'
import { getSessionCookieName, verifySessionToken } from '@/lib/auth'

export function getAuthenticatedCustomer() {
  const cookieStore = cookies()
  const token = cookieStore.get(getSessionCookieName())?.value

  if (!token) {
    return null
  }

  const session = verifySessionToken(token)
  if (!session) {
    return null
  }

  const customer = getCustomer(session.username)
  return customer ?? null
}

export function requireCustomer() {
  const customer = getAuthenticatedCustomer()

  if (!customer) {
    throw new Error('UNAUTHORIZED')
  }

  return customer
}
