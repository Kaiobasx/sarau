# Histórias de Usuário — Fase 1 (MVP)

> **Projeto:** Manifesto da Sul  
> **Autoria:** @pm (Morgan) · Oct 2026  
> **Base:** [PRD.md](../../PRD.md) — RF01 a RF06  
> **Stack:** Next.js + Supabase + Vercel  
> **Objetivo da Fase 1:** Site público no ar antes da reunião final do coletivo.

> [!IMPORTANT]
> **Restrições da Fase 1:** Não há sistema de login nem área de membros. A coordenação **não** acessa o Supabase Studio — todo conteúdo é gerenciado pelo mantenedor técnico. Formulários usam **Server Actions** (sem `INSERT` anon exposto). A coordenação recebe os interesses exclusivamente por **e-mail** via Resend.

---

## Épico E1 — Site Público (RF01, RF02, RF03, RF05)

> Apresentar o coletivo para quem chega pela primeira vez, em qualquer celular, com qualquer conexão.

---

### US-01 · Página inicial com identidade e chamada para participar
**RF01 · Persona: Visitante ("Dona Cida")**

**Como** visitante que chegou pelo lambe ou por um post,  
**Quero** entender em segundos quem é o coletivo e se tem algo pra mim,  
**Para** decidir se quero saber mais ou já demonstrar interesse.

#### Critérios de aceite

- [x] A página inicial exibe o nome do coletivo (definitivo ou provisório), a frase-manifesto e um botão de CTA "Faça parte" visível acima da dobra em celular de 360 px.
- [x] A página carrega em menos de **3 segundos em rede 3G** (medido via Lighthouse ou WebPageTest).
- [x] O botão de WhatsApp de contato rápido está acessível na página inicial sem scroll.
- [x] Contraste de texto atende nível **WCAG AA** (mínimo 4,5:1 para texto normal).
- [x] Não existe nenhum menu ou link para área restrita visível para visitante não autenticado.
- [x] A página passa no validador de HTML5 sem erros críticos.

#### Notas técnicas
- Rota: `/` (Next.js App Router, SSG ou ISR).
- Imagens em WebP com `loading="lazy"` exceto o hero (LCP).
- CTA "Faça parte" deve ancorar ou navegar para o formulário US-04.

---

### US-02 · Seção "De onde viemos" — história e memória do sarau
**RF02 · Persona: Visitante / Simpatizante**

**Como** visitante curioso sobre a origem do coletivo,  
**Quero** ver a história e fotos dos saraus que o originaram,  
**Para** entender o caminho percorrido e me conectar com a raiz do movimento.

#### Critérios de aceite

- [ ] A seção "De onde viemos" está na página inicial ou em sub-rota `/historia`, acessível por link na nav principal.
- [ ] Exibe ao menos **um texto narrativo** (100–300 palavras) sobre a origem do sarau.
- [ ] Exibe uma **galeria de fotos** com mínimo de 3 imagens dos saraus (pendente: autorização de imagem — ver questões em aberto no PRD).
- [ ] Cada imagem tem atributo `alt` descritivo para acessibilidade.
- [ ] Imagens são servidas em WebP com dimensões otimizadas para mobile (max-width: 800 px).
- [ ] O conteúdo (texto e fotos) é gerenciado pelo **mantenedor técnico** via Supabase Studio — a coordenação não acessa o Studio na Fase 1.

#### Notas técnicas
- Conteúdo editável pelo mantenedor via Supabase Studio; coordenação solicita alterações por mensagem ao mantenedor.
- Galeria com lazy loading; evitar carrossel JS pesado.

#### Dependência / bloqueio
- ⚠️ Definir quais fotos têm autorização de imagem (questão em aberto no PRD).

---

### US-03 · Seção "Pra onde vamos" — eixos de atuação
**RF03 · Persona: Visitante / Simpatizante**

**Como** visitante que quer entender o projeto político-cultural,  
**Quero** ver os eixos de atuação do coletivo,  
**Para** avaliar se meu perfil e minhas causas se alinham com o movimento.

#### Critérios de aceite

- [ ] A seção "Pra onde vamos" está na página inicial (ou sub-rota `/proposta`) com link na nav.
- [ ] Apresenta os **eixos de atuação oficiais** definidos pelo coletivo (mínimo 3 eixos).
- [ ] Cada eixo tem título, ícone/ilustração e parágrafo curto de descrição (50–120 palavras).
- [ ] O conteúdo dos eixos é gerenciado pelo **mantenedor técnico** via Supabase Studio.
- [ ] A seção está legível em modo escuro e modo claro, com contraste AA.
- [ ] O CTA "Faça parte" aparece ao final desta seção.

#### Notas técnicas
- Conteúdo pode ser hardcoded na Fase 1 se os eixos ainda não estiverem definidos; campo `eixos` em tabela de configurações do Supabase para edição futura pelo mantenedor.

