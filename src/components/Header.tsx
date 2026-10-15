'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-dark)] text-[var(--brand-light)] border-b border-[var(--brand-dark-border)] shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Nome */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-[var(--brand-light)] hover:text-[var(--brand-secondary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-secondary)]"
          aria-label="Manifesto da Sul - Página Inicial"
        >
          <span className="inline-block w-3 h-3 rounded-full bg-[var(--brand-primary)]"></span>
          <span>Manifesto da Sul</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Navegação principal">
          <Link
            href="/"
            className="hover:text-[var(--brand-secondary)] transition-colors"
          >
            Início
          </Link>
          <Link
            href="/agenda"
            className="hover:text-[var(--brand-secondary)] transition-colors"
          >
            Agenda
          </Link>
          <Link
            href="/faca-parte"
            className="hover:text-[var(--brand-secondary)] transition-colors"
          >
            Faça Parte
          </Link>
          <Link
            href="/privacidade"
            className="hover:text-[var(--brand-secondary)] transition-colors text-stone-400"
          >
            Privacidade
          </Link>
        </nav>

        {/* Actions Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Manifesto%20da%20Sul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600 transition-colors"
            aria-label="Fale conosco no WhatsApp"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            WhatsApp
          </a>
          <Link
            href="/faca-parte"
            className="px-4 py-1.5 rounded-md text-xs font-semibold bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white shadow-sm transition-colors"
          >
            Faça Parte
          </Link>
        </div>

        {/* Mobile quick actions & toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Manifesto%20da%20Sul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-800 text-emerald-100 border border-emerald-600"
            aria-label="WhatsApp direto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Whats
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-stone-300 hover:text-white hover:bg-[var(--brand-dark-surface)] focus:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu de navegação"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--brand-dark-surface)] border-b border-[var(--brand-dark-border)] px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-200 hover:bg-[var(--brand-dark)] hover:text-white"
          >
            Início
          </Link>
          <Link
            href="/agenda"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-200 hover:bg-[var(--brand-dark)] hover:text-white"
          >
            Agenda de Eventos
          </Link>
          <Link
            href="/faca-parte"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-200 hover:bg-[var(--brand-dark)] hover:text-white"
          >
            Faça Parte
          </Link>
          <Link
            href="/privacidade"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-stone-400 hover:bg-[var(--brand-dark)] hover:text-white"
          >
            Política de Privacidade
          </Link>
          <div className="pt-2">
            <Link
              href="/faca-parte"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full block text-center py-2.5 px-4 rounded-md font-semibold text-sm bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors"
            >
              Quero Participar do Coletivo
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
