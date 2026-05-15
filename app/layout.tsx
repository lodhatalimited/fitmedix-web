import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Fitmedix | Trusted Wound Care Products UK',
    template: '%s | Fitmedix',
  },
  description: 'Premium wound care products trusted by thousands across the UK. Adhesive dressings, gauze swabs, zinc oxide tape and more — available on Amazon with fast delivery.',
  keywords: ['wound dressing', 'adhesive dressing', 'wound care UK', 'medical dressings', 'fitmedix'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Fitmedix',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
