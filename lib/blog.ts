import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  heroImage: string
  content: string
}

async function readPostFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const file = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(file)

  return {
    slug,
    title: (data.title as string) ?? slug,
    excerpt: (data.excerpt as string) ?? '',
    date: (data.date as string) ?? new Date().toISOString(),
    heroImage: (data.heroImage as string) ?? '',
    content
  } satisfies BlogPost
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => readPostFile(file.replace(/\.mdx$/, '')))
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getLatestPosts(count = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await readPostFile(slug)
  } catch {
    return null
  }
}
