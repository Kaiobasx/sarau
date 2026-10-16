'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { submitInteresse, type SubmitInteresseState } from '@/app/actions/submit-interesse'
import { FichaField } from '@/components/ui/FichaField'
import { Button } from '@/components/ui/Button'

const initialState: SubmitInteresseState = {}

export function FacaParteForm() {
  const [state, formAction, isPending] = useActionState(submitInteresse, initialState)
  const [lgpdAccepted, setLgpdAccepted] = useState(false)

  if (state.success) {
    return (
      <section role="status" aria-live="polite" className="relative border border-[var(--brand-ink)] bg-[var(--brand-paper)] p-5 sm:p-8">
        <div className="mb-7 flex items-start justify-between gap-5 border-b-3 border-[var(--brand-ink)] pb-5">
          <div>
            <p className="font-condensed text-sm font-semibold uppercase tracking-[1px] text-[var(--brand-concrete)]">Manifesto da Sul · Participação</p>
            <h2 className="mt-2 font-title text-2xl leading-tight text-[var(--brand-ink)] sm:text-4xl">Inscrição recebida</h2>
          </div>
        </div>
        <p className="max-w-xl font-sans text-base leading-relaxed text-[var(--brand-ink)] sm:text-lg">
          {state.message || 'Recebemos seu contato! Em breve o coletivo vai chamar você.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="primary" size="sm" href="/agenda">VER A AGENDA</Button>
          <Button variant="outline" size="sm" href="/">VOLTAR AO INÍCIO</Button>
        </div>
      </section>
    )
  }

  return (
    <form
      action={formAction}
      className="relative border border-[var(--brand-ink)] bg-[var(--brand-paper)] p-5 sm:p-8"
    >
      <div className="mb-5 border-b border-[var(--brand-ink)] pb-4">
        <p className="font-condensed text-sm font-semibold uppercase tracking-[1px] text-[var(--brand-concrete)]">Manifesto da Sul · Zona Sul · SP</p>
        <h2 className="mt-2 font-title text-2xl leading-[.92] text-[var(--brand-ink)] sm:text-4xl">
          Ficha de participação
        </h2>
      </div>
      <p className="mb-4 font-sans text-base leading-relaxed text-[var(--brand-concrete)]">
        Preencha com calma. Seus dados ficam protegidos e não serão vendidos.
      </p>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="b_website">Não preencha este campo se for humano:</label>
        <input type="text" id="b_website" name="b_website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && !state.success && (
        <div role="alert" className="mb-5 border-l-8 border-[var(--brand-red)] bg-[var(--brand-paper-2)] p-3 font-condensed text-sm font-bold uppercase tracking-[1px] text-[var(--brand-ink)]">
          AVISO: {state.message}
        </div>
      )}

      <div className="space-y-4">
        <FichaField
          number="1"
          label="Nome ou nome social"
          id="nome"
          name="nome"
          required
          minLength={2}
          maxLength={120}
          placeholder="Escreva aqui"
          error={state.errors?.nome}
        />
        <FichaField
          number="2"
          label="Bairro / quebrada"
          id="bairro"
          name="bairro"
          required
          minLength={2}
          maxLength={100}
          placeholder="Onde você vive ou circula?"
          error={state.errors?.bairro}
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <FichaField
            number="3"
            label="WhatsApp"
            id="contato_whatsapp"
            name="contato_whatsapp"
            type="tel"
            placeholder="(11) 99999-9999"
          />
          <FichaField
            number="4"
            label="E-mail"
            id="contato_email"
            name="contato_email"
            type="email"
            placeholder="voce@exemplo.com"
          />
        </div>
        <p className="font-sans text-base text-[var(--brand-concrete)]">
          Preencha pelo menos um contato para a gente chamar.
        </p>
        {state.errors?.contato && (
          <p role="alert" className="font-sans text-base font-bold text-[var(--brand-red)]">{state.errors.contato}</p>
        )}
        <FichaField
          number="5"
          label="O que você faz ou quer fazer?"
          id="habilidades"
          name="habilidades"
          as="textarea"
          rows={3}
          maxLength={500}
          placeholder="Poesia, música, design, organização, cozinha..."
          helperText="Opcional. Toda habilidade soma na quebrada."
        />
      </div>

      <div className="mt-7 border-t-2 border-[var(--brand-paper-2)] pt-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consentimento_lgpd"
            id="consentimento_lgpd"
            checked={lgpdAccepted}
            onChange={(event) => setLgpdAccepted(event.target.checked)}
            className="ficha-checkbox sr-only"
          />
          <span aria-hidden="true" className="checkbox-x mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-3 border-[var(--brand-ink)] font-condensed text-lg font-bold text-[var(--brand-paper)]" />
          <span className="font-sans text-base leading-relaxed text-[var(--brand-ink)]">
            Concordo com o uso dos meus dados para o coletivo entrar em contato, conforme a{' '}
            <Link href="/privacidade" target="_blank" className="font-bold text-[var(--brand-red)] underline decoration-2 underline-offset-2">
              política de privacidade
            </Link>.
          </span>
        </label>
        {state.errors?.consentimento_lgpd && (
          <p role="alert" className="mt-2 font-sans text-base font-bold text-[var(--brand-red)]">{state.errors.consentimento_lgpd}</p>
        )}
      </div>

      <div className="mt-7">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!lgpdAccepted || isPending}
          className="w-full"
        >
          {isPending ? 'ENVIANDO...' : 'ENVIAR FICHA'}
        </Button>
        {!lgpdAccepted && (
          <p className="mt-3 font-condensed text-xs font-bold uppercase tracking-[1px] text-[var(--brand-concrete)]">
            Marque o consentimento acima para liberar o envio.
          </p>
        )}
      </div>
    </form>
  )
}
