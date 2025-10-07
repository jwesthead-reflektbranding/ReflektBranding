import type { Metadata } from 'next'

const effectiveDate = 'June 2025'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the Terms of Service governing your use of reflektbranding.com and Reflekt Branding services.'
}

export default function TermsOfServicePage() {
  return (
    <main className="legal-page">
      <div className="container legal-page-container">
        <header className="legal-header">
          <span className="section-eyebrow">Terms of Service</span>
          <h1 className="section-title">Understand the Rules of Engagement</h1>
          <p>Effective Date: {effectiveDate}</p>
        </header>

        <section className="legal-section" aria-labelledby="terms-acceptance">
          <h2 id="terms-acceptance">1. Acceptance of Terms</h2>
          <p>
            By accessing or using{' '}
            <a href="https://www.reflektbranding.com" rel="noopener noreferrer" target="_blank">
              www.reflektbranding.com
            </a>{' '}
            (the Site), you agree to comply with and be bound by these Terms of Service (the Terms). If you do not agree, you should not
            use this Site.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-overview">
          <h2 id="terms-overview">2. Company Overview</h2>
          <p>
            Reflekt Branding (we, us, our) provides branding, design, and marketing services to businesses across the United
            States. Our Site serves as an informational and contact platform for potential and current clients.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-use">
          <h2 id="terms-use">3. Use of the Site</h2>
          <ul>
            <li>You agree to use the Site only for lawful purposes and in accordance with these Terms.</li>
            <li>You will not attempt to disrupt, damage, or interfere with the functionality or security of the Site.</li>
            <li>You may not copy, reproduce, distribute, or modify any Site content without written permission from Reflekt Branding.</li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="terms-ip">
          <h2 id="terms-ip">4. Intellectual Property</h2>
          <p>
            All content on the Site—including text, graphics, images, videos, and logos—is the property of Reflekt Branding or its
            licensors. Unauthorized use of any materials is prohibited.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-services">
          <h2 id="terms-services">5. Service Information</h2>
          <ul>
            <li>The information on this Site is provided for general purposes only and may be changed or updated at any time.</li>
            <li>
              Descriptions of services are for reference and do not represent a binding offer. All projects require written proposals or
              contracts before work begins.
            </li>
            <li>Prices, timelines, and deliverables are determined individually for each client.</li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="terms-third-party">
          <h2 id="terms-third-party">6. Third-Party Links and Integrations</h2>
          <p>
            The Site may contain links to other websites, including Google, Facebook, Instagram, LinkedIn, and HubSpot. These are provided
            for convenience only. We are not responsible for the content, privacy policies, or operations of third-party websites.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-privacy">
          <h2 id="terms-privacy">7. Privacy and Data Collection</h2>
          <p>
            Use of the Site is also governed by our <a href="/privacy">Privacy Policy</a>. By using the Site, you consent to the
            collection and use of information as described there.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-disclaimer">
          <h2 id="terms-disclaimer">8. Disclaimer of Warranties</h2>
          <ul>
            <li>The Site is provided “as is” and “as available.”</li>
            <li>We make no warranties or representations regarding accuracy, reliability, or completeness of content.</li>
            <li>We disclaim all warranties, express or implied, including fitness for a particular purpose and non-infringement.</li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="terms-liability">
          <h2 id="terms-liability">9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Reflekt Branding and its affiliates shall not be liable for any indirect, incidental, or
            consequential damages resulting from your use or inability to use the Site, including but not limited to loss of data, profits,
            or goodwill.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-indemnification">
          <h2 id="terms-indemnification">10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Reflekt Branding, its officers, employees, and affiliates from any claims, damages,
            or expenses arising from your use of the Site or violation of these Terms.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-law">
          <h2 id="terms-law">11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Indiana, without regard to conflict of law principles. Any legal action or
            proceeding shall be brought exclusively in the courts of Hendricks County, Indiana.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-changes">
          <h2 id="terms-changes">12. Changes to Terms</h2>
          <p>
            We may revise these Terms at any time. Updated versions will be posted on the Site with a new effective date. Continued use of
            the Site means you accept the revised Terms.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="terms-contact">
          <h2 id="terms-contact">13. Contact Information</h2>
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
