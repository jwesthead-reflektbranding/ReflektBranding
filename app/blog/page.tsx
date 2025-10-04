import Image from 'next/image'
import Link from 'next/link'

import { getAllPosts } from '@/lib/blog'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <>
      <main className="container" style={{ display: 'block', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <header className="section-heading" style={{ textAlign: 'center' }}>
          <span className="section-eyebrow">Insights & Stories</span>
          <h1 className="section-title">All Reflekt Blog Posts</h1>
          <p className="section-copy" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Explore strategy guides, creative inspiration, and behind-the-scenes breakdowns of how we build brands that demand
            attention.
          </p>
        </header>

        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card-link-wrapper">
              <article className="blog-card">
                {post.heroImage ? (
                  <div className="blog-card-media">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                      unoptimized={post.heroImage.startsWith('http')}
                    />
                  </div>
                ) : null}
                <div className="blog-card-body">
                  <h2>{post.title}</h2>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <p>{post.excerpt}</p>
                  <span className="blog-card-link">READ ARTICLE →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
