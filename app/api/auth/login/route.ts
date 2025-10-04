import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createSessionToken, getSessionCookieName } from '@/lib/auth'
import { getCustomer, verifyPassword } from '@/lib/customerData'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
  }

  const customer = getCustomer(username)

  if (!customer) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const isValid = verifyPassword(password, customer.salt, customer.passwordHash)

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const token = createSessionToken(customer.username)

  const response = NextResponse.json({ success: true, customer: { username: customer.username, displayName: customer.displayName } })

  response.cookies.set({
    name: getSessionCookieName(),
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  })

  return response
}
