'use client'

import { FormEvent, useState } from 'react'

import type { CustomerProduct } from '@/lib/customerData'

type PortalOrderFormProps = {
  products: CustomerProduct[]
}

type OrderItem = {
  productId: string
  quantity: number
}

export default function PortalOrderForm({ products }: PortalOrderFormProps) {
  const defaultProduct = products[0]?.id ?? ''
  const [items, setItems] = useState<OrderItem[]>(defaultProduct ? [{ productId: defaultProduct, quantity: 1 }] : [])
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function updateItem(index: number, update: Partial<OrderItem>) {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...update } : item)))
  }

  function addItem() {
    if (!products.length) return
    setItems((current) => [...current, { productId: products[0].id, quantity: 1 }])
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, i) => i !== index))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setFeedback(null)

    const filteredItems = items.filter((item) => item.quantity > 0)

    if (filteredItems.length === 0) {
      setError('Add at least one item to submit your order.')
      setSubmitting(false)
      return
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: filteredItems, notes: notes.trim() })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error ?? 'Unable to submit order right now.')
      setSubmitting(false)
      return
    }

    setFeedback('Order received. Our project management team will reach out shortly to finalize details.')
    setSubmitting(false)
    setNotes('')
    setItems(defaultProduct ? [{ productId: defaultProduct, quantity: 1 }] : [])
  }

  if (!products.length) {
    return <p>No products assigned to your account yet. Contact your Reflekt account lead for access.</p>
  }

  return (
    <form className="portal-order-form" onSubmit={handleSubmit}>
      <div className="portal-order-items">
        {items.map((item, index) => (
          <div key={`${item.productId}-${index}`} className="portal-order-row" id={`order-${item.productId}`}>
            <label>
              <span>Product</span>
              <select value={item.productId} onChange={(event) => updateItem(index, { productId: event.target.value })}>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.sku})
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Quantity</span>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })}
              />
            </label>
            {items.length > 1 ? (
              <button type="button" className="portal-remove-row" onClick={() => removeItem(index)}>
                Remove
              </button>
            ) : null}
          </div>
        ))}
      </div>

      <button type="button" className="portal-add-row" onClick={addItem}>
        + Add another item
      </button>

      <label className="portal-notes">
        <span>Notes for the Reflekt team</span>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Timeline, delivery details, or specs" />
      </label>

      {error ? <p className="portal-error">{error}</p> : null}
      {feedback ? <p className="portal-success">{feedback}</p> : null}

      <button type="submit" className="button" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit order request'}
      </button>
    </form>
  )
}
