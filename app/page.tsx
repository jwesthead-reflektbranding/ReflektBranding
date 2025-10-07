'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

import ExecutiveCard, { type Executive } from '@/components/ExecutiveCard'
import type { BlogPost } from '@/lib/blog'

type BlogPreview = Pick<BlogPost, 'slug' | 'title' | 'excerpt' | 'date' | 'heroImage'>

const whyUsHighlights = [
  { copy: 'Complete brand identity systems, not just logos.' },
  { copy: 'Creative direction backed by strategy and experience.' },
  { copy: 'Proven results for businesses in Indianapolis and beyond.' },
  { copy: 'Scalable services and product options for local and national accounts.' }
]

const serviceSuites = [
  {
    name: 'Branding & Identity Design',
    copy: 'Logo systems, typography, and visual standards that keep every touchpoint unmistakably on-brand.'
  },
  {
    name: 'Social Media & Content Management',
    copy:
      'Channel strategy, content calendars, and asset creation to keep your feeds active and aligned with the brand.'
  },
  {
    name: 'Website & Digital Design',
    copy: 'Responsive sites, landing pages, and digital assets built to convert and carry your story online.'
  },
  {
    name: 'Print & Promotional Materials',
    copy:
      'Small-format print, signage, apparel, tradeshow displays, and promo pieces produced with precise color control and finish.'
  },
  {
    name: 'Vehicle Graphics & Wraps',
    copy:
      'Fleet and specialty vehicle treatments, from full wraps to spot graphics, built to extend your brand on the move.'
  },
  {
    name: 'Strategy & Consulting',
    copy:
      'Workshops, audits, and on-call advisory support that align stakeholders and guide long-term brand moves.'
  }
]

const inquiryMailto =
  'mailto:team@reflektbranding.com?subject=Reflekt%20Branding%20Customer%20Inquiry&body=Thank%20you%20for%20your%20interest%20in%20Reflekt%20Branding.%20Tell%20us%20a%20little%20about%20who%20you%20are%20and%20a%20little%20about%20your%20project%20request.%20We%20will%20be%20in%20touch%20soon!'

const brandInsights = [
  'Brand Recognition & Awareness',
  'It takes 5–7 impressions for people to remember a brand.',
  'Color boosts brand recognition by up to 80%.',
  'Consistent branding can increase revenue by up to 23%.',
  'People remember 80% of what they see, but only 20% of what they read.',
  'The average person is exposed to 6,000–10,000 brand messages per day.',
  '59% of people prefer to buy from brands they recognize, even if cheaper options exist.',
  'A consistent brand presentation makes you 3.5x more likely to achieve strong visibility.',
  '23% higher visibility comes from maintaining consistent branding.',
  '94% of first impressions about a business are design-related.',
  'It takes just 0.05 seconds for someone to form a brand impression.',
  'Trust & Credibility',
  '81% of consumers say they must trust a brand before buying from it.',
  '46% of consumers will pay more for a brand they trust.',
  '71% of consumers prefer brands that align with their values.',
  'Brands with strong reputations recover twice as fast from crises.',
  '75% of consumers believe brand consistency builds trust.',
  '82% of investors consider brand strength a major decision factor.',
  '60% of millennials expect brands to be consistent across all channels.',
  '63% of consumers stop buying if they perceive a brand negatively.',
  '45% of a brand’s image is tied to what it communicates and how.',
  'Businesses with strong branding grow 2.5x faster than those without.',
  'Emotional Connection & Loyalty',
  '95% of purchasing decisions are subconscious and driven by emotion.',
  'Customers emotionally connected to brands are 52% more valuable.',
  'Brands that evoke strong emotions see 85% higher sales growth.',
  '86% of consumers say authenticity matters when choosing brands.',
  '91% of consumers stay loyal to brands that personalize experiences.',
  '88% of consumers say authenticity determines brand loyalty.',
  '73% of people love brands because of great service, not just product.',
  'Emotionally connected customers have a 306% higher lifetime value.',
  '70% of brand perception is shaped by experiences, not ads.',
  '77% of consumers buy from brands they share values with.',
  'Impressions & Exposure',
  'On average, people need seven brand exposures before taking action.',
  'Paid and organic impressions together improve brand recall by 2.8x.',
  'Consistent exposure across channels builds 3x more recognition.',
  '89% of marketers rank brand awareness as their top priority.',
  'Companies with strong digital branding get 2.5x more impressions per dollar spent.',
  '92% of consumers check a brand’s presence before purchasing.',
  '70% of brand interactions now happen online first.',
  'Impressions from physical branding can reach tens of thousands daily.',
  'Strong visuals improve processing speed by 60,000x over text.',
  '60% of consumers avoid brands with unattractive logos.',
  'Perception & Differentiation',
  '64% of consumers cite shared values as their main reason for choosing a brand.',
  '88% of consumers research a brand before buying to judge credibility.',
  'Brands perceived as “authentic” outperform competitors by 2.4x.',
  '86% of buyers are willing to pay more for better experiences.',
  '71% of consumers recommend brands that reflect their personality.',
  '91% of consumers want brands to be transparent in their communication.',
  '60% of consumers say their perception is influenced more by actions than advertising.',
  'Brands that maintain consistent messaging across channels see a 20% lift in purchase intent.',
  '95% of consumers talk about brands they perceive positively.',
  'A consistent identity across all platforms makes a brand appear 4x more professional.',
  'Long-Term Impact & Growth',
  'Strong branding can reduce customer acquisition costs by as much as 50%.',
  'Companies with high brand equity outperform stock market averages by 30%.'
]

