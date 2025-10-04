'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PortalLoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')?.toString().trim()
    const password = formData.get('password')?.toString() ?? ''

    if (!username || !password) {
      setError('Please enter your username and password.')
      setLoading(false)
      return
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error ?? 'Unable to sign in. Please try again.')
      setLoading(false)
      return
    }

    router.push('/portal')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="portal-login-form">
      <label>
        <span>Username</span>
        <input name="username" type="text" autoComplete="username" placeholder="acme-industries" />
      </label>
      <label>
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" placeholder="••••••••" />
      </label>

      {error ? <p className="portal-login-error">{error}</p> : null}

      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
