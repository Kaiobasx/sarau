import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade e Proteção de Dados (LGPD)',
  description:
    'Entenda com transparência quais dados o Manifesto da Sul coleta, por que coletamos, como protegemos seu IP com HMAC e como exercer seus direitos pela LGPD.',
}

export default function PrivacidadePage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-5 py-10 sm:px-10 sm:py-16">
      <header className="mb-8 border-b border-[var(--brand-ink)] pb-6">
        <p className="section-kicker">Manifesto da Sul <span aria-hidden="true">/</span> Transparência</p>
        <h1 className="mt-4 max-w-4xl font-title text-[clamp(2.3rem,6vw,4.5rem)] leading-[1.02] text-[var(--brand-ink)]">
          Política de Privacidade do Coletivo
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-condensed text-sm font-medium text-[var(--brand-concrete)]">
          <span><strong>Versão:</strong> 1.0 (Fase 1 — MVP)</span>
          <span><strong>Última atualização:</strong> 15 de outubro de 2026</span>
          <span><strong>Coletivo:</strong> Manifesto da Sul</span>
        </div>
      </header>

      {/* Conteúdo */}
      <article className="privacy-copy space-y-8 font-sans text-base leading-relaxed text-[var(--brand-ink)] sm:text-lg">
        {/* Apresentação */}
        <section className="space-y-3">
          <p className="text-lg font-medium text-[var(--brand-ink)]">
            O <strong>Manifesto da Sul</strong> é um coletivo cultural periférico e independente, nascido na Zona Sul de São Paulo.
            Nosso compromisso é com a comunidade, a arte e o respeito às pessoas — e isso inclui cuidar da sua privacidade com total transparência e seriedade.
          </p>
          <p>
            Esta política explica, em linguagem clara e sem juridiquês desnecessário, o que acontece quando você demonstra interesse em participar das nossas atividades através do formulário <Link href="/faca-parte" className="font-semibold text-[var(--brand-red)] underline decoration-2 underline-offset-2">Faça Parte</Link> ou navega no nosso site, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </section>

        {/* 1. Quais dados coletamos */}
        <section className="space-y-3 border-y-3 border-[var(--brand-ink)] bg-[var(--brand-paper-2)] p-5 sm:p-7">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            1. Quais dados coletamos e de onde vêm?
          </h2>
          <p>
            Coletamos apenas as informações que <strong>você mesmo nos fornece voluntariamente</strong> ao preencher o formulário:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-[var(--brand-ink)]">
            <li><strong>Nome completo ou social:</strong> para sabermos como chamar você com respeito.</li>
            <li><strong>Bairro ou região:</strong> para entendermos de qual quebrada você é e como aproximar os saraus e atividades.</li>
            <li><strong>Contato (E-mail ou WhatsApp):</strong> para a coordenação poder mandar mensagem e convidar para as reuniões e ações.</li>
            <li><strong>Habilidades e interesses (opcional):</strong> poesia, música, som, fotografia, produção ou vontade de somar.</li>
            <li><strong>Registro anti-spam técnico (IP anonimizado):</strong> geramos um código criptográfico irreversível (hash HMAC-SHA256) a partir da sua conexão para evitar robôs e ataques. <em>Seu endereço IP de verdade nunca é salvo em texto claro.</em></li>
          </ul>
        </section>

        {/* 2. Como protegemos seu IP */}
        <section className="space-y-3">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            2. Como tratamos endereços IP e proteção anti-spam?
          </h2>
          <p>
            Para garantir que formulários não sejam abusados por bots ou spammers, utilizamos uma técnica de <strong>anonimização por HMAC com segredo do servidor</strong>:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-[var(--brand-ink)]">
            <li>O IP do visitante é transformado em um código hash criptográfico antes de qualquer gravação.</li>
            <li>Ninguém — nem os mantenedores, nem a coordenação — consegue reverter esse código para descobrir o endereço IP real.</li>
            <li><strong>Prazo de retenção de 30 dias:</strong> esse código HMAC tem validade máxima de 30 dias. Um processo automático diário (job programado no banco) apaga e nulifica permanentemente todos os registros de HMAC com mais de 30 dias.</li>
          </ul>
        </section>

        {/* 3. Para que usamos os dados */}
        <section className="space-y-3">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            3. Finalidade e base legal
          </h2>
          <p>
            Utilizamos suas informações exclusivamente para:
          </p>
          <ol className="list-decimal space-y-1.5 pl-5 text-[var(--brand-ink)]">
            <li>A coordenação do coletivo entrar em contato com você para acolhimento e convites para reuniões e saraus;</li>
            <li>Mapear a presença do coletivo nos territórios da Zona Sul;</li>
            <li>Garantir a segurança técnica das nossas ferramentas digitais.</li>
          </ol>
          <p className="text-[var(--brand-ink)]">
            <strong>Base Legal (LGPD Art. 7º, I e IX):</strong> O tratamento é baseado no seu <em>consentimento livre, inequívoco e informado</em> manifestado no checkbox do formulário, e no legítimo interesse do coletivo para proteção de segurança do site.
          </p>
          <p className="font-semibold text-[var(--brand-red)]">
            Nós NUNCA vendemos, alugamos, compartilhamos com empresas ou usamos seus dados para fins comerciais ou publicitários.
          </p>
        </section>

        {/* 4. Quem tem acesso aos dados */}
        <section className="space-y-3">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            4. Quem tem acesso às informações?
          </h2>
          <p>
            Na Fase 1 do coletivo:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-[var(--brand-ink)]">
            <li>Não há área logada nem contas de usuário públicas no site.</li>
            <li>A coordenação recebe as notificações de interesse por e-mail seguro para fazer o acolhimento.</li>
            <li>A infraestrutura técnica do banco de dados (Supabase) é restrita com políticas rígidas de segurança (Row Level Security), de modo que nenhum usuário da internet consegue listar ou ver os dados de outros participantes.</li>
          </ul>
        </section>

        {/* 5. Seus direitos como titular */}
        <section className="space-y-3 border-y-3 border-[var(--brand-ink)] bg-[var(--brand-paper-2)] p-5 sm:p-7">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            5. Seus direitos garantidos por lei (Art. 18 da LGPD)
          </h2>
          <p>
            Você é o dono dos seus dados a qualquer momento. Você pode:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-[var(--brand-ink)]">
            <li>Confirmar se temos informações sobre você;</li>
            <li>Acessar os dados que temos cadastrados;</li>
            <li>Corrigir dados incompletos ou desatualizados;</li>
            <li><strong>Pedir a exclusão total e imediata</strong> do seu contato das nossas listas;</li>
            <li>Revogar o seu consentimento quando desejar.</li>
          </ul>
        </section>

        {/* 6. Como exercer seus direitos */}
        <section className="space-y-3">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            6. Como falar com o responsável pelo tratamento de dados?
          </h2>
          <p>
            Para exercer qualquer um dos seus direitos, tirar dúvidas ou pedir a exclusão do seu registro, basta entrar em contato com a equipe de organização:
          </p>
          <div className="space-y-2 border border-[var(--brand-ink)] bg-[var(--brand-paper-2)] p-4 font-sans text-base leading-relaxed">
            <p><strong>Canal do Coletivo:</strong> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--brand-ink)] underline decoration-2 decoration-[var(--brand-red)]">WhatsApp do Coletivo Manifesto da Sul</a></p>
            <p><strong>E-mail de Privacidade:</strong> <span className="font-mono text-[var(--brand-ink)]">privacidade@manifestodasul.org.br</span> (ou pelo contato institucional)</p>
            <p>Respondemos solicitações em prazo razoável, sempre com prioridade e acolhimento comunitário.</p>
          </div>
        </section>

        {/* 7. Alterações nesta política */}
        <section className="space-y-3 pb-8">
          <h2 className="font-title text-2xl leading-tight text-[var(--brand-ink)]">
            7. Atualizações desta Política
          </h2>
          <p>
            Conforme o coletivo crescer e avançarmos para novas fases (como área de membros ou novos projetos culturais), esta política poderá ser atualizada para refletir com fidelidade as novas ferramentas. Sempre manteremos a data de revisão e histórico visíveis aqui.
          </p>
        </section>
      </article>

      {/* Botão de volta */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t-3 border-[var(--brand-ink)] pt-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 font-condensed text-base font-bold uppercase tracking-[1px] text-[var(--brand-red)] underline decoration-2 underline-offset-4"
        >
          ← Voltar para a Página Inicial
        </Link>
        <Link
          href="/faca-parte"
          className="inline-flex min-h-11 items-center border border-[var(--brand-ink)] bg-[var(--brand-red)] px-4 py-2 font-condensed text-sm font-bold uppercase tracking-[1px] text-[var(--brand-paper)]"
        >
          Ir para o Faça Parte
        </Link>
      </div>
    </div>
  )
}
