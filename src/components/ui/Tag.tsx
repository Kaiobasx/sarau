import React from 'react'

export interface TagProps {
  variant?: 'red' | 'ink' | 'gold' | 'outline'
  children: React.ReactNode
  className?: string
}

export function Tag({ variant = 'red', children, className = '' }: TagProps) {
  const base =
    'inline-flex -rotate-2 items-center border-4 border-double border-current px-2 py-0.5 font-condensed text-[10px] font-bold uppercase tracking-[1.5px] select-none sm:text-xs'

  const variants = {
    red: 'bg-[var(--brand-red)] text-[var(--brand-paper)]',
    ink: 'bg-[var(--brand-ink)] text-[var(--brand-paper)]',
    gold: 'bg-[var(--brand-gold)] text-[var(--brand-ink)]',
    outline: 'bg-transparent text-[var(--brand-ink)]',
  }

  return <span data-motion="stamp" className={`${base} ${variants[variant]} ${className}`}>{children}</span>
}
