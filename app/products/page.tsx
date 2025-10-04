import Image from 'next/image'
import Link from 'next/link'

import { getAllProducts } from '@/lib/products'

export default function ProductsIndex() {
  const products = getAllProducts()

  return (
    <main>
      <section className="products-hero">
        <div className="container">
          <span className="section-eyebrow">Product Catalog</span>
          <h1 className="section-title">Branded Products Engineered to Perform</h1>
          <p className="section-copy" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Every product we create is built to amplify your identity, meet real-world demands, and launch without stress. Explore
            the full lineup to see how we bring brands to life across environments, formats, and experiences.
          </p>
        </div>
      </section>

      <section className="products-grid-section">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="product-card">
                <div className="product-card-inner">
                  {product.image ? (
                    <div className="product-card-media">
                      <Image src={product.image} alt={product.imageAlt ?? product.name} fill sizes="(max-width: 768px) 100vw, 360px" />
                    </div>
                  ) : null}
                  <span className="product-card-caption">{product.caption}</span>
                  <h2>{product.name}</h2>
                  <p>{product.excerpt}</p>
                  <span className="product-card-link">VIEW DETAILS →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
