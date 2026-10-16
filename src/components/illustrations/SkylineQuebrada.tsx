import React from 'react'

export function SkylineQuebrada({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden relative ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        {/* Pipa vermelha voando na quebrada */}
        <g transform="translate(980, 20)">
          <polygon points="0,-18 14,0 0,18 -14,0" fill="var(--brand-red)" stroke="var(--brand-ink)" strokeWidth="2" />
          <line x1="0" y1="18" x2="6" y2="35" stroke="var(--brand-ink)" strokeWidth="1.5" />
          <polygon points="5,35 9,33 7,39" fill="var(--brand-ink)" />
          <line x1="6" y1="35" x2="2" y2="52" stroke="var(--brand-ink)" strokeWidth="1.5" />
          <polygon points="1,52 5,50 3,56" fill="var(--brand-red)" />
        </g>

        {/* Skyline em silhueta preta: casas sobrepostas, caixas d'água, lajes */}
        {/* Casas de fundo / camadas secundárias */}
        <path
          d="M0 140 L0 80 L40 80 L40 60 L75 60 L75 80 L110 80 L110 95 L160 95 L160 70 L210 70 L210 85 L260 85 L260 55 L310 55 L310 90 L360 90 L360 65 L420 65 L420 85 L480 85 L480 50 L540 50 L540 80 L600 80 L600 65 L660 65 L660 90 L720 90 L720 60 L780 60 L780 85 L840 85 L840 55 L900 55 L900 85 L960 85 L960 60 L1020 60 L1020 85 L1080 85 L1080 70 L1140 70 L1140 85 L1200 85 L1200 140 Z"
          fill="var(--brand-ink)"
        />

        {/* Caixas d'água azuis/pretas sobre telhados */}
        {/* Caixa d'água 1 */}
        <rect x="50" y="48" width="20" height="12" fill="var(--brand-ink)" />
        <ellipse cx="60" cy="48" rx="10" ry="3" fill="var(--brand-concrete)" />

        {/* Caixa d'água 2 */}
        <rect x="280" y="42" width="22" height="13" fill="var(--brand-ink)" />
        <ellipse cx="291" cy="42" rx="11" ry="3" fill="var(--brand-concrete)" />

        {/* Caixa d'água 3 */}
        <rect x="500" y="37" width="24" height="13" fill="var(--brand-ink)" />
        <ellipse cx="512" cy="37" rx="12" ry="3.5" fill="var(--brand-concrete)" />

        {/* Caixa d'água 4 */}
        <rect x="745" y="47" width="22" height="13" fill="var(--brand-ink)" />
        <ellipse cx="756" cy="47" rx="11" ry="3" fill="var(--brand-concrete)" />

        {/* Caixa d'água 5 */}
        <rect x="865" y="42" width="22" height="13" fill="var(--brand-ink)" />
        <ellipse cx="876" cy="42" rx="11" ry="3" fill="var(--brand-concrete)" />

        {/* Janelinhas geométricas e tijolos em recorte contrastante */}
        <rect x="20" y="95" width="10" height="14" fill="var(--brand-paper)" />
        <rect x="125" y="105" width="12" height="15" fill="var(--brand-paper)" />
        <rect x="180" y="90" width="14" height="14" fill="var(--brand-paper)" />
        <rect x="330" y="100" width="12" height="14" fill="var(--brand-paper)" />
        <rect x="440" y="95" width="14" height="15" fill="var(--brand-paper)" />
        <rect x="560" y="95" width="12" height="14" fill="var(--brand-paper)" />
        <rect x="680" y="105" width="14" height="14" fill="var(--brand-paper)" />
        <rect x="800" y="95" width="12" height="14" fill="var(--brand-paper)" />
        <rect x="920" y="100" width="14" height="14" fill="var(--brand-paper)" />
        <rect x="1040" y="95" width="12" height="14" fill="var(--brand-paper)" />
      </svg>
    </div>
  )
}
