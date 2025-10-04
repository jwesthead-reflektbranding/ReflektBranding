import { NextResponse } from 'next/server'

import { getLatestPosts } from '@/lib/blog'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const countParam = searchParams.get('count')
  const count = countParam ? Number.parseInt(countParam, 10) || 6 : 6

  const posts = await getLatestPosts(count)

  return NextResponse.json(
      posts.map(({ slug, title, excerpt, date, heroImage }) => ({ slug, title, excerpt, date, heroImage }))
  )
}
