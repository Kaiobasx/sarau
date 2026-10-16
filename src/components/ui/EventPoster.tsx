import Link from 'next/link'

export interface EventPosterProps {
  dia: string
  mesSemana: string
  categoria?: string
  titulo: string
  detalhes: string
  slug?: string
  mapsUrl?: string | null
  className?: string
}

export function EventPoster({
  dia,
  mesSemana,
  categoria = 'SARAU',
  titulo,
  detalhes,
  slug,
  mapsUrl,
  className = '',
}: EventPosterProps) {
  return (
    <article className={`event-poster ${className}`}>
      <div className="event-date flex min-h-[72px] min-w-0 flex-col items-center justify-center border-l-4 border-[var(--brand-red)] bg-[var(--brand-ink)] px-1 text-center sm:min-h-[82px]">
        <span className="font-title text-4xl leading-[.8] text-[var(--brand-paper)] sm:text-5xl">{dia}</span>
        <span className="mt-2 max-w-full break-words font-condensed text-[9px] font-bold uppercase leading-tight tracking-[1px] text-[var(--brand-paper)] sm:text-[10px]">{mesSemana}</span>
      </div>

      <div className="min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-condensed text-xs font-semibold uppercase tracking-[1px]">
          <span>{categoria}</span>
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-condensed text-[10px] font-bold uppercase tracking-[1px] text-[var(--brand-ink)] underline decoration-2 underline-offset-2"
            >
              MAPA ↗
            </a>
          )}
        </div>
        <h3 className="break-words font-title text-base leading-[.98] text-[var(--brand-ink)] sm:text-xl">{titulo}</h3>
        <p className="break-words font-sans text-base leading-relaxed text-[var(--brand-concrete)]">{detalhes}</p>
      </div>

      {slug && (
        <Link href={`/agenda/${slug}`} className="event-link min-h-11 inline-flex items-center">
          Detalhes <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  )
}
