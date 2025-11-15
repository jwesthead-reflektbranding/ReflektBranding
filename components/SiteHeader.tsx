import Image from 'next/image'
import Link from 'next/link'

import { products } from '@/lib/products'
import { getAuthenticatedCustomer } from '@/lib/session'

type NavigationItem = {
  label: string
  href: string
  submenu?: Array<{ label: string; href: string }>
}

const navigation: NavigationItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT', href: '/#contact' },
  {
    label: 'PRODUCTS',
    href: '/products',
    submenu: products.map((product) => ({ label: product.name, href: `/products/${product.slug}` }))
  }
]

type SiteHeaderProps = {
  cta?: boolean
}

export default function SiteHeader({ cta = true }: SiteHeaderProps) {
  const customer = getAuthenticatedCustomer()

  return (
    <header className="site-header" id="reflekt">
      <div className="container site-header-inner">
        <Link
          href="/"
          aria-label="Reflekt home"
          style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0' }}
        >
          <Image
            src="/reflekt-logo-wordmark.png"
            alt="Reflekt"
            width={180}
            height={43}
            priority
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
        <nav>
          <ul className="site-nav">
            {navigation.map((item) => (
              <li key={item.label} className={item.submenu ? 'nav-item nav-item-has-submenu' : 'nav-item'}>
                <Link href={item.href} aria-haspopup={item.submenu ? 'true' : undefined}>
                  {item.label}
                </Link>
                {item.submenu ? (
                  <div className="nav-dropdown" role="menu">
                    <ul>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.href}>
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header-actions">
          <Link href="/3d-shop" className="button button-outline">
            THE 3D SHOP
          </Link>
          {cta ? (
            <Link href="/#contact" className="button">
              Begin a project
            </Link>
          ) : null}
          {customer ? (
            <div className="site-header-session-group">
              <span className="site-header-session">
                Signed in as <strong>{customer.displayName}</strong>
              </span>
              <Link href="/portal" className="site-header-portal">
                Portal dashboard
              </Link>
            </div>
          ) : (
            <Link href="/portal/login" className="site-header-portal">
              Client portal
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
