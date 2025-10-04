import crypto from 'crypto'

export type CustomerProduct = {
  id: string
  name: string
  sku: string
  inventory: number
  reorderPoint: number
}

export type CustomerOrder = {
  id: string
  date: string
  items: Array<{ productId: string; quantity: number }>
  status: 'Submitted' | 'In Production' | 'Fulfilled'
}

export type CustomerRecord = {
  username: string
  displayName: string
  salt: string
  passwordHash: string
  products: CustomerProduct[]
  recentOrders: CustomerOrder[]
}

function createPasswordHash(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString('hex')
}

export function verifyPassword(password: string, salt: string, hash: string) {
  const computed = createPasswordHash(password, salt)
  // timing safe comparison
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computed, 'hex'))
}

export const customers: CustomerRecord[] = [
  {
    username: 'acme-industries',
    displayName: 'Acme Industries',
    salt: '1a57e8d6fb7d42ad849d4b9cd2d202c1',
    passwordHash: createPasswordHash('acmeportal', '1a57e8d6fb7d42ad849d4b9cd2d202c1'),
    products: [
      { id: 'promo-kits', name: 'Launch Promo Kits', sku: 'RK-PROMO-1001', inventory: 240, reorderPoint: 150 },
      { id: 'wrap-graphic', name: 'Sprinter Fleet Wrap Graphic', sku: 'FG-SPR-042', inventory: 18, reorderPoint: 10 },
      { id: 'event-backdrop', name: '20ft SEG Event Backdrop', sku: 'EVT-SEG-20', inventory: 5, reorderPoint: 3 }
    ],
    recentOrders: [
      {
        id: 'PO-1045',
        date: '2024-05-14',
        status: 'Fulfilled',
        items: [
          { productId: 'promo-kits', quantity: 150 },
          { productId: 'event-backdrop', quantity: 2 }
        ]
      },
      {
        id: 'PO-1084',
        date: '2024-06-30',
        status: 'In Production',
        items: [{ productId: 'wrap-graphic', quantity: 6 }]
      }
    ]
  },
  {
    username: 'stellar-brewing',
    displayName: 'Stellar Brewing Co.',
    salt: '9dc828a0c4d7441aa77c3b9eae6c73fb',
    passwordHash: createPasswordHash('stellarportal', '9dc828a0c4d7441aa77c3b9eae6c73fb'),
    products: [
      { id: 'tap-handles', name: 'Custom Tap Handles', sku: 'BR-TAP-17', inventory: 320, reorderPoint: 250 },
      { id: 'neon-sign', name: 'LED Neon Window Sign', sku: 'BR-NEON-04', inventory: 12, reorderPoint: 8 },
      { id: 'merch-bundle', name: 'Tasting Room Merch Bundle', sku: 'BR-MER-22', inventory: 85, reorderPoint: 60 }
    ],
    recentOrders: [
      {
        id: 'SB-PO-311',
        date: '2024-07-12',
        status: 'Submitted',
        items: [{ productId: 'merch-bundle', quantity: 120 }]
      }
    ]
  }
]

export function getCustomer(username: string) {
  return customers.find((customer) => customer.username === username)
}