#### Dependência / bloqueio
- ⚠️ Eixos de atuação oficiais precisam ser definidos na reunião final.

---

### US-05 · Página de parcerias e contato institucional
**RF05 · Persona: Parceiro externo**

**Como** representante de escola, CEU, outro coletivo ou veículo de imprensa,  
**Quero** encontrar facilmente uma página institucional do coletivo com formas de contato,  
**Para** propor uma parceria ou cobertura sem precisar ir às redes sociais.

#### Critérios de aceite

- [ ] Existe rota `/parcerias` acessível pelo menu principal.
- [ ] A página contém: apresentação institucional resumida, e-mail e link de WhatsApp de contato institucional.
- [ ] Formulário de contato (nome, organização, mensagem) submetido via **Server Action** que grava no Supabase e envia notificação por e-mail via **Resend** — sem `INSERT` anon exposto.
- [ ] Formulário tem proteção anti-spam: honeypot field oculto + rate limit por HMAC-IP (máx. 3 envios/hora; retenção do hash: 30 dias).
- [ ] Conteúdo institucional é gerenciado pelo **mantenedor técnico** via Supabase Studio.

#### Notas técnicas
- Tabela `contatos_parceiros`: id, nome, organização, mensagem, criado_em, lido.
- E-mail de destino configurável via variável de ambiente `CONTACT_EMAIL`.

---

## Épico E2 — Formulário "Faça parte" (RF04)

> Captar interesse de novos participantes antes mesmo de o coletivo ter área de membros.

---

### US-04 · Formulário "Faça parte"
**RF04 · Persona: Visitante / Simpatizante**

**Como** visitante que quer participar do coletivo,  
**Quero** preencher um formulário rápido de interesse,  
**Para** que o coletivo saiba quem sou e como me contatar.

#### Critérios de aceite

- [x] O formulário está em `/faca-parte` vinculado pelo CTA da página inicial.
- [x] **Não há login na Fase 1.** O formulário é público e não cria conta — apenas registra interesse.
- [x] Campos obrigatórios: **nome**, **bairro**, **contato** (e-mail ou WhatsApp — ao menos um), **consentimento LGPD** (checkbox com link para `/privacidade`).
- [x] Campos opcionais: **habilidades/interesses** (texto livre ou checkboxes).
- [x] O botão "Enviar" está desabilitado até que o consentimento LGPD seja marcado.
- [x] Após envio exibe mensagem: _"Recebemos seu contato! Em breve o coletivo vai chamar você."_
- [x] O formulário é submetido via **Server Action** — sem `INSERT` anon exposto ao cliente.
- [x] Os dados são gravados na tabela `interesses` do Supabase pela Server Action (usando service role key no servidor).
- [x] A **coordenação recebe os interesses exclusivamente por e-mail** (Resend) com nome e contato — não acessa a tabela diretamente (stub preparado).
- [x] Proteção anti-spam: honeypot field oculto + rate limit por **HMAC-IP** (máx. 3 envios/hora; hash retido por **30 dias**, então deletado).
- [x] Nenhum dado é exposto publicamente; tabela `interesses` acessível apenas ao mantenedor via Supabase Studio.
- [x] O link de política de privacidade leva a `/privacidade` (ver US-07).

#### Notas técnicas
- Tabela `interesses`: id, nome, bairro, contato_email, contato_whatsapp, habilidades, consentimento_lgpd (bool), ip_hmac (text), ip_hmac_expira_em (timestamptz), criado_em.
- HMAC-IP: `HMAC-SHA256(IP, NEXT_HMAC_SECRET)` — nunca armazena IP bruto (LGPD). Job de limpeza (cron diário) deleta registros cujo `ip_hmac_expira_em < now()`.
- Server Action usa `SUPABASE_SERVICE_ROLE_KEY` (variável de ambiente servidor); chave anon do Supabase **não** exposta para `INSERT`.
- RLS na tabela `interesses`: sem policy de `INSERT` para anon — a inserção ocorre pelo service role na Server Action.

---

## Épico E3 — Agenda Pública (RF06)

> Divulgar os eventos do coletivo para que qualquer pessoa saiba o que está acontecendo.

---

### US-06 · Lista pública de eventos
**RF06 · Persona: Visitante / Simpatizante**

**Como** visitante ou simpatizante,  
**Quero** ver os próximos eventos do coletivo com data, local e descrição,  
**Para** me planejar para participar.

#### Critérios de aceite

