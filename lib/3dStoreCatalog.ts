import fs from 'node:fs'
import path from 'node:path'

const PLACEHOLDER_IMAGE = '/3d-products/reflekt-coming-soon.svg'
const PRODUCT_IMAGE_MAP: Record<string, string> = {
  'RB-CAS-MFH-1': '/3d-products/Cascade Mini Football Helmet.png',
  'RB-CAS-HC-1': '/3d-products/Cascade Hype Chain.png'
}

export type StoreCatalogProduct = {
  brand: string
  name: string
  sku: string
  price: number
  priceDisplay: string
  leadTime: string
  caption: string
  description: string
  image: string
  specs: string[]
}

export type StoreCatalogCategory = {
  name: string
  products: StoreCatalogProduct[]
}

export type StoreCatalogProductWithCategory = StoreCatalogProduct & {
  category: string
}

export type StoreCatalogData = {
  catalog: StoreCatalogCategory[]
  brands: string[]
  flatProducts: StoreCatalogProductWithCategory[]
}

type CsvRow = Record<string, string>

let cachedCatalog: StoreCatalogData | null = null

export function loadStoreCatalog(): StoreCatalogData {
  if (process.env.NODE_ENV !== 'production') {
    cachedCatalog = null
  }

  if (cachedCatalog) {
    return cachedCatalog
  }

  const csvPath = path.join(process.cwd(), 'data', '3d-product-store-template.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf8')
  const csvRows = parseCsv(csvContent)
  const rowObjects = toCsvRowObjects(csvRows)

  if (rowObjects.length === 0) {
    cachedCatalog = { catalog: [], brands: [], flatProducts: [] }
    return cachedCatalog
  }

  const products = rowObjects
    .map((row) => mapCsvRowToProduct(row))
    .filter((product): product is StoreCatalogProductWithCategory => Boolean(product))

  const categoriesMap = new Map<string, StoreCatalogProduct[]>()
  products.forEach(({ category, ...product }) => {
    const categoryName = category || 'Uncategorized'
    const existingProducts = categoriesMap.get(categoryName) ?? []
    existingProducts.push(product)
    categoriesMap.set(categoryName, existingProducts)
  })

  const catalog: StoreCatalogCategory[] = Array.from(categoriesMap.entries()).map(([name, products]) => ({
    name,
    products
  }))

  const brands = Array.from(
    new Set(
      products
        .map((product) => product.brand)
        .filter((brand): brand is string => Boolean(brand?.trim()))
    )
  )

  cachedCatalog = {
    catalog,
    brands,
    flatProducts: products
  }

  return cachedCatalog
}

function mapCsvRowToProduct(row: CsvRow): StoreCatalogProductWithCategory | null {
  const brand = getValue(row, 'brand')
  const category = getValue(row, 'category')
  const product = getValue(row, 'product')
  const sku = getValue(row, 'sku')
  const priceRaw = getValue(row, 'price')
  const priceDisplayRaw = getValue(row, 'price display')
  const leadTime = getValue(row, 'lead time')
  const caption = getValue(row, 'caption')
  const description = getValue(row, 'description')
  const imageRaw = getValue(row, 'image')
  const specsRaw = getValue(row, 'specs (pipe separated)') || getValue(row, 'specs')

  if (!product.trim()) {
    return null
  }

  const numericPrice = parseFloat(priceRaw.replace(/[^0-9.]/g, '')) || 0
  const specs =
    specsRaw
      ?.split('|')
      .map((spec) => spec.trim())
      .filter(Boolean) ?? []

  const skuValue = sku.trim()
  const productName = product.trim()

  const sanitizedImage = sanitizeImagePath(imageRaw)
  const mappedImage = PRODUCT_IMAGE_MAP[skuValue] ?? PRODUCT_IMAGE_MAP[productName]
  const finalImage = mappedImage ?? sanitizedImage
  const priceDisplay = priceDisplayRaw.trim() || (numericPrice ? `$${numericPrice.toFixed(2)}` : 'Custom quoted')

  return {
    brand: brand.trim(),
    name: productName,
    sku: skuValue,
    price: numericPrice,
    priceDisplay,
    leadTime: leadTime.trim(),
    caption: caption.trim(),
    description: description.trim(),
    image: finalImage,
    specs,
    category: category.trim()
  }
}

function sanitizeImagePath(raw: string): string {
  const cleaned = raw.replace(/"/g, '').trim()
  if (!cleaned) {
    return PLACEHOLDER_IMAGE
  }
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

function parseCsv(content: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentCell = ''
  let inQuotes = false
  let i = 0

  while (i < content.length) {
    const char = content[i]
    const nextChar = content[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell)
      currentCell = ''
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i += 1
      }
      currentRow.push(currentCell)
      rows.push(currentRow)
      currentRow = []
      currentCell = ''
    } else {
      currentCell += char
    }

    i += 1
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell)
    rows.push(currentRow)
  }

  return rows
}

function toCsvRowObjects(rows: string[][]): CsvRow[] {
  if (rows.length <= 1) {
    return []
  }

  const header = rows[0].map(normalizeKey)
  return rows
    .slice(1)
    .map((row) => {
      const record: CsvRow = {}
      header.forEach((key, index) => {
        if (!key) return
        record[key] = (row[index] ?? '').trim()
      })
      return record
    })
    .filter((record) => Object.values(record).some((value) => value.length > 0))
}

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/\s+/g, ' ')
}

function getValue(row: CsvRow, key: string): string {
  return row[normalizeKey(key)] ?? ''
}
