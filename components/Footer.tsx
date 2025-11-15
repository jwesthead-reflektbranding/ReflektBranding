import Image from 'next/image'
import Link from 'next/link'

const primaryLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Services', href: '/#services' },
  { label: 'Proof', href: '/#proof' },
  { label: 'Blog', href: '/blog' },
  { label: 'Products', href: '/products' }
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' }
]

const socialMedia = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=61577320327354',
    iconSrc: '/social/facebook.svg'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/reflekt_branding_llc/',
    iconSrc: '/social/instagram.svg'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/reflekt-branding/?viewAsMember=true',
    iconSrc: '/social/linkedin.svg'
  }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link href="/" aria-label="Reflekt home" className="footer-logo">
            <Image src="/reflekt-logo-wordmark.png" alt="Reflekt" width={176} height={40} />
          </Link>
          <p>
            Reflekt is a full-service branding and experience partner headquartered in Indianapolis, serving national clients with
            strategy, design, and rollout support.
          </p>
          <div className="footer-contact">
            <Link href="mailto:team@reflektbranding.com">team@reflektbranding.com</Link>
            <span>Mon – Fri · 8a – 5p EST</span>
            <span>Indianapolis, IN</span>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <p className="footer-heading">Company</p>
            <ul>
              {primaryLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <p className="footer-heading">Legal</p>
            <ul>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column footer-social">
            <p className="footer-heading">Connect</p>
            <ul>
              {socialMedia.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} aria-label={social.label}>
                    <Image src={social.iconSrc} alt="" width={20} height={20} />
                    <span>{social.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-meta">
        <span>© {year} Reflekt Branding LLC. All rights reserved.</span>
        <span>Made in Indiana · Serving clients nationwide</span>
      </div>
    </footer>
  )
}
