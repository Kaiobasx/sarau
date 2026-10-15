import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const viewport: Viewport = {
  themeColor: '#171514',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Manifesto da Sul | Coletivo Cultural da Zona Sul',
    template: '%s | Manifesto da Sul',
  },
  description:
    'Voz, poesia, cultura viva e ocupação dos espaços públicos da Zona Sul de São Paulo. Conheça nossos eventos e participe.',
  keywords: [
    'sarau',
    'zona sul',
    'são paulo',
    'coletivo cultural',
    'poesia periférica',
    'cultura da quebrada',
    'manifesto da sul',
  ],
  authors: [{ name: 'Manifesto da Sul' }],
  openGraph: {
    title: 'Manifesto da Sul | Coletivo Cultural da Zona Sul',
    description:
      'Voz, poesia, cultura viva e ocupação dos espaços públicos da Zona Sul de São Paulo.',
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
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col bg-[var(--brand-light)] text-[var(--brand-dark)] antialiased">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
