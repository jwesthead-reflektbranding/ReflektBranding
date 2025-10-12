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
