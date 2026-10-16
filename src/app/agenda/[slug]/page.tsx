import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, formatEventDate } from '@/lib/events'
import { Button } from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const evento = await getEventBySlug(slug)

  if (!evento) {
    return {
      title: 'Evento Não Encontrado | Manifesto da Sul',
    }
  }

  const { dataLegivel, horaLegivel } = formatEventDate(evento.data)

  return {
    title: `${evento.titulo} | Agenda Manifesto da Sul`,
    description: `${evento.descricao.slice(0, 160)} — ${dataLegivel} às ${horaLegivel}.`,
    openGraph: {
      title: evento.titulo,
      description: evento.descricao.slice(0, 160),
      type: 'article',
      images: evento.capa_url ? [{ url: evento.capa_url }] : [],
    },
  }
}

export default async function EventoDetailPage({ params }: PageProps) {
  const { slug } = await params
  const evento = await getEventBySlug(slug)

  if (!evento) {
    notFound()
  }

  const { dataLegivel, horaLegivel } = formatEventDate(evento.data)

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-10 sm:py-16">
      <Link href="/agenda" className="text-link">← Voltar para a agenda</Link>

      <article className="mt-7">
        {evento.capa_url && (
          <div className="mb-8 max-h-[32rem] overflow-hidden border-y border-[var(--brand-ink)] bg-[var(--brand-paper-2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={evento.capa_url} alt={evento.titulo} className="max-h-[32rem] w-full object-cover" />
          </div>
        )}
        <header className="max-w-4xl border-b border-[var(--brand-ink)] pb-7">
          <p className="section-kicker">Agenda <span aria-hidden="true">/</span> Encontro</p>
          <h1 className="mt-4 font-title text-[clamp(2.5rem,7vw,5.5rem)] leading-[.98] text-[var(--brand-ink)]">
            {evento.titulo}
          </h1>
          <dl className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <dt className="font-condensed text-sm font-semibold uppercase tracking-[1px] text-[var(--brand-concrete)]">Data e hora</dt>
              <dd className="mt-1 font-sans text-base leading-relaxed">{dataLegivel} · {horaLegivel}</dd>
            </div>
            <div>
              <dt className="font-condensed text-sm font-semibold uppercase tracking-[1px] text-[var(--brand-concrete)]">Local</dt>
              <dd className="mt-1 font-sans text-base leading-relaxed">{evento.local}</dd>
              {evento.maps_url && (
                <a href={evento.maps_url} target="_blank" rel="noopener noreferrer" className="text-link mt-2">Abrir no mapa ↗</a>
              )}
            </div>
          </dl>
        </header>

        <div className="max-w-3xl whitespace-pre-line py-7 font-sans text-base leading-[1.75] text-[var(--brand-ink)] sm:text-lg">
          {evento.descricao}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--brand-ink)] py-6">
          <p className="font-sans text-base">Quer participar ou conhecer o coletivo?</p>
          <Button variant="primary" size="md" href="/faca-parte">Faça parte</Button>
        </div>
      </article>
    </div>
  )
}
