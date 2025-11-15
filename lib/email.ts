import nodemailer from 'nodemailer'

type PortalOrderEmailItem = {
  productId: string
  name: string
  sku: string
  quantity: number
}

type PortalOrderEmailPayload = {
  customerName: string
  customerUsername: string
  items: PortalOrderEmailItem[]
  notes: string
}

type StoreOrderEmailProduct = {
  brand: string
  category: string
  product: string
  sku?: string
  quantity: string
  price: string
}

type StoreOrderEmailPayload = {
  contact: {
    name: string
    company?: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
  }
  shipping:
    | { option: 'pickup' }
    | { option: 'same' }
    | {
        option: 'custom'
        customAddress: {
          address: string
          city: string
          state: string
          zip: string
        }
      }
  products: StoreOrderEmailProduct[]
}

const DEFAULT_TO_ADDRESS = 'team@reflektbranding.com'
const DEFAULT_FROM_ADDRESS = 'no-reply@reflektbranding.com'

let cachedTransporter: nodemailer.Transporter | null | undefined

function resolveTransporter() {
  if (cachedTransporter !== undefined) {
    return cachedTransporter
  }

  const { SMTP_URL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_URL && !SMTP_HOST) {
    cachedTransporter = null
    return cachedTransporter
  }

  if (SMTP_URL) {
    cachedTransporter = nodemailer.createTransport(SMTP_URL)
    return cachedTransporter
  }

  const port = SMTP_PORT ? Number(SMTP_PORT) : 587
  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  })

  return cachedTransporter
}

function buildEmailBody({ customerName, customerUsername, items, notes }: PortalOrderEmailPayload) {
  const itemLines = items
    .map((item) => `• ${item.name} (${item.sku}) — ${item.quantity} pcs [${item.productId}]`)
    .join('\n')

  const text = [
    `Portal order submitted by ${customerName} (${customerUsername}).`,
    '',
    'Requested items:',
    itemLines,
    '',
    'Notes:',
    notes || 'None provided.',
    '',
    `Submitted: ${new Date().toLocaleString()}`
  ].join('\n')

  const html = `
    <p>Portal order submitted by <strong>${customerName}</strong> (${customerUsername}).</p>
    <p><strong>Requested items:</strong></p>
    <ul>
      ${items
        .map(
          (item) =>
            `<li><strong>${item.name}</strong> (${item.sku}) &times; ${item.quantity} <em>[${item.productId}]</em></li>`
        )
        .join('')}
    </ul>
    <p><strong>Notes:</strong><br />${notes ? notes.replace(/\n/g, '<br />') : 'None provided.'}</p>
    <p style="color:#666;">Submitted ${new Date().toLocaleString()}</p>
  `

  return { text, html }
}

export async function sendPortalOrderNotification(payload: PortalOrderEmailPayload) {
  const transporter = resolveTransporter()
  if (!transporter) {
    throw new Error('SMTP configuration is missing. Set SMTP_URL or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS.')
  }

  const { text, html } = buildEmailBody(payload)
  const from = process.env.SMTP_FROM ?? DEFAULT_FROM_ADDRESS
  const to = process.env.PORTAL_ORDERS_TO ?? DEFAULT_TO_ADDRESS

  await transporter.sendMail({
    from,
    to,
    subject: `New client portal order from ${payload.customerName}`,
    text,
    html
  })
}

function buildStoreOrderEmailBody({ contact, shipping, products }: StoreOrderEmailPayload) {
  const timestamp = new Date().toLocaleString()

  const contactLines = [
    `Name: ${contact.name}`,
    contact.company ? `Company: ${contact.company}` : '',
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Billing address: ${contact.address}`,
    `City: ${contact.city}`,
    `State: ${contact.state}`,
    `ZIP: ${contact.zip}`
  ].filter(Boolean)

  const shippingText =
    shipping.option === 'pickup'
      ? 'Customer pickup at Reflekt.'
      : shipping.option === 'same'
        ? 'Ship to the billing address listed above.'
        : [
            'Ship to custom address:',
            shipping.customAddress.address,
            `${shipping.customAddress.city}, ${shipping.customAddress.state} ${shipping.customAddress.zip}`
          ].join('\n')

  const shippingHtml =
    shipping.option === 'pickup'
      ? '<p><strong>Shipping:</strong> Customer pickup at Reflekt.</p>'
      : shipping.option === 'same'
        ? '<p><strong>Shipping:</strong> Ship to the billing address listed above.</p>'
        : `<p><strong>Shipping:</strong><br />${shipping.customAddress.address}<br />${shipping.customAddress.city}, ${shipping.customAddress.state} ${shipping.customAddress.zip}</p>`

  const productLines = products
    .map(
      (product, index) =>
        `${index + 1}. ${product.product} (${product.sku || 'SKU N/A'}) — Qty: ${product.quantity} — Price: ${
          product.price
        } — Brand: ${product.brand} — Category: ${product.category}`
    )
    .join('\n')

  const productHtml = products
    .map(
      (product) => `
        <li>
          <strong>${product.product}</strong>${product.sku ? ` (${product.sku})` : ''}<br />
          Qty: ${product.quantity} — Price: ${product.price}<br />
          Brand: ${product.brand} &middot; Category: ${product.category}
        </li>
      `
    )
    .join('')

  const text = [
    'A new 3D store order has been submitted.',
    '',
    'Contact information:',
    contactLines.join('\n'),
    '',
    'Shipping:',
    shippingText,
    '',
    'Products:',
    productLines,
    '',
    `Submitted: ${timestamp}`
  ].join('\n')

  const html = `
    <p>A new <strong>3D store order</strong> has been submitted.</p>
    <p><strong>Contact information:</strong><br />
      ${contactLines.map((line) => line.replace(': ', ':&nbsp;')).join('<br />')}
    </p>
    ${shippingHtml}
    <p><strong>Products:</strong></p>
    <ul>
      ${productHtml}
    </ul>
    <p style="color:#666;">Submitted ${timestamp}</p>
  `

  return { text, html }
}

export async function sendStoreOrderEmail(payload: StoreOrderEmailPayload) {
  const transporter = resolveTransporter()
  if (!transporter) {
    throw new Error('SMTP configuration is missing. Set SMTP_URL or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS.')
  }

  const { text, html } = buildStoreOrderEmailBody(payload)
  const from = process.env.SMTP_FROM ?? DEFAULT_FROM_ADDRESS
  const to = process.env.STORE_ORDERS_TO ?? DEFAULT_TO_ADDRESS

  await transporter.sendMail({
    from,
    to,
    subject: `3D Shop order request from ${payload.contact.name}`,
    text,
    html
  })
}
