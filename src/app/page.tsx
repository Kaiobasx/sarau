import type { Metadata } from 'next'
import Link from 'next/link'
import { getUpcomingEvents, formatEventDate } from '@/lib/events'
import { Button } from '@/components/ui/Button'
import { EventPoster } from '@/components/ui/EventPoster'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'MANIFESTO DA SUL | A cultura também é território',
  description:
    'Sarau, formação e organização na Zona Sul de São Paulo. A cultura também é território de disputa.',
}

export default async function HomePage() {
  const eventos = await getUpcomingEvents()

  return (
    <div className="w-full flex-1">
      <section className="field-hero border-b border-[var(--brand-ink)] px-5 py-12 sm:px-10 sm:py-20 lg:px-[12vw]">
        <div className="field-grid">
          <div className="field-copy">
            <p className="section-kicker">Caderno de campo <span aria-hidden="true">/</span> Zona Sul, São Paulo</p>
            <h1 className="mt-6 max-w-4xl font-title text-[clamp(2.8rem,7.5vw,6.8rem)] leading-[.98]">
              A cultura também é território de disputa.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg leading-[1.65] text-[var(--brand-ink)] sm:text-xl">
              Nascemos no sarau. Agora levamos poesia, formação e organização para disputar a cidade.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button variant="primary" size="md" href="/faca-parte">Faça parte</Button>
              <Link href="/agenda" className="text-link">Consultar a agenda <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <aside className="field-note" aria-label="Sobre o coletivo">
            <p className="section-kicker">Manifesto da Sul</p>
            <p className="mt-5 font-title text-[clamp(1.6rem,3vw,2.6rem)] leading-tight">
              Do sarau à construção coletiva.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed">
              Um coletivo político-cultural da Zona Sul de São Paulo.
            </p>
            <Link href="/#de-onde-viemos" className="text-link mt-6">Conheça nossa história <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>

      <section id="de-onde-viemos" className="field-section px-5 py-12 sm:px-10 sm:py-16 lg:px-[12vw]">
        <div className="history-grid">
          <header>
            <p className="section-kicker">01 <span aria-hidden="true">/</span> Memória</p>
            <h2 className="mt-4 max-w-lg font-title text-[clamp(2.3rem,5vw,4.4rem)] leading-none">De onde viemos</h2>
          </header>
          <div>
            <p className="max-w-3xl font-sans text-base leading-[1.75] sm:text-lg">
              Começou com microfone aberto, poesia na laje e gente da quebrada se encontrando. O sarau virou ponto de encontro, formação e luta. Agora o coletivo dá o próximo passo: fazer da cultura uma força para transformar o território.
            </p>
            <div className="photo-note mt-8" aria-label="Espaço reservado para registros autorizados">
              <p className="section-kicker">Acervo do coletivo</p>
              <p className="mt-3 font-title text-xl leading-tight sm:text-2xl">Registros em preparação</p>
              <p className="mt-2 max-w-xl font-sans text-base leading-relaxed">
                Este espaço receberá fotos do coletivo quando houver imagens autorizadas para publicação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="axes-section border-y border-[var(--brand-ink)] px-5 py-12 sm:px-10 sm:py-16 lg:px-[12vw]">
        <div className="axes-heading">
          <div>
            <p className="section-kicker">02 <span aria-hidden="true">/</span> Frentes de atuação</p>
            <h2 className="mt-4 font-title text-[clamp(2.3rem,5vw,4.4rem)] leading-none">O que nos move</h2>
          </div>
          <p className="max-w-md font-sans text-base leading-relaxed sm:text-lg">
            Eixos de trabalho em construção coletiva. As frentes abaixo são provisórias.
          </p>
        </div>
        <ul className="axis-list mt-8" aria-label="Eixos provisórios de atuação">
          <li><span>01</span><strong>Cultura</strong><p>Sarau, slam, música e arte.</p></li>
          <li><span>02</span><strong>Formação</strong><p>Rodas de estudo e oficinas.</p></li>
          <li><span>03</span><strong>Território</strong><p>Escuta e organização a partir do bairro.</p></li>
          <li><span>04</span><strong>Comunicação</strong><p>Comunicação feita por nós.</p></li>
        </ul>
      </section>

      <section id="agenda" className="field-section px-5 py-12 sm:px-10 sm:py-16 lg:px-[12vw]">
        <div className="section-heading">
          <div>
            <p className="section-kicker">03 <span aria-hidden="true">/</span> Encontros</p>
            <h2 className="mt-4 font-title text-[clamp(2.3rem,5vw,4.4rem)] leading-none">Agenda</h2>
          </div>
          <Link href="/agenda" className="text-link">Ver agenda completa <span aria-hidden="true">→</span></Link>
        </div>
        {eventos.length ? (
          <div className="mt-7 divide-y divide-[var(--brand-ink)] border-y border-[var(--brand-ink)]">
            {eventos.slice(0, 3).map((evento) => {
              const { dia, mes, dataLegivel, horaLegivel } = formatEventDate(evento.data)
              return (
                <EventPoster
                  key={evento.id}
                  dia={dia}
                  mesSemana={`${mes.toUpperCase()} · ${horaLegivel}`}
                  categoria="Encontro"
                  titulo={evento.titulo}
                  detalhes={`${dataLegivel} · ${evento.local}`}
                  slug={evento.slug}
                  mapsUrl={evento.maps_url}
                />
              )
            })}
          </div>
        ) : (
          <div className="agenda-empty mt-7 border-y border-[var(--brand-ink)] py-6">
            <h3 className="font-title text-2xl sm:text-3xl">Próxima data em construção</h3>
            <p className="mt-2 max-w-2xl font-sans text-base leading-relaxed">
              Ainda não há encontros confirmados. Vamos atualizar esta página quando uma nova data estiver definida.
            </p>
          </div>
        )}
      </section>

      <section className="join-section border-t border-[var(--brand-ink)] px-5 py-10 sm:px-10 sm:py-14 lg:px-[12vw]">
        <div>
          <p className="section-kicker">Construção coletiva</p>
          <h2 className="mt-3 max-w-3xl font-title text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Chega junto, no seu tempo.</h2>
        </div>
        <Button variant="primary" size="md" href="/faca-parte">Conheça o formulário</Button>
      </section>
    </div>
  )
}
