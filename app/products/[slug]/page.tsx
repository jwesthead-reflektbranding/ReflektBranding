import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllProducts, getProductBySlug } from '@/lib/products'

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return { title: 'Product not found' }
  }

  return {
    title: `${product.name} — Reflekt Products`,
    description: product.excerpt
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const hasHighlights = product.sections.length > 3
  const highlightSections = hasHighlights ? product.sections.slice(0, 3) : []
  const detailSections = hasHighlights ? product.sections.slice(3) : product.sections

  function summarize(text: string) {
    const normalized = text.replace(/\s+/g, ' ').trim()
    const sentenceEnd = normalized.indexOf('. ')
    if (sentenceEnd === -1) {
      return normalized
    }
    return normalized.slice(0, sentenceEnd + 1)
  }

  return (
    <main className="product-detail">
      <section className="product-detail-hero">
        <div className="container product-detail-hero-grid">
          <div className="product-detail-hero-content">
            <span className="section-eyebrow">Reflekt Product</span>
            <h1 className="section-title">{product.name}</h1>
            <p className="product-detail-caption">{product.caption}</p>
            <p className="product-detail-lede">{product.heroCopy}</p>

            {highlightSections.length ? (
              <ul className="product-detail-highlights">
                {highlightSections.map((section) => (
                  <li key={section.title}>
                    <strong>{section.title}</strong>
                    <p>{summarize(section.body)}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="product-detail-hero-actions">
              <Link href="/#contact" className="button">
                Plan this project
              </Link>
              <a
                href="mailto:team@reflektbranding.com?subject=Reflekt%20Branding%20Customer%20Inquiry&body=Thank%20you%20for%20your%20interest%20in%20Reflekt%20Branding.%20Tell%20us%20a%20little%20about%20who%20you%20are%20and%20a%20little%20about%20your%20project%20request.%20We%20will%20be%20in%20touch%20soon!"
                className="button button-outline"
              >
                Email our team
              </a>
            </div>
          </div>

          {product.image ? (
            <div className="product-detail-hero-media">
              <Image src={product.image} alt={product.imageAlt ?? product.name} fill sizes="(max-width: 1024px) 100vw, 540px" />
            </div>
          ) : null}
        </div>
      </section>

      <section className="product-detail-content">
        <div className="container">
          <div className="product-sections">
            {detailSections.map((section) => (
              <article key={section.title} className="product-section">
                <div className="product-section-header">
                  <span className="product-section-eyebrow">{product.name}</span>
                  <h2>{section.title}</h2>
                </div>
                <p>{section.body}</p>
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-detail-cta">
        <div className="container product-detail-cta-inner">
          <div>
            <h2>Ready to build {product.name}?</h2>
            <p>
              {product.excerpt} Partner with Reflekt to engineer every detail—from concept and prototyping through production and
              installation.
            </p>
          </div>
          <div className="product-detail-cta-actions">
            <Link href="/#contact" className="button">
              Start your brief
            </Link>
            <a
              href="mailto:team@reflektbranding.com?subject=Reflekt%20Branding%20Customer%20Inquiry&body=Thank%20you%20for%20your%20interest%20in%20Reflekt%20Branding.%20Tell%20us%20a%20little%20about%20who%20you%20are%20and%20a%20little%20about%20your%20project%20request.%20We%20will%20be%20in%20touch%20soon!"
              className="button button-outline"
            >
              Talk with a strategist
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