const executives: Executive[] = [
  {
    name: 'Justin Westhead',
    role: 'President & Brand Strategist',
    bio: [
      'Justin Westhead is a seasoned branding strategist with decades of experience helping businesses amplify their presence through impactful design and messaging. As Director of Business for a national fleet branding company, he led initiatives that transformed fleet graphics into powerful marketing tools, driving visibility across the country. His approach combines creative vision with disciplined execution, ensuring every branding solution looks exceptional and delivers measurable results.'
    ],
    imageSrc: '/executives/justin-westhead.png',
    email: 'JWesthead@reflektbranding.com'
  },
  {
    name: 'Cassie Bear',
    role: 'Vice President & Client Experience Lead',
    bio: [
      'Cassie Bear brings a decade of experience in customer engagement, account management, and project coordination to Reflekt Branding. With a background rooted in relationship-building and a degree in Data Analytics, she blends human connection with data-driven insight to deliver seamless brand experiences. Cassie ensures every client feels supported, understood, and empowered throughout the branding journey.'
    ],
    imageSrc: '/executives/cassie-bear.png',
    email: 'CBear@reflektbranding.com'
  }
]

const HERO_BACKGROUND_COUNT = 17

const heroBackgrounds = Array.from({ length: HERO_BACKGROUND_COUNT }, (_, index) => {
  const frame = index + 1
  return {
    src: `/hero/Hero%20Image%20${frame}.jpg`,
    alt: `Reflekt branded hero visual ${frame}`
  }
})

const INSIGHTS_PIXELS_PER_SECOND = 275

