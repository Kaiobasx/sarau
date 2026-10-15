import type { Metadata } from 'next'
import Link from 'next/link'
import { getUpcomingEvents, formatEventDate } from '@/lib/events'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Manifesto da Sul | Coletivo Cultural e Sarau da Zona Sul',
  description:
    'A voz, a poesia e a cultura viva da quebrada. Conheça o coletivo Manifesto da Sul, confira nossa agenda de saraus e faça parte desse movimento.',
  openGraph: {
    title: 'Manifesto da Sul | Coletivo Cultural e Sarau da Zona Sul',
    description:
      'A voz, a poesia e a cultura viva da quebrada. Participe dos nossos saraus e encontros comunitários.',
  },
}

export default async function HomePage() {
  const eventos = await getUpcomingEvents()
  const proximosEventos = eventos.slice(0, 2)

  return (
    <div className="flex flex-col w-full">
      {/* =========================================================================
          HERO SECTION (US-01)
          - Visível acima da dobra em tela de 360px
          - Nome do coletivo
          - Frase-manifesto
          - Botão de CTA "Faça parte"
          - Botão de WhatsApp de contato rápido sem scroll
          - Contraste WCAG AA (>= 4.5:1)
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--brand-dark)] via-[#1f1b19] to-[var(--brand-dark)] text-white pt-10 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[var(--brand-dark-border)]">
        {/* Elemento visual decorativo de fundo */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[var(--brand-primary)]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[var(--brand-secondary)]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        ></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          {/* Badge de identificação */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--brand-dark-surface)] border border-[var(--brand-dark-border)] text-[var(--brand-secondary)] text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]"></span>
            Cultura Viva da Quebrada · Zona Sul SP
          </div>

          {/* Nome e Frase-Manifesto */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-none text-[var(--brand-light)]">
            Manifesto da Sul
          </h1>

          <p className="text-lg sm:text-2xl font-medium text-stone-200 max-w-2xl mx-auto leading-snug">
            A poesia, a voz e o território em movimento. O sarau que ecoa o cotidiano, a resistência e o afeto da nossa gente.
          </p>

          <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto">
            Um coletivo cultural comunitário, aberto a todo mundo que quer recitar, escutar, aprender e ocupar o espaço público.
          </p>

          {/* Ações Hero — CTA Principal + WhatsApp sem scroll */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            {/* CTA Faça Parte (US-01 / US-04) */}
            <Link
              href="/faca-parte"
              id="cta-hero-faca-parte"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] active:scale-[0.98] shadow-lg shadow-[var(--brand-primary)]/30 transition-all text-center focus-visible:ring-2 focus-visible:ring-[var(--brand-secondary)]"
            >
              Faça Parte do Coletivo
            </Link>

            {/* WhatsApp Contato Rápido (US-01) */}
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Vim%20pela%20p%C3%A1gina%20inicial%20do%20Manifesto%20da%20Sul"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-hero-whatsapp"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-emerald-200 bg-emerald-950/70 border border-emerald-600/80 hover:bg-emerald-900/90 transition-colors text-center inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Direto
            </a>
          </div>

          {/* Atalho para ver eventos */}
          <div className="pt-2">
            <Link
              href="/agenda"
              className="text-xs sm:text-sm text-stone-400 hover:text-[var(--brand-secondary)] underline transition-colors"
            >
              Ou veja as datas dos próximos saraus na nossa agenda →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 1: DE ONDE VIEMOS (Nossa Raiz / Sarau)
         ========================================================================= */}
      <section id="historia" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Nossa Raiz
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-dark)]">
              A palavra brotou na calçada e virou sarau
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              O <strong>Manifesto da Sul</strong> nasceu da urgência de juntar vozes que há décadas constroem a identidade cultural da periferia. Entre rimas, crônicas, cordéis e slam, os saraus se consolidaram como território de escuta, denúncia e celebração.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Aqui, ninguém precisa de diploma de poeta para pegar o microfone. A vivência da quebrada é a nossa principal literatura.
            </p>
          </div>

          <div className="bg-[var(--brand-light-surface)] p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="border-l-4 border-[var(--brand-primary)] pl-4 italic text-stone-800 text-sm sm:text-base leading-relaxed">
              &quot;O asfalto pode até ser duro, mas a poesia que nasce da terra batida rompe qualquer concreto.&quot;
            </div>
            <p className="text-xs text-stone-500 font-medium">
              — Vozes dos encontros do coletivo
            </p>
            <div className="pt-2">
              <Link
                href="/faca-parte"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] hover:underline"
              >
                Venha declamar ou participar do próximo encontro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: EIXOS DE ATUAÇÃO (O que nos move)
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-100/70 border-y border-stone-200 w-full">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Pilares Comunitários
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-dark)]">
              Como atuamos na Zona Sul
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
              Três eixos fundamentais que guiam nossas ações comunitárias e culturais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Eixo 1 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[var(--brand-primary)] flex items-center justify-center text-xl mb-3 font-bold">
                  🎤
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Saraus & Microfone Aberto
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                  Encontros mensais de poesia, música popular, teatro de rua e intervenções literárias abertas para todas as idades.
                </p>
              </div>
            </div>

            {/* Eixo 2 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[var(--brand-secondary)] flex items-center justify-center text-xl mb-3 font-bold">
                  📖
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Formação & Oficinas
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                  Oficinas de escrita criativa, produção de zines independentes, fotografia periférica e difusão de literatura marginal.
                </p>
              </div>
            </div>

            {/* Eixo 3 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl mb-3 font-bold">
                  🌱
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Ocupação & Território
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
                  Reconquista e valorização de praças, centros comunitários, escolas e espaços públicos da Zona Sul com arte e pertencimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: PRÓXIMOS ENCONTROS (Agenda Teaser)
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-primary)]">
              Participe ao Vivo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-dark)]">
              Próximos Encontros
            </h2>
          </div>
          <Link
            href="/agenda"
            className="text-xs font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1"
          >
            Ver agenda completa de eventos →
          </Link>
        </div>

        {proximosEventos.length === 0 ? (
          <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-8 text-center space-y-3">
            <p className="text-sm text-stone-600">
              Nossos próximos saraus estão sendo articulados nas reuniões do coletivo.
            </p>
            <p className="text-xs text-stone-500">
              Cadastre seu interesse para ser avisado(a) em primeira mão quando a data for lançada!
            </p>
            <div className="pt-2">
              <Link
                href="/faca-parte"
                className="inline-block px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-xs font-bold hover:bg-[var(--brand-primary-hover)] transition-colors"
              >
                Cadastrar meu contato
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {proximosEventos.map((evento) => {
              const { dataLegivel, horaLegivel } = formatEventDate(evento.data)
              return (
                <article
                  key={evento.id}
                  className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-[var(--brand-primary)] uppercase">
                      {dataLegivel} · {horaLegivel}
                    </p>
                    <h3 className="text-lg font-bold text-stone-900">
                      <Link href={`/agenda/${evento.slug}`} className="hover:text-[var(--brand-primary)]">
                        {evento.titulo}
                      </Link>
                    </h3>
                    <p className="text-xs text-stone-600">📍 {evento.local}</p>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 mt-2">
                      {evento.descricao}
                    </p>
                  </div>
                  <div className="pt-4 mt-2 border-t border-stone-100">
                    <Link
                      href={`/agenda/${evento.slug}`}
                      className="text-xs font-bold text-[var(--brand-primary)] hover:underline"
                    >
                      Informações completas →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          SEÇÃO 4: CTA FINAL
         ========================================================================= */}
      <section className="bg-[var(--brand-dark)] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-[var(--brand-dark-border)]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-light)]">
            A quebrada tem voz. Venha somar com a sua.
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Sem burocracia, sem custos e com total acolhimento. Deixe seu contato para que a gente possa te convidar para as próximas rodas.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/faca-parte"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-all shadow-md"
            >
              Quero Fazer Parte
            </Link>
            <Link
              href="/agenda"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-stone-200 border border-stone-700 hover:bg-stone-800 transition-colors"
            >
              Ver Agenda de Eventos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
