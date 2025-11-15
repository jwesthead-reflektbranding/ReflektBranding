import Link from 'next/link'
import type { Metadata } from 'next'

import StoreOrderForm from '@/components/StoreOrderForm'
import StoreProductSelector from '@/components/StoreProductSelector'
import { loadStoreCatalog } from '@/lib/3dStoreCatalog'

export const metadata: Metadata = {
  title: '3D Product Store | Reflekt Branding',
  description: 'Order existing 3D printed products from Reflekt without a custom build. Pricing, lead times, and specs included.'
}

export default function ThreeDProductStorePage() {
  const { flatProducts, catalog, brands } = loadStoreCatalog()

  return (
    <main className="store-page">
      <section className="store-hero">
        <div className="container">
          <span className="section-eyebrow">3D Product Store</span>
          <h1 className="section-title">Order ready-to-print 3D products</h1>
          <p className="section-copy">
            These releases are tested and produced on demand. Choose the product and submit it straight to the Reflekt team.
          </p>
          <div className="store-hero-actions">
            <Link href="/3d-shop" className="button button-outline">
              Explore custom builds
            </Link>
          </div>
        </div>
      </section>

      <section className="store-grid-section">
        <div className="container">
          <StoreProductSelector products={flatProducts} brands={brands} />
        </div>
      </section>

      <section className="store-order-section">
        <div className="container">
          <div className="store-order-heading">
            <h2>Send us your order details</h2>
            <p>Provide quantities, deadlines, and any special finishing notes. We will confirm pricing and send an invoice.</p>
          </div>
          <StoreOrderForm catalog={catalog} brands={brands} />
        </div>
      </section>
    </main>
  )
}
