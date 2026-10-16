import type { Metadata } from 'next'
import Link from 'next/link'
import { getUpcomingEvents, formatEventDate } from '@/lib/events'
import { EventPoster } from '@/components/ui/EventPoster'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Agenda | Manifesto da Sul',
  description: 'Encontros, saraus e atividades do Manifesto da Sul na Zona Sul de São Paulo.',
}

export default async function AgendaPage() {
  const eventos = await getUpcomingEvents()

  return (
    <div className="w-full flex-1 bg-[var(--brand-paper)] px-5 py-10 sm:px-10 sm:py-16 lg:px-[12vw]">
      <header className="max-w-3xl border-b border-[var(--brand-ink)] pb-7">
        <p className="section-kicker">Manifesto da Sul <span aria-hidden="true">/</span> Encontros</p>
        <h1 className="mt-4 font-title text-[clamp(2.8rem,7vw,5.5rem)] leading-none">Agenda</h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg">
          Acompanhe aqui as datas confirmadas de saraus, oficinas e encontros abertos.
        </p>
      </header>

      <section aria-label="Próximos eventos" className="mt-8 max-w-5xl">
        {eventos.length ? (
          <div className="divide-y divide-[var(--brand-ink)] border-y border-[var(--brand-ink)]">
            {eventos.map((evento) => {
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
          <div className="border-y border-[var(--brand-ink)] py-7">
            <p className="section-kicker text-[var(--brand-red)]">Agenda em atualização</p>
            <h2 className="mt-3 font-title text-[clamp(1.8rem,4vw,3rem)] leading-tight">
              Próxima data em construção
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed sm:text-lg">
              Ainda não há um próximo encontro confirmado. Publicaremos a informação aqui assim que a data estiver definida.
            </p>
          </div>
        )}
        <Link href="/" className="text-link mt-7">← Voltar ao início</Link>
      </section>
    </div>
  )
}
