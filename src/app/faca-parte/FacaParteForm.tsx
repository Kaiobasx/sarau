'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { submitInteresse, type SubmitInteresseState } from '@/app/actions/submit-interesse'

const initialState: SubmitInteresseState = {}

export function FacaParteForm() {
  const [state, formAction, isPending] = useActionState(submitInteresse, initialState)
  const [lgpdAccepted, setLgpdAccepted] = useState(false)

  if (state.success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-8 text-center space-y-4 shadow-sm animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-emerald-950">Sarau da Sul na escuta!</h3>
        <p className="text-base text-emerald-800 max-w-md mx-auto">
          {state.message || 'Recebemos seu contato! Em breve o coletivo vai chamar você.'}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/agenda"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] text-white font-medium hover:bg-[var(--brand-primary-hover)] transition-colors text-sm"
          >
            Ver Próximos Eventos
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-emerald-300 text-emerald-900 font-medium hover:bg-emerald-100/60 transition-colors text-sm"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
      {/* Honeypot invisível para bots */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0 }} aria-hidden="true">
        <label htmlFor="b_website">Não preencha este campo se for humano:</label>
        <input
          type="text"
          id="b_website"
          name="b_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Erro geral / Rate Limit */}
      {state.message && !state.success && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm">
          <strong>Aviso:</strong> {state.message}
        </div>
      )}

      {/* Campo: Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-stone-900 mb-1.5">
          Nome ou Nome Social <span className="text-[var(--brand-primary)]">*</span>
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          minLength={2}
          maxLength={120}
          placeholder="Como quer ser chamado(a)?"
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] text-sm"
        />
        {state.errors?.nome && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{state.errors.nome}</p>
        )}
      </div>

      {/* Campo: Bairro */}
      <div>
        <label htmlFor="bairro" className="block text-sm font-semibold text-stone-900 mb-1.5">
          Bairro / Quebrada <span className="text-[var(--brand-primary)]">*</span>
        </label>
        <input
          id="bairro"
          name="bairro"
          type="text"
          required
          minLength={2}
          maxLength={100}
          placeholder="Ex: Capão Redondo, Jardim Ângela, Grajaú..."
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] text-sm"
        />
        {state.errors?.bairro && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{state.errors.bairro}</p>
        )}
      </div>

      {/* Seção Contatos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campo: WhatsApp */}
        <div>
          <label htmlFor="contato_whatsapp" className="block text-sm font-semibold text-stone-900 mb-1.5">
            WhatsApp <span className="text-xs font-normal text-stone-500">(preferencial)</span>
          </label>
          <input
            id="contato_whatsapp"
            name="contato_whatsapp"
            type="tel"
            placeholder="(11) 99999-9999"
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] text-sm"
          />
        </div>

        {/* Campo: E-mail */}
        <div>
          <label htmlFor="contato_email" className="block text-sm font-semibold text-stone-900 mb-1.5">
            E-mail
          </label>
          <input
            id="contato_email"
            name="contato_email"
            type="email"
            placeholder="seuemail@exemplo.com"
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] text-sm"
          />
        </div>
      </div>
      <p className="text-xs text-stone-500">
        Preencha ao menos um dos canais acima para podermos retornar o contato.
      </p>
      {state.errors?.contato && (
        <p className="text-xs text-red-600 font-medium">{state.errors.contato}</p>
      )}

      {/* Campo: Habilidades e Interesses */}
      <div>
        <label htmlFor="habilidades" className="block text-sm font-semibold text-stone-900 mb-1.5">
          Com o que você gostaria de somar? <span className="text-xs font-normal text-stone-500">(opcional)</span>
        </label>
        <textarea
          id="habilidades"
          name="habilidades"
          rows={3}
          maxLength={500}
          placeholder="Ex: recitar poesia, música, apoio na organização, fotos, articulação comunitária..."
          className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] text-sm"
        ></textarea>
      </div>

      {/* Checkbox Consentimento LGPD */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consentimento_lgpd"
            id="consentimento_lgpd"
            checked={lgpdAccepted}
            onChange={(e) => setLgpdAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-stone-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
          />
          <span className="text-xs sm:text-sm text-stone-700 leading-snug">
            Concordo em compartilhar estes dados com o coletivo Manifesto da Sul para contato comunitário, nos termos da{' '}
            <Link
              href="/privacidade"
              target="_blank"
              className="text-[var(--brand-primary)] underline hover:text-[var(--brand-primary-hover)] font-semibold"
            >
              Política de Privacidade (LGPD)
            </Link>
            . Meu IP é criptografado e não será salvo em texto claro.
          </span>
        </label>
        {state.errors?.consentimento_lgpd && (
          <p className="mt-1.5 text-xs text-red-600 font-medium">{state.errors.consentimento_lgpd}</p>
        )}
      </div>

      {/* Botão Enviar (Desabilitado até aceite da LGPD) */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!lgpdAccepted || isPending}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Enviando seu contato...</span>
            </>
          ) : (
            'Enviar meu interesse e somar no coletivo'
          )}
        </button>
        {!lgpdAccepted && (
          <p className="text-center text-xs text-stone-500 mt-2">
            Marque o consentimento de privacidade acima para habilitar o envio.
          </p>
        )}
      </div>
    </form>
  )
}
