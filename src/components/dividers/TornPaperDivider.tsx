export function TornPaperDivider() {
  return (
    <div className="relative h-[58px] overflow-hidden bg-[var(--brand-paper)] sm:h-[84px] lg:h-[104px]" aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          data-motion="tear"
          d="M0 0h1440v72l-19 5 13 7-25 1 10 8-28-2 11 10-24-3 7 8-31-2 8 9-25-4 6 9-29-2 7 9-27-4 5 8-33-1 8 8-29-3 6 10-34-5 10 9-32-1 8 8-34-5 9 11-35-2 8 8-30-3 7 11-31-5 7 8-36-2 9 9-30-4 6 9-32-2 9 9-36-5 8 10-32-4 7 9-37-2 9 9-33-4 8 8-36-1 10 9-37-5 8 11-34-3 7 9-34-4 7 10-38-1 10 9-37-3 8 10-37-3 10 9-37-4 10 9-40-2 12 10-39-4 8 10-39-1 9 9-41-3 12 11-39-4 10 10-39-2 10 11-42-4 12 10-43-4 13 9-40-4 12 11-44-3 12 10-44-2 13 10-44-3 12 11-47-4 12 10-47-3 14 12-48-4 13 10-50-3 13 13-52-3 14 12-53-3 14 12-55-2 16 13-57-4 16 14-60-4 16 14-62-3 19 16-65-3 20 16-67-4 23 18-70-3 25 18-76-3 30 19-80-4 38 18-84-2 48 18-90-3 56 15-94-2 68 10-99-4 84 4-105-2 99-2-114-4 114-8 120V0Z"
          fill="var(--brand-red)"
        />
        <path
          data-motion="tear"
          d="M0 0h1440"
          stroke="var(--brand-ink)"
          strokeWidth="4"
        />
      </svg>
      <span className="absolute bottom-1 right-4 font-condensed text-[10px] font-bold uppercase tracking-[2px] text-[var(--brand-paper)] sm:bottom-3 sm:right-10 sm:text-xs">
        PAPEL RASGADO · A LUTA CONTINUA
      </span>
    </div>
  )
}
