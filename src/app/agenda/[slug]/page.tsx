import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, formatEventDate } from '@/lib/events'

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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Navegação de retorno */}
      <div className="mb-6">
        <Link
          href="/agenda"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-primary)] hover:underline"
        >
          ← Voltar para a Agenda
        </Link>
      </div>

      <article className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
        {/* Capa */}
        {evento.capa_url && (
          <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-stone-900 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evento.capa_url}
              alt={evento.titulo}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-8">
          {/* Cabeçalho */}
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[var(--brand-secondary)]/15 text-amber-900">
              Sarau & Encontro Cultural
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-dark)]">
              {evento.titulo}
            </h1>

            {/* Painel de Data e Local */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[var(--brand-light-surface)] border border-stone-200 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-bold text-stone-900 capitalize">{dataLegivel}</p>
                  <p className="text-stone-600 text-xs">Horário: {horaLegivel} (horário de Brasília)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-bold text-stone-900">{evento.local}</p>
                  {evento.maps_url && (
                    <a
                      href={evento.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--brand-primary)] font-semibold underline hover:text-[var(--brand-primary-hover)] inline-flex items-center gap-1 mt-0.5"
                    >
                      Abrir no Google Maps ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Descrição Completa */}
          <div className="prose prose-stone max-w-none text-stone-800 text-base leading-relaxed whitespace-pre-line border-t border-stone-100 pt-6">
            {evento.descricao}
          </div>

          {/* CTA para o Sarau */}
          <div className="p-6 rounded-2xl bg-[var(--brand-dark)] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--brand-secondary)]">
                Quer recitar, tocar ou apoiar na organização?
              </h2>
              <p className="text-xs text-stone-300">
                O microfone é aberto e a construção é de todo mundo.
              </p>
            </div>
            <Link
              href="/faca-parte"
              className="px-5 py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap shadow-md"
            >
              Quero Participar
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
