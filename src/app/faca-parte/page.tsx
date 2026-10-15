import type { Metadata } from 'next'
import { FacaParteForm } from './FacaParteForm'

export const metadata: Metadata = {
  title: 'Faça Parte | Manifesto da Sul',
  description:
    'Cadastre seu interesse em participar do coletivo Manifesto da Sul. Venha somar na construção cultural da Zona Sul.',
}

export default function FacaPartePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center space-y-3 mb-8">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[var(--brand-secondary)]/15 text-amber-900">
          Chamada Aberta
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-dark)]">
          Faça Parte do Coletivo
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
          O Manifesto da Sul se constrói com quem vive e cria na quebrada.
          Preencha o formulário abaixo para receber informações dos nossos encontros e somar com a gente.
        </p>
      </div>

      {/* Formulário Interativo */}
      <FacaParteForm />

      {/* Observação de acolhimento */}
      <div className="mt-8 text-center text-xs text-stone-500 space-y-1">
        <p>Não há mensalidades, cobranças ou processos seletivos formais.</p>
        <p>A cultura popular é direito e construção coletiva.</p>
      </div>
    </div>
  )
}
