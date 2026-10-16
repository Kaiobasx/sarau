export function SunriseDivider() {
  return (
    <div className="relative h-[78px] overflow-hidden bg-[var(--brand-paper)] sm:h-[110px] lg:h-[132px]" aria-hidden="true">
      <svg
        viewBox="0 0 1440 150"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 150V66l1440 20v64H0Z" fill="var(--brand-ink)" />
        <path data-motion="sun" d="M650 91a70 70 0 0 1 140 0Z" fill="var(--brand-red)" stroke="var(--brand-ink)" strokeWidth="4" />
        <g data-motion="sun-rays" stroke="var(--brand-red)" strokeWidth="8" strokeLinecap="square">
          <path d="M720 16v35" />
          <path d="m625 30 24 34" />
          <path d="m815 30-24 34" />
          <path d="m563 63 48 24" />
          <path d="m877 63-48 24" />
        </g>
        <path d="M0 65 1440 85" stroke="var(--brand-paper)" strokeWidth="4" />
      </svg>
    </div>
  )
}
