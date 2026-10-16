interface SectionNumberProps {
  number: string
  className?: string
}

export function SectionNumber({ number, className = '' }: SectionNumberProps) {
  return (
    <span
      data-motion="number"
      aria-hidden="true"
      className={`section-number pointer-events-none select-none font-title text-[clamp(5rem,16vw,13rem)] leading-[.72] text-[var(--brand-red)] ${className}`}
    >
      {number}
    </span>
  )
}