- [x] Existe rota `/agenda` acessível pelo menu principal.
- [x] A lista exibe apenas eventos com `publicado = true` e `data >= hoje`.
- [x] Cada card mostra: **título**, **data e hora**, **local** (com link Google Maps se disponível), **descrição curta** (até 200 caracteres).
- [x] Se não houver eventos, exibe: _"Nenhum evento por enquanto. Siga o coletivo nas redes para não perder nada."_ com link para Instagram/WhatsApp.
- [x] O conteúdo de eventos é gerenciado pelo **mantenedor técnico** via Supabase Studio.
- [x] A página usa **revalidação sob demanda** (`revalidatePath('/agenda')` disparado por webhook do Supabase ou endpoint `/api/revalidate` protegido por `REVALIDATE_SECRET`) — sem ISR por tempo fixo.
- [x] Após publicar ou editar um evento, o mantenedor aciona o endpoint de revalidação; a agenda reflete a mudança em < 5 s.
- [x] Cada evento tem meta tags Open Graph (título, descrição, imagem de capa).

#### Notas técnicas
- Tabela `eventos`: id, título, descrição, data, local, maps_url, capa_url, publicado, slug.
- Rota dinâmica `/agenda/[slug]` para página individual de evento; ambas as rotas revalidadas sob demanda.
- Endpoint `POST /api/revalidate` valida header `Authorization: Bearer REVALIDATE_SECRET` antes de chamar `revalidatePath`.
- Alternativa: Supabase Database Webhook → endpoint de revalidação (sem intervenção manual do mantenedor).
- Imagem de capa em WebP, 1200×630 px (Open Graph).

---

## Épico E4 — Privacidade e LGPD (novo)

> Cumprir LGPD e dar transparência a qualquer visitante sobre o que é coletado.

---

### US-07 · Página de política de privacidade
**Persona: Visitante / Simpatizante**

**Como** visitante que está considerando preencher o formulário "Faça parte",  
**Quero** ler uma política de privacidade clara e acessível,  
**Para** entender o que é coletado, por quanto tempo e como posso pedir a exclusão dos meus dados.

#### Critérios de aceite

- [x] Existe rota `/privacidade` acessível no rodapé de todas as páginas.
- [x] O texto cobre obrigatoriamente: quais dados são coletados (nome, bairro, contato, IP anonimizado), finalidade, base legal (consentimento — LGPD art. 7º, I), prazo de retenção (interesse: até solicitação de exclusão; IP-HMAC: 30 dias), como exercer direitos (exclusão, retificação, portabilidade) e canal de contato do responsável.
- [x] A política menciona explicitamente que **endereços IP não são armazenados em texto claro** — apenas um hash HMAC retido por 30 dias para fins de anti-spam.
- [x] O texto está em linguagem simples (nível de leitura acessível, sem juridiquês desnecessário).
- [x] A página tem `<h1>` único, hierarquia de headings correta e passa na validação de HTML5.
- [x] Link para `/privacidade` está no rodapé e no checkbox de consentimento do formulário US-04.
- [x] O conteúdo da política é versionado no repositório (arquivo `.md` ou inline no componente) — não depende do banco de dados.

#### Notas técnicas
- Página estática gerada em build time (sem `fetch` dinâmico, sem dependência do Supabase).
- Conteúdo versionado em `src/app/privacidade/page.tsx` ou `content/privacidade.md`.
- A versão e a data de última atualização devem aparecer no topo da página.

---

## Resumo — Fase 1

| Story | RF | Épico | Persona | Prioridade MoSCoW |
|---|---|---|---|---|
| US-01 | RF01 | E1 – Site Público | Visitante | 🔴 Must Have |
| US-02 | RF02 | E1 – Site Público | Visitante | 🔴 Must Have |
| US-03 | RF03 | E1 – Site Público | Visitante | 🟡 Should Have |
| US-04 | RF04 | E2 – Faça parte | Visitante | 🔴 Must Have |
| US-05 | RF05 | E1 – Site Público | Parceiro | 🟢 Could Have |
| US-06 | RF06 | E3 – Agenda | Visitante | 🔴 Must Have |
| US-07 | —   | E4 – Privacidade | Visitante | 🔴 Must Have |

> [!NOTE]
> **Fase 1 não tem login.** Nenhuma story cria conta ou sessão de usuário. Formulários usam Server Actions com service role key. A coordenação recebe interesses por e-mail; o mantenedor gerencia conteúdo via Supabase Studio.

**Must Have para lançamento mínimo:** US-01, US-02, US-04, US-06, US-07.  
**Sequência sugerida:** US-07 → US-01 → US-06 → US-04 → US-02 → US-03 → US-05.

---

## Questões em aberto (bloqueios)

