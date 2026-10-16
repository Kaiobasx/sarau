import React from 'react'

export interface EixoCardProps {
  letter: string
  title: string
  description: string
  className?: string
}

export function EixoCard({ letter, title, description, className = '' }: EixoCardProps) {
  return (
    <article
      data-motion="wipe"
      className={`axis-line grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-b-3 border-[var(--brand-ink)] py-4 sm:gap-x-8 sm:py-6 ${className}`}
    >
      <span className="row-span-2 font-title text-5xl leading-[.75] text-[var(--brand-paper)] sm:text-7xl">
        {letter}
      </span>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-title text-2xl leading-[.9] text-[var(--brand-paper)] sm:text-4xl">
          {title}
        </h3>
        <p className="max-w-lg font-sans text-sm leading-relaxed text-[var(--brand-paper)] sm:text-base">
          {description}
        </p>
      </div>
    </article>
  )
}
