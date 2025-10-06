import type { Metadata } from 'next'

const effectiveDate = 'June 2025'
const lastReviewDate = 'June 2025'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Learn how Reflekt Branding works to make reflektbranding.com accessible for all visitors.'
}

export default function AccessibilityPage() {
  return (
    <main className="legal-page">
      <div className="container legal-page-container">
        <header className="legal-header">
          <span className="section-eyebrow">Accessibility Statement</span>
          <h1 className="section-title">Accessibility for Every Visitor</h1>
          <p>Effective Date: {effectiveDate}</p>
        </header>

        <section className="legal-section" aria-labelledby="accessibility-commitment">
          <h2 id="accessibility-commitment">1. Our Commitment</h2>
          <p>
            Reflekt Branding is committed to ensuring digital accessibility for people with disabilities. We strive to make{' '}
            <a href="https://www.reflektbranding.com" rel="noopener noreferrer" target="_blank">
              www.reflektbranding.com
            </a>{' '}
            easy to use and accessible to all visitors, in line with the Americans with Disabilities Act (ADA) and the Web Content
            Accessibility Guidelines (WCAG) 2.1, Level AA.
          </p>
          <p>
            We believe everyone deserves equal access to information and services online. Our goal is to provide an inclusive web
            experience that allows all users, regardless of ability, to navigate and interact with our website effectively.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="accessibility-measures">
          <h2 id="accessibility-measures">2. Measures We Take</h2>
          <p>To support accessibility, Reflekt Branding:</p>
          <ul>
            <li>Uses clear, consistent navigation and readable content structures.</li>
            <li>Ensures text alternatives for all meaningful images.</li>
            <li>Maintains sufficient color contrast between text and backgrounds.</li>
            <li>Designs for keyboard navigation and screen reader compatibility.</li>
            <li>Tests with accessibility tools and audits content regularly.</li>
            <li>Trains staff and contractors to follow accessibility best practices.</li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="accessibility-ongoing">
          <h2 id="accessibility-ongoing">3. Ongoing Efforts</h2>
          <p>
            Accessibility is a continuous effort. As technology evolves, we monitor our website to identify and address barriers to access. We
            aim to meet or exceed WCAG 2.1 Level AA standards whenever possible.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="accessibility-third-party">
          <h2 id="accessibility-third-party">4. Third-Party Content</h2>
          <p>
            Our website may include links or embedded content from third-party providers such as Google, HubSpot, Facebook, Instagram, and
            LinkedIn. While we cannot control the accessibility of third-party content, we encourage these providers to maintain accessible
            features.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="accessibility-feedback">
          <h2 id="accessibility-feedback">5. Feedback</h2>
          <p>
            We welcome feedback on the accessibility of{' '}
            <a href="https://www.reflektbranding.com" rel="noopener noreferrer" target="_blank">
              www.reflektbranding.com
            </a>
            . If you encounter an issue or need assistance accessing any part of our site, please contact us:
          </p>
          <address>
            Reflekt Branding
            <br />
            Email:{' '}
            <a href="mailto:info@reflektbranding.com">info@reflektbranding.com</a>
            <br />
            Phone: [Insert phone number]
            <br />
            Mail: Plainfield, Indiana, USA
          </address>
          <p>
            Please include a description of the issue and the web page where you experienced it. We will make reasonable efforts to resolve the
            issue promptly.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="accessibility-compatibility">
          <h2 id="accessibility-compatibility">6. Compatibility</h2>
          <p>
            Our website is designed to work with major browsers, including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser
            updated for the best experience.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="accessibility-review">
          <h2 id="accessibility-review">7. Date of Last Review</h2>
          <p>This statement was last reviewed and updated on {lastReviewDate}.</p>
        </section>
      </div>
    </main>
  )
}
