'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'

import type { StoreCatalogCategory, StoreCatalogProduct, StoreCatalogProductWithCategory } from '@/lib/3dStoreCatalog'
import { US_STATES } from '@/lib/usStates'

type ProductLine = {
  brand: string
  category: string
  product: string
  sku: string
  quantity: string
  price: string
}

type ShippingOption = 'pickup' | 'same' | 'custom'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  shippingOption: ShippingOption
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZip: string
}

type StoreOrderFormProps = {
  catalog: StoreCatalogCategory[]
  brands: string[]
  queuedProduct?: { product: StoreCatalogProductWithCategory; requestId: number } | null
}

function buildInitialFormState(): FormState {
  return {
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    shippingOption: 'pickup',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: ''
  }
}

export default function StoreOrderForm({ catalog, brands, queuedProduct }: StoreOrderFormProps) {
  const defaultBrand = brands[0] ?? 'Reflekt Originals'

  function createProductLine(brand = defaultBrand, categoryName?: string): ProductLine {
    const categoryOptions = getCategoriesForBrand(catalog, brand)
    const fallbackCategory = catalog[0]?.name ?? ''
    const resolvedCategory = (() => {
      if (categoryOptions.length) {
        if (categoryName && categoryOptions.includes(categoryName)) return categoryName
        return categoryOptions[0]
      }
      if (categoryName && catalog.some((category) => category.name === categoryName)) {
        return categoryName
      }
      return fallbackCategory
    })()

    const products = getProductsForSelection(catalog, brand, resolvedCategory)
    const product = products[0]
    return {
      brand: brand || product?.brand || defaultBrand,
      category: resolvedCategory || '',
      product: product?.name ?? '',
      sku: product?.sku ?? '',
      quantity: '1',
      price: product?.priceDisplay ?? ''
    }
  }

  function createProductLineFromCatalogProduct(product: StoreCatalogProductWithCategory): ProductLine {
    return {
      brand: product.brand || defaultBrand,
      category: product.category || '',
      product: product.name,
      sku: product.sku ?? '',
      quantity: '1',
      price: product.priceDisplay ?? ''
    }
  }

  const [formState, setFormState] = useState<FormState>(() => buildInitialFormState())
  const [productLines, setProductLines] = useState<ProductLine[]>(() => [])
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  function resetSubmissionState() {
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setSubmitError(null)
    }
  }

  useEffect(() => {
    if (!showSuccessModal) return
    const timeout = setTimeout(() => {
      setShowSuccessModal(false)
    }, 4000)
    return () => clearTimeout(timeout)
  }, [showSuccessModal])

  useEffect(() => {
    if (!queuedProduct) return
    resetSubmissionState()
    setProductLines((prev) => [...prev, createProductLineFromCatalogProduct(queuedProduct.product)])
  }, [queuedProduct])

  const isDisabled = useMemo(() => {
    if (productLines.length === 0) {
      return true
    }

    const missingContact =
      !formState.name ||
      !formState.email ||
      !formState.phone ||
      !formState.address ||
      !formState.city ||
      !formState.state ||
      !formState.zip

    const missingShippingCustom =
      formState.shippingOption === 'custom' &&
      (!formState.shippingAddress || !formState.shippingCity || !formState.shippingState || !formState.shippingZip)

    if (missingContact || missingShippingCustom) {
      return true
    }

    return productLines.some((line) => !line.brand || !line.category || !line.product || !line.quantity || !line.price)
  }, [formState, productLines])

  const isSubmitDisabled = isDisabled || submitStatus === 'submitting'

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target
    resetSubmissionState()
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  function handleShippingOptionChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as ShippingOption
    resetSubmissionState()
    setFormState((prev) => ({
      ...prev,
      shippingOption: value,
      ...(value !== 'custom'
        ? { shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' }
        : {})
    }))
  }

  function handleProductLineChange(index: number, field: keyof ProductLine, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value } = event.target
    resetSubmissionState()

    setProductLines((prev) =>
      prev.map((line, lineIndex) => {
        if (lineIndex !== index) return line

        if (field === 'brand') {
          const categories = getCategoriesForBrand(catalog, value)
          const nextCategory = categories.includes(line.category) ? line.category : categories[0] ?? ''
          const products = getProductsForSelection(catalog, value, nextCategory)
          const nextProduct = products.find((product) => product.name === line.product) ?? products[0]
          return {
            ...line,
            brand: value,
            category: nextCategory,
            product: nextProduct?.name ?? '',
            sku: nextProduct?.sku ?? '',
            price: nextProduct?.priceDisplay ?? ''
          }
        }

        if (field === 'category') {
          const products = getProductsForSelection(catalog, line.brand, value)
          const nextProduct = products[0]
          return {
            ...line,
            category: value,
            product: nextProduct?.name ?? '',
            sku: nextProduct?.sku ?? '',
            price: nextProduct?.priceDisplay ?? ''
          }
        }

        if (field === 'product') {
          const product = getProductsForSelection(catalog, line.brand, line.category).find((item) => item.name === value)
          return {
            ...line,
            product: value,
            sku: product?.sku ?? '',
            price: product?.priceDisplay ?? ''
          }
        }

        if (field === 'price' || field === 'sku') {
          return line
        }

        return { ...line, [field]: value }
      })
    )
  }

  function addProductLine() {
    resetSubmissionState()
    setProductLines((prev) => [...prev, createProductLine()])
  }

  function removeProductLine(index: number) {
    resetSubmissionState()
    setProductLines((prev) => prev.filter((_, lineIndex) => lineIndex !== index))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isDisabled || submitStatus === 'submitting') return

    setSubmitStatus('submitting')
    setSubmitError(null)

    const payload = {
      name: formState.name,
      company: formState.company,
      email: formState.email,
      phone: formState.phone,
      address: formState.address,
      city: formState.city,
      state: formState.state,
      zip: formState.zip,
      shippingOption: formState.shippingOption,
      shippingAddress: formState.shippingAddress,
      shippingCity: formState.shippingCity,
      shippingState: formState.shippingState,
      shippingZip: formState.shippingZip,
      products: productLines.map((line) => ({
        brand: line.brand,
        category: line.category,
        product: line.product,
        sku: line.sku,
        quantity: line.quantity.trim(),
        price: line.price
      }))
    }

    try {
      const response = await fetch('/api/store-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(typeof data?.error === 'string' ? data.error : 'Unable to submit your order right now.')
      }

      setSubmitStatus('success')
      setFormState(buildInitialFormState())
      setProductLines([])
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Failed to submit store order', error)
      setSubmitStatus('error')
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your order right now.')
    }
  }

  return (
    <form className="store-order-form" onSubmit={handleSubmit}>
      <div className="store-order-grid">
        <label className="store-order-field store-order-field--name">
          <span>Full name *</span>
          <input type="text" name="name" value={formState.name} onChange={handleChange} required />
        </label>
        <label className="store-order-field store-order-field--email">
          <span>Email *</span>
          <input type="email" name="email" value={formState.email} onChange={handleChange} required />
        </label>
        <label className="store-order-field store-order-field--phone">
          <span>Phone *</span>
          <input type="tel" name="phone" value={formState.phone} onChange={handleChange} required />
        </label>
        <label className="store-order-field store-order-field--address">
          <span>Billing address *</span>
          <input type="text" name="address" value={formState.address} onChange={handleChange} required />
        </label>
        <label className="store-order-field store-order-field--city">
          <span>City *</span>
          <input type="text" name="city" value={formState.city} onChange={handleChange} required />
        </label>
        <label className="store-order-field store-order-field--state">
          <span>State *</span>
          <select name="state" value={formState.state} onChange={handleChange} required>
            <option value="">Select</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label className="store-order-field store-order-field--zip">
          <span>ZIP *</span>
          <input type="text" name="zip" value={formState.zip} onChange={handleChange} required />
        </label>
        <label className="store-order-field store-order-field--company">
          <span>Company</span>
          <input type="text" name="company" value={formState.company} onChange={handleChange} />
        </label>
      </div>
      <div className="store-order-lines">
        <p className="store-order-lines-heading">Products *</p>
        {productLines.map((line, index) => (
          <div className="store-order-line" key={`product-line-${index}`}>
            <label>
              <span>Brand</span>
              <select value={line.brand} onChange={(event) => handleProductLineChange(index, 'brand', event)}>
                {brands.map((brand) => (
                  <option key={`${brand}-${index}`} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Category</span>
              <select value={line.category} onChange={(event) => handleProductLineChange(index, 'category', event)}>
                {getCategoriesForBrand(catalog, line.brand).map((categoryName) => (
                  <option key={`${categoryName}-${index}`} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Product</span>
              <select value={line.product} onChange={(event) => handleProductLineChange(index, 'product', event)}>
                {getProductsForSelection(catalog, line.brand, line.category).map((product) => (
                  <option key={`${product.name}-${index}`} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Quantity</span>
              <input
                type="text"
                value={line.quantity}
                onChange={(event) => handleProductLineChange(index, 'quantity', event)}
                required
              />
            </label>
            <label>
              <span>Price per unit</span>
              <input
                type="text"
                value={line.price}
                readOnly
                aria-readonly="true"
              />
            </label>
            {productLines.length > 1 ? (
              <button
                type="button"
                className="store-order-remove"
                onClick={() => removeProductLine(index)}
                aria-label="Remove product line"
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <button type="button" className="button button-outline store-order-add" onClick={addProductLine}>
          Add a product line
        </button>
      </div>

      <section className="store-shipping">
        <p className="store-shipping-heading">Shipping *</p>
        <div className="store-shipping-options">
          <label className="store-shipping-option">
            <input
              type="radio"
              name="shippingOption"
              value="pickup"
              checked={formState.shippingOption === 'pickup'}
              onChange={handleShippingOptionChange}
            />
            <span>Customer pickup</span>
          </label>
          <label className="store-shipping-option">
            <input
              type="radio"
              name="shippingOption"
              value="same"
              checked={formState.shippingOption === 'same'}
              onChange={handleShippingOptionChange}
            />
            <span>Ship to billing address</span>
          </label>
          <label className="store-shipping-option">
            <input
              type="radio"
              name="shippingOption"
              value="custom"
              checked={formState.shippingOption === 'custom'}
              onChange={handleShippingOptionChange}
            />
            <span>Ship to custom address</span>
          </label>
        </div>

        {formState.shippingOption === 'custom' ? (
          <div className="store-shipping-address">
            <label>
              <span>Shipping address *</span>
              <input
                type="text"
                name="shippingAddress"
                value={formState.shippingAddress}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <span>City *</span>
              <input type="text" name="shippingCity" value={formState.shippingCity} onChange={handleChange} required />
            </label>
            <label>
              <span>State *</span>
              <select name="shippingState" value={formState.shippingState} onChange={handleChange} required>
                <option value="">Select</option>
                {US_STATES.map((state) => (
                  <option key={`shipping-${state}`} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>ZIP *</span>
              <input type="text" name="shippingZip" value={formState.shippingZip} onChange={handleChange} required />
            </label>
          </div>
        ) : null}
      </section>

      {submitStatus === 'success' ? (
        <p className="store-order-status store-order-status--success" role="status">
          Thanks! Your order request is on its way to the Reflekt team. We&apos;ll reach out soon to confirm details.
        </p>
      ) : null}
      {submitStatus === 'error' ? (
        <p className="store-order-status store-order-status--error" role="alert">
          {submitError ?? 'Unable to submit your order right now. Please try again.'}
        </p>
      ) : null}

      <button type="submit" className="button" disabled={isSubmitDisabled}>
        {submitStatus === 'submitting' ? 'Sending…' : 'Email my order request'}
      </button>

      {showSuccessModal ? (
        <div className="store-order-modal" role="status" aria-live="assertive" aria-modal="true">
          <div className="store-order-modal__card">
            <Image src="/reflekt-logo-wordmark.png" alt="Reflekt Branding" width={220} height={48} priority />
            <p>Thank you for submitting your order request.</p>
            <p>
              Your request has been sent to the Reflekt Branding team. We will issue you an official quote for sign off
              as soon as possible.
            </p>
          </div>
        </div>
      ) : null}
    </form>
  )
}

function getCategoriesForBrand(catalog: StoreCatalogCategory[], brand: string): string[] {
  const matches = catalog
    .filter((category) => category.products.some((product) => (brand ? product.brand === brand : true)))
    .map((category) => category.name)
  return matches.length ? matches : catalog.map((category) => category.name)
}

function getProductsForSelection(
  catalog: StoreCatalogCategory[],
  brand: string,
  categoryName: string
): StoreCatalogProduct[] {
  const category = catalog.find((cat) => cat.name === categoryName) ?? catalog[0]
  if (!category) return []
  const filtered = category.products.filter((product) => (brand ? product.brand === brand : true))
  return filtered.length ? filtered : category.products
}
