import { redirect } from 'next/navigation'

import PortalLoginForm from '@/components/PortalLoginForm'
import { getAuthenticatedCustomer } from '@/lib/session'

export default function PortalLoginPage() {
  const customer = getAuthenticatedCustomer()

  if (customer) {
    redirect('/portal')
  }

  return (
    <main className="portal-login">
      <div className="container portal-login-card">
        <span className="section-eyebrow" style={{ textAlign: 'center' }}>
          Client Portal
        </span>
        <h1>Welcome back</h1>
        <p>Sign in to manage your Reflekt products, inventory, and project requests.</p>
        <PortalLoginForm />
      </div>
    </main>
  )
}
