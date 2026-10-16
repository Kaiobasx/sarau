import type { ChangeEvent } from 'react'

export interface FichaFieldProps {
  number: string
  label: string
  id: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  helperText?: string
  as?: 'input' | 'textarea'
  rows?: number
  maxLength?: number
  minLength?: number
  value?: string
  defaultValue?: string
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function FichaField({
  number,
  label,
  id,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  helperText,
  as = 'input',
  rows = 3,
  maxLength,
  minLength,
  value,
  defaultValue,
  onChange,
}: FichaFieldProps) {
  const fieldClass =
    'ficha-input w-full border-0 border-b-3 border-[var(--brand-ink)] bg-transparent px-1 py-3 font-sans text-base text-[var(--brand-ink)] placeholder:text-[var(--brand-concrete)] focus:border-[var(--brand-red)] focus:outline-none sm:text-lg'

  return (
    <div className="relative w-full pt-3">
      <label
        htmlFor={id}
        className="block font-condensed text-sm font-bold uppercase tracking-[1.5px] text-[var(--brand-ink)] sm:text-base"
      >
        {number}. {label}{required && <span className="text-[var(--brand-red)]"> *</span>}
      </label>
      <div className="relative">
        {as === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={`${fieldClass} resize-y`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className={fieldClass}
          />
        )}
        <span data-motion="line" className="ficha-underline pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[var(--brand-red)]" />
      </div>
      {helperText && !error && <p className="pt-1 font-sans text-base text-[var(--brand-concrete)]">{helperText}</p>}
      {error && <p className="pt-1 font-sans text-base font-bold text-[var(--brand-red)]">{error}</p>}
    </div>
  )
}
