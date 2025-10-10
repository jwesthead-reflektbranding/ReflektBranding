import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { Montserrat } from 'next/font/google'

import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: {
    default: 'Reflekt Branding | Immersive Brand Experiences',
    template: 'Reflekt Branding | %s'
  },
  description: 'Reflekt crafts immersive brand experiences that feel impossibly polished and effortlessly human.',
  icons: {
    icon: [{ url: '/reflekt-icon.png', type: 'image/png' }],
    shortcut: ['/reflekt-icon.png'],
    apple: [{ url: '/reflekt-icon.png' }]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
