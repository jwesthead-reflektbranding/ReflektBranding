import './globals.css'
import React from 'react'
import { Montserrat } from 'next/font/google'

import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Reflekt — Visionary Experiences',
  description: 'Reflekt crafts immersive brand experiences that feel impossibly polished and effortlessly human.'
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
