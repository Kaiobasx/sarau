import React from 'react'

export function MegaphoneFacaParte({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Raios expansivos geométricos partindo do megafone (fundo vermelho escuro/preto) */}
        <g fill="var(--brand-red-dark)" opacity="0.65">
          <polygon points="260,280 40,0 120,0" />
          <polygon points="260,280 200,0 280,0" />
          <polygon points="260,280 380,0 460,0" />
          <polygon points="260,280 540,0 600,0 600,40" />
          <polygon points="260,280 600,120 600,200" />
          <polygon points="260,280 600,280 600,360" />
          <polygon points="260,280 600,440 600,500 520,500" />
          <polygon points="260,280 400,500 320,500" />
          <polygon points="260,280 220,500 140,500" />
          <polygon points="260,280 60,500 0,500 0,440" />
        </g>

        {/* Megafone inclinado em silhueta preta e branca de alto contraste */}
        <g transform="translate(180, 220) rotate(-35)">
          {/* Cone Principal */}
          <polygon
            points="0,60 180,-10 200,190 0,120"
            fill="var(--brand-ink)"
            stroke="var(--brand-ink)"
            strokeWidth="8"
          />

          {/* Faixa branca/creme no cone */}
          <polygon
            points="60,37 100,21 110,155 60,139"
            fill="var(--brand-paper)"
          />

          {/* Boca do megafone */}
          <ellipse
            cx="190"
            cy="90"
            rx="18"
            ry="100"
            fill="var(--brand-paper)"
            stroke="var(--brand-ink)"
            strokeWidth="8"
          />
          <ellipse
            cx="186"
            cy="90"
            rx="9"
            ry="70"
            fill="var(--brand-ink)"
          />

          {/* Bocal */}
          <rect
            x="-45"
            y="70"
            width="50"
            height="40"
            fill="var(--brand-ink)"
            stroke="var(--brand-ink)"
            strokeWidth="4"
          />
          <rect
            x="-60"
            y="75"
            width="20"
            height="30"
            fill="var(--brand-paper)"
            stroke="var(--brand-ink)"
            strokeWidth="4"
          />

          {/* Punho */}
          <path
            d="M-5 115 L-20 205 L15 205 L30 110 Z"
            fill="var(--brand-ink)"
            stroke="var(--brand-ink)"
            strokeWidth="5"
          />
          <rect
            x="-20"
            y="195"
            width="40"
            height="18"
            fill="var(--brand-paper)"
            stroke="var(--brand-ink)"
            strokeWidth="3"
          />
        </g>
      </svg>
    </div>
  )
}
