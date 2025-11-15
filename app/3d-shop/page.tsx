import type { Metadata } from 'next'
import Link from 'next/link'

const inquiryMailto =
  'mailto:team@reflektbranding.com?subject=Reflekt%20Branding%20Customer%20Inquiry&body=Thank%20you%20for%20your%20interest%20in%20Reflekt%20Branding.%20Tell%20us%20a%20little%20about%20who%20you%20are%20and%20a%20little%20about%20your%20project%20request.%20We%20will%20be%20in%20touch%20soon!'

const workflowSteps = [
  {
    title: 'Upload + Scope',
    detail: 'We consult with your team to capture the project goals, brand guardrails, and tactile requirements.'
  },
  {
    title: 'Proof + Approve',
    detail: 'Receive a 3D preview plus material callouts. Unlimited micro refinements are included.'
  },
  {
    title: 'Print + Finish',
    detail: 'Our industrial printers go to work, then every part moves through finishing, hardware install, and QC.'
  },
  {
    title: 'Pack + Ship',
    detail: 'We kit, label, and drop-ship nationwide or stage everything for your experiential rollout.'
  }
]

export const metadata: Metadata = {
  title: 'The 3D Shop | Reflekt Branding',
  description:
    "Order custom 3D printed brand assets, prototypes, and premium swag from Reflekt's in-house production studio."
}

export default function ThreeDShopPage() {
  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="container">
          <span className="section-eyebrow">The 3D Shop</span>
          <h1 className="section-title">Limited-Run, 3D Printed Products Built for Your Brand</h1>
          <p className="section-copy" style={{ maxWidth: '780px', margin: '0 auto' }}>
            Our online store gives your team direct access to Reflekt&apos;s industrial 3D printers, finishing bench, and fulfillment
            crew.
            From one-off statement pieces to short-run swag, every item is engineered, finished, and shipped by the same crew that
            protects your brand in the physical world.
          </p>
          <div className="shop-options" aria-label="Choose how to work with the 3D Shop">
            <article className="shop-option-card">
              <h3>Order existing products</h3>
              <p>Ready to move proven signage, apparel, or rollout kits? Jump into our product catalog and order now.</p>
              <Link href="/3d-shop/store" className="shop-option-link">
                Go to 3D product store →
              </Link>
            </article>
            <article className="shop-option-card">
              <h3>Custom 3D request</h3>
              <p>Need an entirely new build? Skip the catalog, keep scrolling, and see how our custom workflow operates.</p>
              <Link href="#custom-builds" className="shop-option-link">
                View custom process →
              </Link>
            </article>
          </div>
          <div className="shop-badges" aria-label="3D shop highlights">
            <div className="shop-badge">
              <span>CONCEPT PROOF</span>
              <p>Digital proofs with material callouts.</p>
            </div>
            <div className="shop-badge">
              <span>ON-DEMAND</span>
              <p>Build one-off prototypes or short runs—order the exact count you need with zero minimums.</p>
            </div>
            <div className="shop-badge">
              <span>Brand match</span>
              <p>Materials and embeds tuned to your approved palette and finishes.</p>
            </div>
            <div className="shop-badge">
              <span>Nationwide</span>
              <p>Drop-ship to offices, events, or fulfillment partners.</p>
            </div>
          </div>
          <div className="shop-hero-ctas">
            <Link href={inquiryMailto} className="button">
              Start custom 3D order
            </Link>
          </div>
        </div>
      </section>

      <section className="shop-process" id="custom-builds">
        <div className="container">
          <div className="shop-section-heading">
            <span className="section-eyebrow">How it works</span>
            <h2>Hands-on support from inquiry to install</h2>
            <p>Keep your brand standards intact while gaining the flexibility of on-demand production.</p>
          </div>
          <ol className="shop-steps">
            {workflowSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shop-materials">
        <div className="container">
          <div className="shop-section-heading">
            <span className="section-eyebrow">Production options</span>
            <h2>Materials, finishes, and applications dialed into your spec</h2>
          </div>
          <p className="shop-materials-note">
            Need something different? Share the requirements—we&apos;ll recommend print methods, finishing, and kitting that make it
            happen.
          </p>
        </div>
      </section>

      <section className="section section--red shop-cta">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">Ready to open?</span>
            <h2 className="section-title">Ready to open The 3D Shop for your brand?</h2>
            <p className="section-copy">
              Share a few details with us about your project or challenge and we&apos;ll reach out to plan the next steps for your
              Reflekt Branding experience.
            </p>
          </div>
          <div className="shop-cta-actions">
            <Link href={inquiryMailto} className="button">
              TEAM@REFLEKTBRANDING.COM
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
