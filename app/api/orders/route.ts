import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getCustomer } from '@/lib/customerData'
import { getSessionCookieName, verifySessionToken } from '@/lib/auth'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get(getSessionCookieName())?.value

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const session = verifySessionToken(token)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const customer = getCustomer(session.username)

  if (!customer) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Order must include at least one item.' }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    message: 'Order submitted. A Reflekt project manager will confirm details shortly.',
    summary: {
      customer: customer.displayName,
      items: body.items
    }
  })
}
