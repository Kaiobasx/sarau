import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link href="/" className="footer-brand">Manifesto da Sul</Link>
          <p className="mt-3 max-w-md font-sans text-base leading-relaxed">
            Coletivo político-cultural da Zona Sul de São Paulo. A cultura também é território de disputa.
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="footer-navigation">
          <Link href="/agenda">Agenda</Link>
          <Link href="/#de-onde-viemos">Nossa história</Link>
          <Link href="/faca-parte">Faça parte</Link>
          <Link href="/privacidade">Privacidade</Link>
        </nav>
      </div>
      <div className="footer-end">
        <span>© 2026 Manifesto da Sul</span>
        <span>Zona Sul · São Paulo</span>
      </div>
    </footer>
  )
}
