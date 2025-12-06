'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState, type ChangeEvent } from 'react'

import type { StoreCatalogProductWithCategory } from '@/lib/3dStoreCatalog'

type StoreProductSelectorProps = {
  products: StoreCatalogProductWithCategory[]
  brands: string[]
  onAddToOrder?: (product: StoreCatalogProductWithCategory) => void
}

export default function StoreProductSelector({ products, brands, onAddToOrder }: StoreProductSelectorProps) {
  const brandOptions = brands.length ? brands : buildBrandList(products)
  const defaultBrand = brandOptions[0] ?? products[0]?.brand ?? ''
  const defaultCategory = getFirstCategory(defaultBrand, products)
  const defaultProductName = getFirstProductName(defaultBrand, defaultCategory, products)

  const [selectedBrand, setSelectedBrand] = useState(defaultBrand)
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)
  const [selectedProductName, setSelectedProductName] = useState(defaultProductName)

  const availableCategories = useMemo(() => getCategoriesForBrand(selectedBrand, products), [selectedBrand, products])
  const matchedProducts = useMemo(
    () => getProductsForSelection(selectedBrand, selectedCategory, products),
    [selectedBrand, selectedCategory, products]
  )

  useEffect(() => {
    if (!availableCategories.includes(selectedCategory)) {
      setSelectedCategory(availableCategories[0] ?? '')
    }
  }, [availableCategories, selectedCategory])

  useEffect(() => {
    if (!matchedProducts.some((product) => product.name === selectedProductName)) {
      setSelectedProductName(matchedProducts[0]?.name ?? '')
    }
  }, [matchedProducts, selectedProductName])

  const activeProduct = matchedProducts.find((product) => product.name === selectedProductName)
  const disableAddToOrder = !onAddToOrder || !activeProduct

  function handleBrandChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedBrand(event.target.value)
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(event.target.value)
  }

  function handleProductChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedProductName(event.target.value)
  }

  function handleAddToOrder() {
    if (!activeProduct || !onAddToOrder) return
    onAddToOrder(activeProduct)
  }

  return (
    <div className="store-selector">
      <div className="store-filters">
        <label className="store-filter">
          <span>Brand</span>
          <select value={selectedBrand} onChange={handleBrandChange}>
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
        <label className="store-filter">
          <span>Category</span>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="store-filter">
          <span>Product</span>
          <select value={selectedProductName} onChange={handleProductChange}>
            {matchedProducts.length ? (
              matchedProducts.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.name}
                </option>
              ))
            ) : (
              <option value="">No products</option>
            )}
          </select>
        </label>
      </div>

      {activeProduct ? (
        <article className="store-card store-card--selector">
          <div className="store-card-media">
            {activeProduct.image ? (
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            ) : null}
          </div>
          <div className="store-card-body">
            <span className="store-card-caption">{activeProduct.caption}</span>
            <h2>{activeProduct.name}</h2>
            <p className="store-card-price">{activeProduct.priceDisplay}</p>
            <p>{activeProduct.description}</p>
            <ul className="store-card-specs">
              {activeProduct.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <p className="store-card-lead">{activeProduct.leadTime}</p>
            <p className="store-card-note">
              * Product images are for visual reference, final product may have slight variation *
            </p>
            <button type="button" className="button" onClick={handleAddToOrder} disabled={disableAddToOrder}>
              Add to order
            </button>
          </div>
        </article>
      ) : (
        <div className="store-empty">
          <p>No products found for that combination. Try selecting a different brand or category.</p>
        </div>
      )}
    </div>
  )
}

function getCategoriesForBrand(brand: string, products: StoreCatalogProductWithCategory[]): string[] {
  const filtered = products.filter((product) => (brand ? product.brand === brand : true))
  const source = filtered.length ? filtered : products
  return Array.from(new Set(source.map((product) => product.category).filter(Boolean)))
}

function getProductsForSelection(
  brand: string,
  category: string,
  products: StoreCatalogProductWithCategory[]
): StoreCatalogProductWithCategory[] {
  return products.filter((product) => {
    const matchesBrand = brand ? product.brand === brand : true
    const matchesCategory = category ? product.category === category : true
    return matchesBrand && matchesCategory
  })
}

function getFirstCategory(brand: string, products: StoreCatalogProductWithCategory[]): string {
  const categories = getCategoriesForBrand(brand, products)
  return categories[0] ?? ''
}

function getFirstProductName(brand: string, category: string, products: StoreCatalogProductWithCategory[]): string {
  const matches = getProductsForSelection(brand, category, products)
  return matches[0]?.name ?? ''
}

function buildBrandList(products: StoreCatalogProductWithCategory[]): string[] {
  return Array.from(new Set(products.map((product) => product.brand).filter(Boolean)))
}
