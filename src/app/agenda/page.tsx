import type { Metadata } from 'next'
import Link from 'next/link'
import { getUpcomingEvents, formatEventDate } from '@/lib/events'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Agenda de Eventos e Saraus | Manifesto da Sul',
  description:
    'Confira as datas, horários e locais dos próximos saraus, oficinas e encontros culturais do Manifesto da Sul na Zona Sul.',
  openGraph: {
    title: 'Agenda de Eventos e Saraus | Manifesto da Sul',
    description:
      'Confira as datas, horários e locais dos próximos saraus e encontros culturais na Zona Sul.',
  },
}

export default async function AgendaPage() {
  const eventos = await getUpcomingEvents()

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Cabeçalho da página */}
      <div className="mb-10 text-center sm:text-left space-y-3">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]">
          Programação Cultural
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-dark)]">
          Agenda do Coletivo
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl">
          Todos os nossos encontros, saraus e intervenções são abertos e gratuitos.
          Venha recitar, ouvir, tocar ou simplesmente estar com a gente.
        </p>
      </div>

      {/* Lista de Eventos ou Estado Vazio */}
      {eventos.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center text-2xl">
            📅
          </div>
          <h2 className="text-xl font-bold text-stone-900">
            Nenhum evento por enquanto
          </h2>
          <p className="text-stone-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Nenhum evento por enquanto. Siga o coletivo nas redes para não perder nada.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20dos%20pr%C3%B3ximos%20saraus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors inline-flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              Acompanhar no WhatsApp
            </a>
            <Link
              href="/faca-parte"
              className="px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white font-medium text-sm transition-colors"
            >
              Fazer Parte do Coletivo
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventos.map((evento) => {
            const { dataLegivel, horaLegivel, dia, mes } = formatEventDate(evento.data)
            const resumo =
              evento.descricao.length > 200
                ? evento.descricao.slice(0, 197) + '...'
                : evento.descricao

            return (
              <article
                key={evento.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Imagem de Capa se houver */}
                {evento.capa_url && (
                  <div className="h-44 w-full overflow-hidden bg-stone-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={evento.capa_url}
                      alt={evento.titulo}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Badge de Data */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex flex-col items-center justify-center bg-[var(--brand-primary)] text-white px-3 py-1.5 rounded-lg min-w-[50px] shadow-sm">
                      <span className="text-base font-extrabold leading-none">{dia}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider">{mes}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold capitalize text-stone-700">{dataLegivel}</p>
                      <p className="text-xs text-stone-500 font-medium">Horário: {horaLegivel}</p>
                    </div>
                  </div>

                  {/* Título */}
                  <h2 className="text-xl font-bold text-stone-900 tracking-tight hover:text-[var(--brand-primary)] transition-colors mb-2">
                    <Link href={`/agenda/${evento.slug}`}>{evento.titulo}</Link>
                  </h2>

                  {/* Localização */}
                  <div className="flex items-start gap-1.5 text-xs text-stone-600 mb-3">
                    <span className="text-[var(--brand-primary)] font-bold">📍</span>
                    <span>{evento.local}</span>
                    {evento.maps_url && (
                      <a
                        href={evento.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--brand-primary)] underline hover:text-[var(--brand-primary-hover)] font-medium ml-1 inline-flex items-center"
                        aria-label={`Ver localização de ${evento.titulo} no Google Maps`}
                      >
                        (Ver mapa)
                      </a>
                    )}
                  </div>

                  {/* Descrição curta */}
                  <p className="text-sm text-stone-600 leading-relaxed mb-4 flex-1">
                    {resumo}
                  </p>

                  {/* Link detalhes */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href={`/agenda/${evento.slug}`}
                      className="text-xs font-bold text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1"
                    >
                      Ver detalhes do evento →
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
