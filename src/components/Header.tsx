'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'História', href: '/#de-onde-viemos' },
  { label: 'Privacidade', href: '/privacidade' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const menuCloseRef = useRef<HTMLButtonElement>(null)
  const mobileNavigationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuCloseRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuToggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = mobileNavigationRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled)',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    menuToggleRef.current?.focus()
  }

  return (
    <header className="site-header">
      <div className="edition-line">
        <span>Manifesto da Sul</span>
        <span>Zona Sul · São Paulo</span>
      </div>
      <div className="header-main">
        <Link href="/" aria-label="Manifesto da Sul — início" className="header-brand">
          Manifesto da Sul
        </Link>
        <p className="header-description">Sarau, formação<br />e território.</p>
        <button
          ref={menuToggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
          onClick={() => setMenuOpen((open) => !open)}
          className="menu-toggle"
        >
          {menuOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>
      <nav aria-label="Navegação principal" className="main-navigation">
        {navItems.map((item, index) => (
          <Link key={item.href} href={item.href} className={index === 0 ? '' : 'nav-secondary'}>
            <span aria-hidden="true" className="nav-number">0{index + 1}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        <Link href="/faca-parte" onClick={() => setMenuOpen(false)} className="nav-action">
          <span aria-hidden="true" className="nav-number">05</span>
          <span>Faça parte</span> <span aria-hidden="true">→</span>
        </Link>
      </nav>
      <div
        ref={mobileNavigationRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Navegação móvel"
        hidden={!menuOpen}
        className="mobile-navigation-overlay"
      >
        <div className="mobile-navigation-heading">
          <span className="font-logo">Manifesto da Sul</span>
          <button ref={menuCloseRef} type="button" onClick={closeMenu} className="menu-toggle">
            Fechar <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Navegação móvel" className="mobile-navigation">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              <span aria-hidden="true" className="nav-number">0{index + 1}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <Link href="/faca-parte" onClick={closeMenu} className="mobile-action">
            <span aria-hidden="true" className="nav-number">05</span>
            <span>Faça parte <span aria-hidden="true">→</span></span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
