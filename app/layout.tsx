import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EMER Designs - Modern Digital Solutions',
  description: 'Experience cutting-edge digital design and development solutions for your business',
  keywords: 'design, development, digital solutions, web design, UI/UX',
  authors: [{ name: 'EMER Designs' }],
  creator: 'EMER Designs',
  publisher: 'EMER Designs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://emerdesigns.com'),
  openGraph: {
    title: 'EMER Designs - Modern Digital Solutions',
    description: 'Experience cutting-edge digital design and development solutions for your business',
    url: 'https://emerdesigns.com',
    siteName: 'EMER Designs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EMER Designs'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMER Designs - Modern Digital Solutions',
    description: 'Experience cutting-edge digital design and development solutions for your business',
    images: ['/og-image.jpg'],
    creator: '@emerdesigns',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/poster.jpg" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}