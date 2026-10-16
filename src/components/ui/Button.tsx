import React from 'react'
import Link from 'next/link'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'cream' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  className = '',
  disabled,
  id,
  ...props
}: ButtonProps) {
  const baseStyles =
    'print-button inline-flex min-h-11 items-stretch justify-center border-3 border-[var(--brand-ink)] font-condensed font-bold uppercase tracking-[1.5px] select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-55'

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  }

  const variantStyles = {
    primary: 'button-primary bg-[var(--brand-red)] text-[var(--brand-paper)] [--button-arrow-bg:var(--brand-ink)] [--button-arrow-fg:var(--brand-paper)]',
    outline: 'button-outline bg-transparent text-[var(--brand-ink)] [--button-arrow-bg:var(--brand-ink)] [--button-arrow-fg:var(--brand-paper)]',
    cream: 'button-cream bg-[var(--brand-paper)] text-[var(--brand-ink)] [--button-arrow-bg:var(--brand-ink)] [--button-arrow-fg:var(--brand-paper)]',
    dark: 'button-dark bg-[var(--brand-ink)] text-[var(--brand-paper)] [--button-arrow-bg:var(--brand-paper)] [--button-arrow-fg:var(--brand-ink)]',
  }

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`
  const content = (
    <>
      <span className="flex min-h-11 items-center px-4 py-2.5 sm:px-6">{children}</span>
      <span aria-hidden="true" className="button-arrow flex min-h-11 min-w-11 items-center justify-center border-l-3 border-[var(--brand-ink)] bg-[var(--button-arrow-bg)] px-2 text-xl text-[var(--button-arrow-fg)]">
        →
      </span>
    </>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
          id={id}
          aria-disabled={disabled}
          onClick={disabled ? (event) => event.preventDefault() : undefined}
        >
          {content}
        </a>
      )
    }
    return <Link href={href} className={combinedClass} id={id}>{content}</Link>
  }

  return <button className={combinedClass} id={id} disabled={disabled} {...props}>{content}</button>
}
