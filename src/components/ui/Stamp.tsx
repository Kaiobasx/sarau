import type { ReactNode } from 'react'

interface StampProps {
  children: ReactNode
  className?: string
  variant?: 'red' | 'ink' | 'paper' | 'gold'
}

const variants = {
  red: 'bg-[var(--brand-red)] text-[var(--brand-paper)]',
  ink: 'bg-[var(--brand-ink)] text-[var(--brand-paper)]',
  paper: 'bg-[var(--brand-paper)] text-[var(--brand-ink)]',
  gold: 'bg-[var(--brand-gold)] text-[var(--brand-ink)]',
}

export function Stamp({ children, className = '', variant = 'red' }: StampProps) {
  return (
    <span
      data-motion="stamp"
      className={`print-stamp inline-flex -rotate-2 border-4 border-double border-current px-3 py-1 font-condensed text-[10px] uppercase tracking-[1px] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
