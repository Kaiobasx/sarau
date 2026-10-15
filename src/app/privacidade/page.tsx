import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade e Proteção de Dados (LGPD)',
  description:
    'Entenda com transparência quais dados o Manifesto da Sul coleta, por que coletamos, como protegemos seu IP com HMAC e como exercer seus direitos pela LGPD.',
}

export default function PrivacidadePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header do documento */}
      <div className="mb-10 pb-6 border-b border-stone-200">
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] mb-3">
          Transparência & LGPD
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--brand-dark)]">
          Política de Privacidade do Coletivo
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
          <span><strong>Versão:</strong> 1.0 (Fase 1 — MVP)</span>
          <span>•</span>
          <span><strong>Última atualização:</strong> 15 de outubro de 2026</span>
          <span>•</span>
          <span><strong>Coletivo:</strong> Manifesto da Sul</span>
        </div>
      </div>

      {/* Conteúdo */}
      <article className="prose prose-stone max-w-none space-y-8 text-stone-800 text-sm sm:text-base leading-relaxed">
        {/* Apresentação */}
        <section className="space-y-3">
          <p className="font-medium text-stone-900 text-lg">
            O <strong>Manifesto da Sul</strong> é um coletivo cultural periférico e independente, nascido na Zona Sul de São Paulo.
            Nosso compromisso é com a comunidade, a arte e o respeito às pessoas — e isso inclui cuidar da sua privacidade com total transparência e seriedade.
          </p>
          <p>
            Esta política explica, em linguagem clara e sem juridiquês desnecessário, o que acontece quando você demonstra interesse em participar das nossas atividades através do formulário <Link href="/faca-parte" className="text-[var(--brand-primary)] hover:underline font-semibold">Faça Parte</Link> ou navega no nosso site, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </section>

        {/* 1. Quais dados coletamos */}
        <section className="space-y-3 bg-[var(--brand-light-surface)] p-6 rounded-xl border border-stone-200">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            1. Quais dados coletamos e de onde vêm?
          </h2>
          <p>
            Coletamos apenas as informações que <strong>você mesmo nos fornece voluntariamente</strong> ao preencher o formulário:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
            <li><strong>Nome completo ou social:</strong> para sabermos como chamar você com respeito.</li>
            <li><strong>Bairro ou região:</strong> para entendermos de qual quebrada você é e como aproximar os saraus e atividades.</li>
            <li><strong>Contato (E-mail ou WhatsApp):</strong> para a coordenação poder mandar mensagem e convidar para as reuniões e ações.</li>
            <li><strong>Habilidades e interesses (opcional):</strong> poesia, música, som, fotografia, produção ou vontade de somar.</li>
            <li><strong>Registro anti-spam técnico (IP anonimizado):</strong> geramos um código criptográfico irreversível (hash HMAC-SHA256) a partir da sua conexão para evitar robôs e ataques. <em>Seu endereço IP de verdade nunca é salvo em texto claro.</em></li>
          </ul>
        </section>

        {/* 2. Como protegemos seu IP */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            2. Como tratamos endereços IP e proteção anti-spam?
          </h2>
          <p>
            Para garantir que formulários não sejam abusados por bots ou spammers, utilizamos uma técnica de <strong>anonimização por HMAC com segredo do servidor</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
            <li>O IP do visitante é transformado em um código hash criptográfico antes de qualquer gravação.</li>
            <li>Ninguém — nem os mantenedores, nem a coordenação — consegue reverter esse código para descobrir o endereço IP real.</li>
            <li><strong>Prazo de retenção de 30 dias:</strong> esse código HMAC tem validade máxima de 30 dias. Um processo automático diário (job programado no banco) apaga e nulifica permanentemente todos os registros de HMAC com mais de 30 dias.</li>
          </ul>
        </section>

        {/* 3. Para que usamos os dados */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            3. Finalidade e base legal
          </h2>
          <p>
            Utilizamos suas informações exclusivamente para:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-stone-700">
            <li>A coordenação do coletivo entrar em contato com você para acolhimento e convites para reuniões e saraus;</li>
            <li>Mapear a presença do coletivo nos territórios da Zona Sul;</li>
            <li>Garantir a segurança técnica das nossas ferramentas digitais.</li>
          </ol>
          <p className="text-stone-700">
            <strong>Base Legal (LGPD Art. 7º, I e IX):</strong> O tratamento é baseado no seu <em>consentimento livre, inequívoco e informado</em> manifestado no checkbox do formulário, e no legítimo interesse do coletivo para proteção de segurança do site.
          </p>
          <p className="font-semibold text-[var(--brand-primary)]">
            Nós NUNCA vendemos, alugamos, compartilhamos com empresas ou usamos seus dados para fins comerciais ou publicitários.
          </p>
        </section>

        {/* 4. Quem tem acesso aos dados */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            4. Quem tem acesso às informações?
          </h2>
          <p>
            Na Fase 1 do coletivo:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
            <li>Não há área logada nem contas de usuário públicas no site.</li>
            <li>A coordenação recebe as notificações de interesse por e-mail seguro para fazer o acolhimento.</li>
            <li>A infraestrutura técnica do banco de dados (Supabase) é restrita com políticas rígidas de segurança (Row Level Security), de modo que nenhum usuário da internet consegue listar ou ver os dados de outros participantes.</li>
          </ul>
        </section>

        {/* 5. Seus direitos como titular */}
        <section className="space-y-3 bg-stone-100 p-6 rounded-xl border border-stone-200">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            5. Seus direitos garantidos por lei (Art. 18 da LGPD)
          </h2>
          <p>
            Você é o dono dos seus dados a qualquer momento. Você pode:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
            <li>Confirmar se temos informações sobre você;</li>
            <li>Acessar os dados que temos cadastrados;</li>
            <li>Corrigir dados incompletos ou desatualizados;</li>
            <li><strong>Pedir a exclusão total e imediata</strong> do seu contato das nossas listas;</li>
            <li>Revogar o seu consentimento quando desejar.</li>
          </ul>
        </section>

        {/* 6. Como exercer seus direitos */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            6. Como falar com o responsável pelo tratamento de dados?
          </h2>
          <p>
            Para exercer qualquer um dos seus direitos, tirar dúvidas ou pedir a exclusão do seu registro, basta entrar em contato com a equipe de organização:
          </p>
          <div className="bg-stone-50 border border-stone-300 rounded-lg p-4 space-y-2 text-sm">
            <p><strong>Canal do Coletivo:</strong> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold hover:underline">WhatsApp do Coletivo Manifesto da Sul</a></p>
            <p><strong>E-mail de Privacidade:</strong> <span className="font-mono text-stone-800">privacidade@manifestodasul.org.br</span> (ou pelo contato institucional)</p>
            <p className="text-xs text-stone-500">Respondemos solicitações em prazo razoável, sempre com prioridade e acolhimento comunitário.</p>
          </div>
        </section>

        {/* 7. Alterações nesta política */}
        <section className="space-y-3 pb-8">
          <h2 className="text-xl font-bold text-[var(--brand-dark)]">
            7. Atualizações desta Política
          </h2>
          <p>
            Conforme o coletivo crescer e avançarmos para novas fases (como área de membros ou novos projetos culturais), esta política poderá ser atualizada para refletir com fidelidade as novas ferramentas. Sempre manteremos a data de revisão e histórico visíveis aqui.
          </p>
        </section>
      </article>

      {/* Botão de volta */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] hover:underline"
        >
          ← Voltar para a Página Inicial
        </Link>
        <Link
          href="/faca-parte"
          className="px-4 py-2 text-xs font-semibold rounded-md bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-colors"
        >
          Ir para o Faça Parte
        </Link>
      </div>
    </div>
  )
}
