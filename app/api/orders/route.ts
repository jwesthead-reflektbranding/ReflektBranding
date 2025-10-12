import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getCustomer } from '@/lib/customerData'
import { getSessionCookieName, verifySessionToken } from '@/lib/auth'
import { sendPortalOrderNotification } from '@/lib/email'

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
  type IncomingItem = { productId?: unknown; quantity?: unknown }
  const itemsInput: IncomingItem[] = Array.isArray(body?.items) ? (body.items as IncomingItem[]) : []
  const parsedItems = itemsInput
    .map((item) => ({
      productId: typeof item?.productId === 'string' ? item.productId : '',
      quantity:
        typeof item?.quantity === 'number'
          ? item.quantity
          : Number.parseInt(typeof item?.quantity === 'string' ? item.quantity : '', 10)
    }))
    .filter((item) => item.productId && Number.isFinite(item.quantity) && item.quantity > 0)

  if (parsedItems.length === 0) {
    return NextResponse.json({ error: 'Order must include at least one item.' }, { status: 400 })
  }

  const notes = typeof body?.notes === 'string' ? body.notes.trim() : ''
  const detailedItems = parsedItems.map((item) => {
    const product = customer.products.find((p) => p.id === item.productId)
    return {
      productId: item.productId,
      quantity: item.quantity,
      name: product?.name ?? 'Unknown product',
      sku: product?.sku ?? 'N/A'
    }
  })

  try {
    await sendPortalOrderNotification({
      customerName: customer.displayName,
      customerUsername: customer.username,
      items: detailedItems,
      notes
    })
  } catch (error) {
    console.error('Failed to send portal order notification', error)
    return NextResponse.json({ error: 'Unable to submit order right now.' }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    message: 'Order submitted. A Reflekt project manager will confirm details shortly.',
    summary: {
      customer: customer.displayName,
      items: detailedItems,
      notes
    }
  })
}