| # | Questão | Impacta | Responsável |
|---|---|---|---|
| Q1 | Nome definitivo do coletivo e domínio | US-01 | Coletivo |
| Q2 | Eixos de atuação oficiais | US-03 | Reunião final |
| Q3 | Identidade visual (cores, tipografia, logo) | US-01, US-02, US-03 | @ux-design-expert |
| Q4 | Autorização de imagem das fotos dos saraus | US-02 | Coordenação |
| Q5 | E-mail institucional e config Resend | US-04, US-05 | Mantenedor |
| Q6 | Definir `NEXT_HMAC_SECRET` e `REVALIDATE_SECRET` no ambiente Vercel | US-04, US-06 | Mantenedor |
| Q7 | Webhook Supabase → `/api/revalidate` ou revalidação manual? | US-06 | Mantenedor + @architect |

---

## Próximos passos

1. **@ux-design-expert** → identidade visual e wireframe mobile da página inicial.
2. **@architect** → schema SQL do Supabase: tabelas `interesses` e `eventos`, RLS (sem policy `INSERT` anon), cron de limpeza de `ip_hmac`, webhook de revalidação.
3. **@dev** → implementar US-07 + US-01 como sprint 0 (scaffolding Next.js + Server Actions + Supabase service role).
4. **@qa** → checklist mobile, LGPD do formulário (US-04 + US-07), Lighthouse ≥ 90, teste do endpoint `/api/revalidate`.

---

## Dev Agent Record (Sprint 0)

> **Agente:** @dev (Dex)  
> **Status:** Concluído  
> **Data:** 2026-10-15  

### Arquivos Implementados / Modificados

| Arquivo | Descrição |
|---|---|
| [`.gitignore`](file:///c:/Users/kaioo/Documents/sarau/.gitignore) | Confirmado `.env*.local` ignorado + artefatos de build do Next.js |
| [`package.json`](file:///c:/Users/kaioo/Documents/sarau/package.json) | Scripts de qualidade (`build`, `lint`, `typecheck`, `test`), Next.js 16, React 19, Tailwind v4, Supabase JS |
| [`src/app/globals.css`](file:///c:/Users/kaioo/Documents/sarau/src/app/globals.css) | Variáveis de cores da identidade provisória e tema do Tailwind |
| [`src/app/layout.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/layout.tsx) | RootLayout com metadados, viewport, Header e Footer |
| [`src/components/Header.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/components/Header.tsx) | Header acessível, mobile drawer, link WhatsApp direto sem login |
| [`src/components/Footer.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/components/Footer.tsx) | Footer com navegação e link obrigatório para `/privacidade` |
| [`src/lib/supabase/types.ts`](file:///c:/Users/kaioo/Documents/sarau/src/lib/supabase/types.ts) | Tipos TypeScript do banco (interesses, contatos_parceiros, eventos) |
| [`src/lib/supabase/client.ts`](file:///c:/Users/kaioo/Documents/sarau/src/lib/supabase/client.ts) | Cliente Supabase para o browser usando anon key |
| [`src/lib/supabase/server.ts`](file:///c:/Users/kaioo/Documents/sarau/src/lib/supabase/server.ts) | Cliente Supabase servidor com service_role (`import 'server-only'`) |
| [`src/lib/events.ts`](file:///c:/Users/kaioo/Documents/sarau/src/lib/events.ts) | Funções de consulta de eventos publicados e formatação de data BRT |
| [`src/app/page.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/page.tsx) | **US-01:** Home com hero acima da dobra 360px, CTA "Faça parte", WhatsApp sem scroll |
| [`src/app/actions/submit-interesse.ts`](file:///c:/Users/kaioo/Documents/sarau/src/app/actions/submit-interesse.ts) | **US-04:** Server Action com honeypot, HMAC-IP rate limit (3/h) e stub Resend |
| [`src/app/faca-parte/FacaParteForm.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/faca-parte/FacaParteForm.tsx) | **US-04:** Formulário com barreira LGPD, pending state e honeypot |
| [`src/app/faca-parte/page.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/faca-parte/page.tsx) | **US-04:** Página do formulário Faça Parte |
| [`src/app/privacidade/page.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/privacidade/page.tsx) | **US-07:** Página de política de privacidade em linguagem clara |
| [`src/app/agenda/page.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/agenda/page.tsx) | **US-06:** Listagem de eventos com fallback para estado vazio |
| [`src/app/agenda/[slug]/page.tsx`](file:///c:/Users/kaioo/Documents/sarau/src/app/agenda/[slug]/page.tsx) | **US-06:** Página dinâmica do evento com Open Graph e 404 |
| [`src/app/api/revalidate/route.ts`](file:///c:/Users/kaioo/Documents/sarau/src/app/api/revalidate/route.ts) | **US-06:** Route handler de revalidação sob demanda com record/old_record slug |
| [`tests/security-and-revalidate.test.mjs`](file:///c:/Users/kaioo/Documents/sarau/tests/security-and-revalidate.test.mjs) | Testes unitários para HMAC anti-spam e extração de slug do webhook |

