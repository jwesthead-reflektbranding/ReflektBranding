import type { Metadata } from 'next'

const effectiveDate = 'June 2025'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Reflekt Branding collects, uses, and protects information when you visit reflektbranding.com.'
}

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="container legal-page-container">
        <header className="legal-header">
          <span className="section-eyebrow">Privacy Policy</span>
          <h1 className="section-title">How We Handle Your Information</h1>
          <p>Effective Date: {effectiveDate}</p>
        </header>

        <section className="legal-section" aria-labelledby="privacy-introduction">
          <h2 id="privacy-introduction">1. Introduction</h2>
          <p>
            Reflekt Branding ("we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, and
            protect information when you visit{' '}
            <a href="https://www.reflektbranding.com" rel="noopener noreferrer" target="_blank">
              www.reflektbranding.com
            </a>{' '}
            ("the Site"). By using the Site, you agree to this policy.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-information-we-collect">
          <h2 id="privacy-information-we-collect">2. Information We Collect</h2>
          <p>We collect the following information:</p>
          <ul>
            <li>
              <strong>Information you provide:</strong> Name, email address, phone number, company name, and other details you
              voluntarily enter through our contact or quote request forms.
            </li>
            <li>
              <strong>Automatic data:</strong> IP address, browser type, device information, referring pages, and usage activity
              collected via analytics and cookies.
            </li>
            <li>
              <strong>Third-party integrations:</strong> Data shared through embedded services or pixels from Google, Facebook,
              Instagram, LinkedIn, and HubSpot.
            </li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="privacy-how-we-use-information">
          <h2 id="privacy-how-we-use-information">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Respond to inquiries and provide requested services.</li>
            <li>Manage internal business operations and client communications.</li>
            <li>Improve website performance and understand visitor behavior.</li>
            <li>Send updates or marketing messages (only if you opt in).</li>
            <li>Comply with applicable laws and regulations.</li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="privacy-cookies-and-analytics">
          <h2 id="privacy-cookies-and-analytics">4. Cookies and Analytics</h2>
          <p>We use cookies and similar tracking technologies to improve your experience and analyze how visitors use the Site.</p>
          <ul>
            <li>Google Analytics helps us understand general usage trends.</li>
            <li>HubSpot analytics tracks form submissions and website interactions.</li>
          </ul>
          <p>You can control cookies through your browser settings. Disabling cookies may limit site functionality.</p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-data-sharing">
          <h2 id="privacy-data-sharing">5. Data Sharing</h2>
          <p>We share information only when necessary to operate our business:</p>
          <ul>
            <li>With service providers such as Google Workspace and HubSpot.</li>
            <li>With analytics and marketing platforms (Google, Meta, LinkedIn).</li>
            <li>As required by law, regulation, or legal process.</li>
          </ul>
          <p>We do not sell personal information.</p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-data-storage-and-security">
          <h2 id="privacy-data-storage-and-security">6. Data Storage and Security</h2>
          <p>
            Your data is stored securely within Google and HubSpot systems using encryption and access controls. We take reasonable
            measures to prevent unauthorized access, disclosure, or misuse.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-data-retention">
          <h2 id="privacy-data-retention">7. Data Retention</h2>
          <p>
            We retain information as long as needed to provide services or meet legal obligations. You may request deletion of your
            information by contacting us directly.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-your-rights">
          <h2 id="privacy-your-rights">8. Your Rights</h2>
          <p>You can:</p>
          <ul>
            <li>Request to view, correct, or delete your personal information.</li>
            <li>Opt out of marketing emails at any time.</li>
            <li>Request clarification about how your data is used.</li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="privacy-childrens-privacy">
          <h2 id="privacy-childrens-privacy">9. Children&apos;s Privacy</h2>
          <p>Our Site is not directed at children under 13. We do not knowingly collect information from minors.</p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-links-to-other-sites">
          <h2 id="privacy-links-to-other-sites">10. Links to Other Sites</h2>
          <p>
            Our Site may link to external websites (for example, Facebook, Instagram, LinkedIn). We are not responsible for the privacy
            practices of those sites.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-policy-updates">
          <h2 id="privacy-policy-updates">11. Policy Updates</h2>
          <p>We may update this policy periodically. Updates will be posted on this page with a new effective date.</p>
        </section>

        <section className="legal-section" aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">12. Contact Us</h2>
          <address>
            Reflekt Branding
            <br />
            Plainfield, Indiana, USA
            <br />
            Email:{' '}
            <a href="mailto:team@reflektbranding.com">team@reflektbranding.com</a>
          </address>
        </section>
      </div>
    </main>
  )
}
