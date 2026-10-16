import React from 'react'

export function MegaphoneHero({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 500 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[420px]"
      >
        {/* Ondas sonoras estáticas, limpas e emanando da boca */}
        <g
          stroke="var(--brand-ink)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M300 202C324 218 324 262 300 278" />
          <path d="M318 184C356 209 356 271 318 296" />
          <path d="M336 166C388 201 388 279 336 314" />
        </g>

        {/* Megafone em silhueta de alto contraste */}
        {/* Cone Principal */}
        <polygon
          points="80,210 260,140 280,340 80,270"
          fill="var(--brand-ink)"
          stroke="var(--brand-ink)"
          strokeWidth="6"
        />

        {/* Detalhe no cone (faixa vermelha) */}
        <polygon
          points="140,187 180,171 190,305 140,289"
          fill="var(--brand-red)"
        />

        {/* Borda frontal da boca do megafone */}
        <ellipse
          cx="270"
          cy="240"
          rx="18"
          ry="100"
          fill="var(--brand-red)"
          stroke="var(--brand-ink)"
          strokeWidth="8"
        />

        {/* Miolo escuro da boca */}
        <ellipse
          cx="266"
          cy="240"
          rx="9"
          ry="70"
          fill="var(--brand-ink)"
        />

        {/* Corpo traseiro / bocal */}
        <rect
          x="30"
          y="220"
          width="55"
          height="40"
          fill="var(--brand-ink)"
          stroke="var(--brand-ink)"
          strokeWidth="4"
        />
        <rect
          x="15"
          y="225"
          width="20"
          height="30"
          fill="var(--brand-red)"
          stroke="var(--brand-ink)"
          strokeWidth="4"
        />

        {/* Alça / Punho do megafone */}
        <path
          d="M70 265 L55 355 L90 355 L105 260 Z"
          fill="var(--brand-ink)"
          stroke="var(--brand-ink)"
          strokeWidth="4"
        />
        <rect
          x="55"
          y="345"
          width="40"
          height="16"
          fill="var(--brand-red)"
          stroke="var(--brand-ink)"
          strokeWidth="3"
        />

        {/* Gatilho */}
        <path
          d="M80 290 Q65 295 72 315 L82 310 Z"
          fill="var(--brand-red)"
        />
      </svg>
    </div>
  )
}
