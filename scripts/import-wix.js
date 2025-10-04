const fs = require('fs/promises')
const path = require('path')
const fetch = require('node-fetch').default
const { parseStringPromise } = require('xml2js')

const FEED_URL = 'https://www.reflektbranding.com/blog-feed.xml'
const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const PUBLIC_REF_DIR = path.join(process.cwd(), 'public/blog')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function slugFromLink(link) {
  const parts = link.split('/')
  return parts[parts.length - 1].replace(/[^a-z0-9-]/gi, '-').toLowerCase()
}

function resolveImageUrl(src, origin) {
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  if (src.startsWith('//')) return `https:${src}`
  if (src.startsWith('/')) return `${origin}${src}`
  return src
}

async function downloadImage(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image ${url} (${res.status})`)
  const arrayBuffer = await res.arrayBuffer()
  await fs.writeFile(dest, Buffer.from(arrayBuffer))
}

function buildFrontMatter({ title, date, excerpt, hero }) {
  return `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndate: "${new Date(date).toISOString()}"\nexcerpt: "${excerpt.replace(/"/g, '\\"')}"\nheroImage: "${hero}"\n---\n\n`
}

async function run() {
  await ensureDir(BLOG_DIR)
  await ensureDir(PUBLIC_REF_DIR)

  const res = await fetch(FEED_URL)
  if (!res.ok) throw new Error(`Failed to fetch feed (${res.status})`)

  const xml = await res.text()
  const feed = await parseStringPromise(xml)

  const items = feed?.rss?.channel?.[0]?.item ?? []
  for (const item of items) {
    const title = item.title?.[0] ?? 'Untitled'
    const link = item.link?.[0] ?? ''
    const slug = slugFromLink(link || title)
    const date = item.pubDate?.[0] ?? new Date()
    const rawHtml = item['content:encoded']?.[0] ?? item.description?.[0] ?? ''
    const excerpt = (item.description?.[0] ?? '').replace(/(<([^>]+)>)/gi, '').slice(0, 160)
    const imageDir = path.join(PUBLIC_REF_DIR, slug)
    await ensureDir(imageDir)
    const postOrigin = link ? new URL(link).origin : 'https://www.reflektbranding.com'

    const imageMatches = [...rawHtml.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)]
    let heroImage = ''
    let content = rawHtml
    for (let idx = 0; idx < imageMatches.length; idx++) {
      const originalSrc = imageMatches[idx][1]
      const normalizedUrl = resolveImageUrl(originalSrc, postOrigin)
      try {
        const ext = path.extname(new URL(normalizedUrl).pathname) || '.jpg'
        const filename = `image-${idx}${ext}`
        const localPath = `/blog/${slug}/${filename}`
        await downloadImage(normalizedUrl, path.join(imageDir, filename))
        content = content.replace(originalSrc, localPath)
        if (idx === 0) heroImage = localPath
      } catch (err) {
        console.warn(`Image skipped: ${normalizedUrl}`, err.message)
        if (idx === 0 && !heroImage) {
          heroImage = normalizedUrl
        }
      }
    }

    if (!heroImage) {
      const firstImage = imageMatches[0]?.[1]
      if (firstImage) heroImage = resolveImageUrl(firstImage, postOrigin)
    }

    const frontMatter = buildFrontMatter({ title, date, excerpt, hero: heroImage })
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
    await fs.writeFile(mdxPath, frontMatter + content.trim(), 'utf8')
    console.log(`Imported ${title}`)
  }

  console.log('All posts imported.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
