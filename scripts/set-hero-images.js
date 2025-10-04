const fs = require('fs/promises')
const path = require('path')

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const PUBLIC_DIR = path.join(process.cwd(), 'public/blog')

async function updateHeroImage(slug, filename) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  try {
    const file = await fs.readFile(filePath, 'utf8')
    const heroPath = `/blog/${slug}/${filename}`
    const updated = file.replace(/heroImage:\s*""/, `heroImage: "${heroPath}"`)
    if (updated !== file) {
      await fs.writeFile(filePath, updated, 'utf8')
      console.log(`Updated heroImage for ${slug}`)
    }
  } catch (err) {
    console.warn(`Skipping ${slug}: ${err.message}`)
  }
}

async function run() {
  const slugs = await fs.readdir(PUBLIC_DIR)
  for (const slug of slugs) {
    const folder = path.join(PUBLIC_DIR, slug)
    const stats = await fs.stat(folder)
    if (!stats.isDirectory()) continue
    const files = (await fs.readdir(folder)).filter((file) => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
    if (files.length === 0) continue
    await updateHeroImage(slug, files[0])
  }

  console.log('Done setting hero images.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
