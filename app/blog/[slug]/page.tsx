import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAllPosts, getPostBySlug } from '@/lib/blog'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: post.title,
    description: post.excerpt
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', maxWidth: '820px' }}>
      <nav style={{ marginBottom: '2rem', fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Home
        </Link>{' '}
        /{' '}
        <Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Blog
        </Link>{' '}
        / <span style={{ color: 'rgba(255,255,255,0.85)' }}>{post.title}</span>
      </nav>

      <article className="blog-article">
        <header className="blog-article-header">
          <span className="section-eyebrow" style={{ textAlign: 'left' }}>
            Published {formatDate(post.date)}
          </span>
          <h1 className="section-title" style={{ whiteSpace: 'normal' }}>
            {post.title}
          </h1>
          {post.heroImage ? (
            <div className="blog-hero">
              <Image
                src={post.heroImage}
                alt={post.title}
                className="blog-hero-img"
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 820px"
              />
            </div>
          ) : null}
        </header>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}
