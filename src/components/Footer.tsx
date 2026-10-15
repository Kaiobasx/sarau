import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] text-stone-300 border-t border-[var(--brand-dark-border)] py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-lg font-bold text-[var(--brand-light)]">
              <span className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"></span>
              <span>Manifesto da Sul</span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Coletivo cultural independente da Zona Sul de São Paulo. Poesia, sarau,
              resistência e ocupação comunitária dos espaços públicos da quebrada.
            </p>
            <p className="text-xs text-stone-500">
              Fase 1 (MVP) · Construção colaborativa e autônoma.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h2 className="text-xs font-semibold text-[var(--brand-secondary)] uppercase tracking-wider mb-3">
              Navegação
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-white transition-colors">
                  Agenda de Eventos
                </Link>
              </li>
              <li>
                <Link href="/faca-parte" className="hover:text-white transition-colors">
                  Faça Parte
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato & Transparência */}
          <div>
            <h2 className="text-xs font-semibold text-[var(--brand-secondary)] uppercase tracking-wider mb-3">
              Contato & LGPD
            </h2>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a
                  href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Manifesto%20da%20Sul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  WhatsApp Coletivo
                </a>
              </li>
              <li>
                <span className="text-xs text-stone-500 block pt-1">
                  Privacidade: seu IP nunca é salvo em texto claro. Criptografado via HMAC e apagado em 30 dias.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="pt-8 border-t border-[var(--brand-dark-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Manifesto da Sul. Todos os direitos compartilhados com a comunidade.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="underline hover:text-stone-300">
              Termos de Privacidade (LGPD)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