function renderInsight(text: string): ReactNode {
  const highlightPattern = /\d[\d.,–-]*(?:%|x)?/g
  const matches = [...text.matchAll(highlightPattern)]

  if (matches.length === 0) {
    return text
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0

  matches.forEach((match, index) => {
    const [value] = match
    const start = match.index ?? 0

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start))
    }

    nodes.push(
      <span key={`${value}-${start}-${index}`} className="insights-highlight">
        {value}
      </span>
    )

    lastIndex = start + value.length
  })

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<BlogPreview[]>([])
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true)
  const insightsTrackRef = useRef<HTMLDivElement>(null)
  const insightsItems = useMemo(() => [...brandInsights, ...brandInsights], [])
  const proofIconSlides = useMemo(
    () => [
      { src: '/logo-dumpsterdash-2.png', alt: 'Dumpster Dash logo' },
      { src: '/logo-dumphawk-1.png', alt: 'Dump Hawk Logistics logo' },
      { src: '/logo-firelinemedia.png', alt: 'Fireline Media logo' },
      { src: '/logo-locadm.png', alt: 'LocaDM logo' },
      { src: '/logo-wilsoncrouse.png', alt: 'Wilson Crouse Concrete logo' }
    ],
    []
  )
  const testimonialSlides = useMemo(
    () => [
      {
        quote:
          'Reflekt really helped take my brand to the next level. Justin was able to bring my ideas to life and even made great suggestions to revitalize our branding moving forward.',
        name: 'Craig Zupan',
        title: 'Owner'
      },
      {
        quote:
          'I was really impressed with what Reflekt proposed for a complete brand overhaul. Our company perception drastically improved across our brand, apparel, and vehicle graphics.',
        name: 'Jeremy Crouse',
        title: 'Co-Owner'
      },
      {
        quote:
          'The combined experience that Reflekt Branding brings is evident when working with the team. Every issue I have previously encountered is met with a variety of solutions, from digital formats to printed products.',
        name: 'Kevin Studley',
        title: 'Multi-Business Owner'
      }
    ],
    []
  )
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const testimonialIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/latest?count=6')
        if (!response.ok) throw new Error(`Failed to load posts (${response.status})`)
        const data: BlogPreview[] = await response.json()
        if (!cancelled) setLatestPosts(data)
      } catch (error) {
        console.error(error)
      } finally {
        if (!cancelled) setLoadingPosts(false)
      }
    }

    fetchPosts()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const track = insightsTrackRef.current
    if (!track) return

    let position = 0
    let lastTimestamp: number | null = null
    let frameId: number

    const step = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp
        frameId = window.requestAnimationFrame(step)
        return
      }

      const delta = timestamp - lastTimestamp
      const distance = (INSIGHTS_PIXELS_PER_SECOND * delta) / 1000
      position -= distance

      const halfWidth = track.scrollWidth / 2
      if (halfWidth > 0 && -position >= halfWidth) {
        position += halfWidth
      }

      track.style.transform = `translateX(${position}px)`
      lastTimestamp = timestamp
      frameId = window.requestAnimationFrame(step)
    }

    track.style.transform = 'translateX(0px)'
    frameId = window.requestAnimationFrame(step)

    const handleResize = () => {
      position = 0
      lastTimestamp = null
      track.style.transform = 'translateX(0px)'
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [insightsItems])

  const resetTestimonialAutoplay = useCallback(() => {
    if (testimonialIntervalRef.current !== null) {
      window.clearInterval(testimonialIntervalRef.current)
      testimonialIntervalRef.current = null
    }

    testimonialIntervalRef.current = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialSlides.length)
    }, 6000)
  }, [testimonialSlides.length])

  const nextTestimonial = () => {
    resetTestimonialAutoplay()
    setActiveTestimonial((prev) => (prev + 1) % testimonialSlides.length)
  }

  const prevTestimonial = () => {
    resetTestimonialAutoplay()
    setActiveTestimonial((prev) => (prev - 1 + testimonialSlides.length) % testimonialSlides.length)
  }

  useEffect(() => {
    resetTestimonialAutoplay()

    return () => {
      if (testimonialIntervalRef.current !== null) {
        window.clearInterval(testimonialIntervalRef.current)
        testimonialIntervalRef.current = null
      }
    }
  }, [resetTestimonialAutoplay])

  return (
    <>
      <main>
        <section className="hero-eyebrow">
          <div className="container hero-eyebrow-container">
            <div className="hero-pill">ONE STOP END-TO-END BRANDING SHOP</div>
          </div>
        </section>

        <section id="reflekt" className="hero">
          <div className="hero-background" aria-hidden>
            {heroBackgrounds.map((image, index) => (
              <div
                key={image.src}
                className="hero-background-layer"
                style={{ animationDelay: `${index * 8}s` }}
                aria-hidden
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
            <div className="hero-background-overlay" />
          </div>

          <div className="container hero-container">
            <h1>
              <span className="hero-heading-leading">We Build Brands That Demand</span>
              <br />
              Attention
            </h1>
            <p>Precision-crafted brand systems and experiential rollouts that feel cohesive, considered, and completely you—everywhere your audience meets your message.</p>
          </div>
        </section>

        <section className="hero-actions">
          <div className="container hero-actions-container">
            <div className="hero-actions-cta">
              <a href={inquiryMailto} className="button">
                Contact us via email
              </a>
              <Link
                href="#services"
                className="button"
                style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)', color: 'var(--foreground)' }}
              >
                Explore services
              </Link>
            </div>
            <div className="hero-media">
              <div className="hero-media-inner">
                <div className="hero-stat">
                  <h3>20+ Years</h3>
                  <p>Fleet, experiential, and large-format branding expertise.</p>
                </div>
                <div className="hero-stat">
                  <h3>End-to-End</h3>
                  <p>Strategy, design, production, installation, and care.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Who we are</span>
              <h2 className="section-title">One partner for fearless, full-spectrum branding.</h2>
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p>
                  At Reflekt Branding, our story begins with a clear purpose — to help businesses break free from outdated,
                  forgettable identities and reflect their true potential. We build bold, strategic identities that connect, inspire,
                  and perform, creating cohesive brand systems that stand out in a crowded market and speak with clarity and
                  confidence.
                </p>
                <p>
                  Led by Justin Westhead, our team combines strategy, creativity, and execution from visual design to final
                  production. We align every touchpoint while offering revitalization consulting that elevates brand presence. Ready
                  to begin your transformation? Contact us to start the journey.
                </p>
              </div>
              <div className="about-brand">
                <Image
                  src="/reflekt-logo-wordmark.png"
                  alt="Reflekt Branding"
                  width={640}
                  height={152}
                  style={{ width: '100%', height: 'auto', maxWidth: '680px' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="why-us">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Why us</span>
              <h2 className="section-title">Every sense, orchestrated without friction.</h2>
            </div>

            <div className="why-grid">
              <div className="why-intro">
                <p>
                  Strategy-led creative that scales with your ambitions. We build enduring identities, cohesive systems, and roll-out
                  plans that drive awareness—on the street, on screen, and everywhere in between.
                </p>
              </div>
              <div className="why-cards">
                {whyUsHighlights.map((item) => (
                  <article key={item.copy} className="why-card">
                    <span className="why-check" aria-hidden>✓</span>
                    <p className="why-card-copy">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="brand-insights">
          <div className="container">
            <div className="section-heading" style={{ textAlign: 'center' }}>
              <span className="section-eyebrow">Brand insights</span>
            </div>

            <div className="insights-marquee" role="region" aria-live="polite">
              <div className="insights-track" ref={insightsTrackRef}>
                {insightsItems.map((insight, index) => (
                  <span key={`${insight}-${index}`} className="insights-item">
                    {renderInsight(insight)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Services</span>
              <h2 className="section-title section-title-tight">Capabilities built to move your brand forward.</h2>
              <p className="section-copy" style={{ textAlign: 'center' }}>
                Full-service branding, digital, and experiential design built to keep your presence sharp, consistent, and
                unmistakable across every touchpoint.
              </p>
            </div>

            <div className="tiered-layout">
              <div className="tiered-row">
                {serviceSuites.map((suite) => (
                  <article key={suite.name} className="tier-card">
                    <h3>{suite.name}</h3>
                    <p>{suite.copy}</p>
                    <Link href={inquiryMailto} className="service-cta">
                      Start a project <span aria-hidden>→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="proof">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Trusted by</span>
              <h2 className="section-title">Results that validate bold investments.</h2>
              <p className="section-copy">Evidence from partners who let Reflekt own the continuum from idea to experience.</p>
            </div>

            <div className="proof-logo-grid">
              {proofIconSlides.map((logo) => (
                <div key={logo.src} className="proof-icon-card">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={320}
                    height={160}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>

            <div className="proof-testimonial">
              <div className="proof-testimonial-slider">
                <div className="proof-testimonial-card">
                  <blockquote>
                    “{testimonialSlides[activeTestimonial].quote}”
                  </blockquote>
                  <cite>
                    <strong>{testimonialSlides[activeTestimonial].name}</strong>
                    {testimonialSlides[activeTestimonial].title && (
                      <span className="proof-title">{testimonialSlides[activeTestimonial].title}</span>
                    )}
                  </cite>
                  <div className="proof-nav-group">
                    <button type="button" className="proof-nav" onClick={prevTestimonial} aria-label="Previous testimonial">
                      ←
                    </button>
                    <button type="button" className="proof-nav" onClick={nextTestimonial} aria-label="Next testimonial">
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="blog">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Insights & Stories</span>
              <h2 className="section-title">Latest From The Blog</h2>
              <p className="section-copy">
                Dive into strategy guides, creative inspiration, and behind-the-scenes looks at how we build brands that demand
                attention.
              </p>
              <div className="section-cta">
                <Link href="/blog" className="button" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 0, 0, 0.45)', color: 'var(--accent)' }}>
                  View all articles
                </Link>
              </div>
            </div>

            <div className="feature-grid blog-latest-grid">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="feature-card-link">
                    <article className="feature-card" style={{ gap: '0.85rem' }}>
                      {post.heroImage ? (
                        <div className="feature-card-media">
                          <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 360px"
                            style={{ objectFit: 'cover' }}
                            unoptimized={post.heroImage.startsWith('http')}
                          />
                        </div>
                      ) : null}
                      <h3>{post.title}</h3>
                      <time
                        dateTime={post.date}
                        style={{
                          fontSize: '0.65rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.45)'
                        }}
                      >
                        {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.date))}
                      </time>
                      <p>{post.excerpt}</p>
                      <span
                        style={{
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          color: 'var(--accent)'
                        }}
                      >
                        READ ARTICLE →
                      </span>
                    </article>
                  </Link>
                ))
              ) : loadingPosts ? (
                <p style={{ color: 'rgba(255,255,255,0.55)', gridColumn: '1 / -1', textAlign: 'center' }}>Loading posts…</p>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.55)', gridColumn: '1 / -1', textAlign: 'center' }}>
                  No posts available yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="section" id="executives">
          <div className="container">
            <div className="section-heading" style={{ textAlign: 'center' }}>
              <span className="section-eyebrow">Meet the executives</span>
              <h2 className="section-title">Leadership with purpose.</h2>
              <p className="section-copy" style={{ maxWidth: '640px', margin: '0 auto' }}>
                Executives obsessed with making brands impossible to ignore—strategy, execution, and accountability without the
                fluff.
              </p>
            </div>

            <div className="executives-grid">
              {executives.map((exec) => (
                <ExecutiveCard key={exec.name} {...exec} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--red" id="contact">
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="section-heading" style={{ alignItems: 'center', justifyItems: 'center' }}>
              <span className="section-eyebrow">Ready to be seen?</span>
              <h2 className="section-title">Let&apos;s build your next evolution.&nbsp;</h2>
              <p className="section-copy" style={{ maxWidth: '640px', textAlign: 'center', margin: '0 auto' }}>
                Share a few details with us about your project or challenge and we&apos;ll reach out to plan the next steps for your
                Reflekt Branding experience.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <Link href={inquiryMailto} className="button">
                TEAM@REFLEKTBRANDING.COM
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
