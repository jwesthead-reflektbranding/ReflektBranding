'use client'

import { useMemo, useState } from 'react'

import StoreOrderForm from '@/components/StoreOrderForm'
import StoreProductSelector from '@/components/StoreProductSelector'
import type { StoreCatalogCategory, StoreCatalogProductWithCategory } from '@/lib/3dStoreCatalog'

type StoreOrderExperienceProps = {
  catalog: StoreCatalogCategory[]
  brands: string[]
  products: StoreCatalogProductWithCategory[]
}

export default function StoreOrderExperience({ catalog, brands, products }: StoreOrderExperienceProps) {
  const [queuedProduct, setQueuedProduct] = useState<{ product: StoreCatalogProductWithCategory; requestId: number } | null>(null)

  function handleAddToOrder(product: StoreCatalogProductWithCategory) {
    const requestId = Date.now() + Math.random()
    setQueuedProduct({ product, requestId })
  }

  const selectorBrands = useMemo(
    () =>
      brands.length
        ? brands
        : Array.from(
            new Set(
              products
                .map((product) => product.brand)
                .filter((brand): brand is string => Boolean(brand?.trim()))
            )
          ),
    [brands, products]
  )

  return (
    <>
      <section className="store-grid-section">
        <div className="container">
          <StoreProductSelector products={products} brands={selectorBrands} onAddToOrder={handleAddToOrder} />
        </div>
      </section>

      <section className="store-order-section">
        <div className="container">
          <div className="store-order-heading">
            <h2>Send us your order details</h2>
            <p>Provide quantities, deadlines, and any special finishing notes. We will confirm pricing and send an invoice.</p>
          </div>
          <StoreOrderForm catalog={catalog} brands={selectorBrands} queuedProduct={queuedProduct} />
        </div>
      </section>
    </>
  )
}
