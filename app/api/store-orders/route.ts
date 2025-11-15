import { NextResponse } from 'next/server'

import { sendStoreOrderEmail } from '@/lib/email'

type ShippingOption = 'pickup' | 'same' | 'custom'

const SHIPPING_OPTIONS: ShippingOption[] = ['pickup', 'same', 'custom']

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const payload = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}

  const contact = {
    name: sanitize(payload.name),
    company: sanitizeOptional(payload.company),
    email: sanitize(payload.email),
    phone: sanitize(payload.phone),
    address: sanitize(payload.address),
    city: sanitize(payload.city),
    state: sanitize(payload.state).toUpperCase(),
    zip: sanitize(payload.zip)
  }

  if (!contact.name || !contact.email || !contact.phone || !contact.address || !contact.city || !contact.state || !contact.zip) {
    return NextResponse.json({ error: 'Contact information is incomplete.' }, { status: 400 })
  }

  const shippingOptionRaw = sanitize(payload.shippingOption).toLowerCase()
  if (!SHIPPING_OPTIONS.includes(shippingOptionRaw as ShippingOption)) {
    return NextResponse.json({ error: 'Invalid shipping option.' }, { status: 400 })
  }

  const shippingOption = shippingOptionRaw as ShippingOption
  const shipping =
    shippingOption === 'custom'
      ? {
          option: shippingOption,
          customAddress: {
            address: sanitize(payload.shippingAddress),
            city: sanitize(payload.shippingCity),
            state: sanitize(payload.shippingState).toUpperCase(),
            zip: sanitize(payload.shippingZip)
          }
        }
      : { option: shippingOption }

  if (
    shippingOption === 'custom' &&
    (!shipping.customAddress?.address ||
      !shipping.customAddress.city ||
      !shipping.customAddress.state ||
      !shipping.customAddress.zip)
  ) {
    return NextResponse.json({ error: 'Custom shipping address is incomplete.' }, { status: 400 })
  }

  const productsInput = Array.isArray(payload.products) ? (payload.products as unknown[]) : []
  const products = productsInput
    .map((item) => {
      const product = typeof item === 'object' && item !== null ? (item as Record<string, unknown>) : {}
      return {
        brand: sanitize(product.brand),
        category: sanitize(product.category),
        product: sanitize(product.product),
        sku: sanitizeOptional(product.sku),
        quantity: sanitize(product.quantity),
        price: sanitize(product.price)
      }
    })
    .filter(
      (product) =>
        product.brand && product.category && product.product && product.quantity && product.price
    )

  if (products.length === 0) {
    return NextResponse.json({ error: 'Please include at least one product in your order.' }, { status: 400 })
  }

  try {
    await sendStoreOrderEmail({
      contact,
      shipping,
      products
    })
  } catch (error) {
    console.error('Failed to send 3D store order email', error)
    return NextResponse.json({ error: 'Unable to submit your order right now.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

function sanitize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function sanitizeOptional(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}
