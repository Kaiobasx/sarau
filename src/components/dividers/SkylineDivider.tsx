export function SkylineDivider() {
  return (
    <div className="relative h-[76px] bg-[var(--brand-paper)] sm:h-[112px] lg:h-[136px]" aria-hidden="true">
      <svg
        viewBox="0 0 1440 180"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          data-motion="skyline"
          d="M0 180V111h72V78h36v33h41V92h52V61h43v50h61V82h55v29h63V53h47v58h76V89h57V65h42v46h70V74h58v37h54V56h43v55h63V88h58v23h71V64h40v47h74V81h54v30h68V52h44v59h68v69H0Z"
          fill="var(--brand-ink)"
        />
        <g fill="var(--brand-gold)">
          <rect data-motion="window" x="94" y="128" width="9" height="17" />
          <rect data-motion="window" x="242" y="122" width="10" height="17" />
          <rect data-motion="window" x="382" y="117" width="10" height="18" />
          <rect data-motion="window" x="538" y="112" width="10" height="17" />
          <rect data-motion="window" x="697" y="120" width="10" height="17" />
          <rect data-motion="window" x="849" y="117" width="10" height="17" />
          <rect data-motion="window" x="1001" y="122" width="10" height="17" />
          <rect data-motion="window" x="1156" y="114" width="10" height="18" />
          <rect data-motion="window" x="1324" y="121" width="10" height="17" />
        </g>
        <g className="kite-bob" stroke="var(--brand-ink)" strokeWidth="3">
          <path d="m1190 35 15-16 15 16-15 16-15-16Z" fill="var(--brand-red)" />
          <path d="m1205 51 10 17-6 4-10-17m6 17 8 13-6 4-8-13" />
        </g>
        <path d="M0 178h1440" stroke="var(--brand-ink)" strokeWidth="4" />
      </svg>
    </div>
  )
}
