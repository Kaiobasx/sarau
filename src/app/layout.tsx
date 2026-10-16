import type { Metadata, Viewport } from 'next'
import { Russo_One, Stalinist_One, Oswald, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-russo',
})

const stalinistOne = Stalinist_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-stalinist',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-oswald',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'MANIFESTO DA SUL | A Quebrada Tem Voz',
    template: '%s | Manifesto da Sul',
  },
  description:
    'A cultura também é território de disputa. Sarau de poesia, formação e movimento político-cultural da Zona Sul de São Paulo.',
  keywords: [
    'sarau',
    'zona sul',
    'são paulo',
    'coletivo cultural',
    'poesia periférica',
    'manifesto da sul',
  ],
  authors: [{ name: 'Manifesto da Sul' }],
  openGraph: {
    title: 'MANIFESTO DA SUL | A Quebrada Tem Voz',
    description:
      'A cultura também é território de disputa. Sarau de poesia, formação e movimento político-cultural da Zona Sul.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Manifesto da Sul',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${russoOne.variable} ${stalinistOne.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--brand-paper)] text-[var(--brand-ink)] font-sans">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
