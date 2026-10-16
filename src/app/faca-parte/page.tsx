import type { Metadata } from 'next'
import { FacaParteForm } from './FacaParteForm'

export const metadata: Metadata = {
  title: 'Faça parte | Manifesto da Sul',
  description:
    'Conheça o coletivo Manifesto da Sul e manifeste seu interesse em participar das atividades.',
}

export default function FacaPartePage() {
  return (
    <div className="w-full flex-1 bg-[var(--brand-paper)]">
      <header className="border-b border-[var(--brand-ink)] px-5 py-10 sm:px-10 sm:py-14 lg:px-[12vw]">
        <p className="section-kicker">Manifesto da Sul <span aria-hidden="true">/</span> Participação</p>
        <h1 className="mt-4 font-title text-[clamp(2.8rem,7vw,5.5rem)] leading-none">Faça parte</h1>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg">
          O coletivo se constrói com quem vive e cria na quebrada. Conte um pouco sobre você e como gostaria de participar.
        </p>
      </header>

      <section className="grid gap-8 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[minmax(0,2fr)_minmax(14rem,.8fr)] lg:gap-14 lg:px-[12vw]">
        <FacaParteForm />
        <aside className="max-w-sm border-t-3 border-[var(--brand-red)] pt-4">
          <p className="section-kicker">Sem pressa, sem pressão</p>
          <h2 className="mt-3 font-title text-2xl leading-tight sm:text-3xl">Você escolhe como somar.</h2>
          <p className="mt-4 font-sans text-base leading-relaxed">
            O cadastro não cria compromisso. Você pode pedir para consultar ou apagar seus dados conforme a política de privacidade.
          </p>
        </aside>
      </section>
    </div>
  )
}
