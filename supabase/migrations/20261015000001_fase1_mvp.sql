-- =============================================================================
-- Migration: 20261015000001_fase1_mvp.sql
-- Projeto:   Manifesto da Sul
-- Fase:      1 (MVP) — RF01–RF06 + US-07
-- Gerado:    2026-10-15 · @architect (Aria)
-- Revisado:  2026-10-15 · revisão 2
-- Fonte:     docs/stories/fase-1-mvp.md
--
-- Tabelas:
--   • interesses         (US-04 / RF04) — formulário "Faça parte"
--   • contatos_parceiros (US-05 / RF05) — formulário de parcerias
--   • eventos            (US-06 / RF06) — agenda pública
--
-- Políticas RLS:
--   • anon e authenticated NÃO têm INSERT em nenhuma tabela (formulários via Server Action)
--   • anon e authenticated podem SELECT apenas em eventos WHERE publicado = true
--   • interesses e contatos_parceiros visíveis apenas ao service_role (mantenedor)
--
-- Funções:
--   • set_atualizado_em()       — trigger de atualizado_em em eventos
--   • cleanup_ip_hmac_vencidos() — nullifica ip_hmac após 30 dias (pg_cron)
--   Ambas: set search_path = ''; EXECUTE revogado de public/anon/authenticated.
--
-- Jobs (pg_cron):
--   • cleanup_ip_hmac_diario — 06:00 UTC (03:00 BRT), nulifica ip_hmac vencido
--
-- Webhook (configuração fora do SQL — ver comentário na seção 6):
--   • Database Webhook em eventos → POST /api/revalidate
--   • Payload contém record (INSERT/UPDATE) e old_record (UPDATE/DELETE) com slug
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 0. Extensões necessárias
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "pg_cron";    -- job de limpeza de ip_hmac

-- ---------------------------------------------------------------------------
-- 1. Tabela: interesses
--    Registra quem preencheu o formulário "Faça parte" (RF04 / US-04).
--    INSERT ocorre apenas via Server Action com service_role key.
--    ip_hmac: HMAC-SHA256(IP, HMAC_SECRET). Nunca armazena IP bruto (LGPD).
--    ip_hmac_expira_em: default now() + 30 dias. Job pg_cron nulifica ao vencer.
-- ---------------------------------------------------------------------------
create table if not exists public.interesses (
  id                  uuid         primary key default gen_random_uuid(),
  nome                text         not null check (char_length(nome) between 2 and 120),
  bairro              text         not null check (char_length(bairro) between 2 and 100),
  contato_email       text         check (contato_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  contato_whatsapp    text         check (contato_whatsapp ~ '^\+?[0-9\s\-\(\)]{7,20}$'),
  habilidades         text,
  consentimento_lgpd  boolean      not null default false,
  -- HMAC-SHA256(IP, HMAC_SECRET) — nunca armazena IP bruto (LGPD)
  ip_hmac             text,
  ip_hmac_expira_em   timestamptz  default now() + interval '30 days',
  criado_em           timestamptz  not null default now(),
  -- Garante que ao menos um contato foi fornecido
  constraint contato_obrigatorio check (
    contato_email is not null or contato_whatsapp is not null
  ),
  -- Garante consentimento LGPD
  constraint lgpd_obrigatorio check (consentimento_lgpd = true)
);

comment on table  public.interesses                is 'Formulário "Faça parte" — RF04 / US-04. INSERT apenas via Server Action (service_role).';
comment on column public.interesses.ip_hmac        is 'HMAC-SHA256(IP, HMAC_SECRET). Nunca armazena IP bruto. Usado para rate limiting.';
comment on column public.interesses.ip_hmac_expira_em is 'Expiração do ip_hmac: default now()+30 days. Job pg_cron nulifica ao vencer (LGPD).';

-- Rate limiting na Server Action: busca por ip_hmac dentro da janela de 1h
create index if not exists idx_interesses_ip_hmac_criado
  on public.interesses (ip_hmac, criado_em);

-- Listagem cronológica no Supabase Studio
create index if not exists idx_interesses_criado_em
  on public.interesses (criado_em desc);

-- Job de limpeza: localiza registros com ip_hmac vencido
create index if not exists idx_interesses_ip_hmac_expira
  on public.interesses (ip_hmac_expira_em)
  where ip_hmac is not null;

-- ---------------------------------------------------------------------------
-- 2. Tabela: contatos_parceiros
--    Formulário de contato institucional — parcerias, imprensa (RF05 / US-05).
--    Mesma estratégia: INSERT via Server Action, sem anon INSERT.
-- ---------------------------------------------------------------------------
create table if not exists public.contatos_parceiros (
  id                uuid         primary key default gen_random_uuid(),
  nome              text         not null check (char_length(nome) between 2 and 120),
  organizacao       text         check (char_length(organizacao) <= 200),
  mensagem          text         not null check (char_length(mensagem) between 10 and 2000),
  ip_hmac           text,
  ip_hmac_expira_em timestamptz  default now() + interval '30 days',
  lido              boolean      not null default false,
  criado_em         timestamptz  not null default now()
);

comment on table  public.contatos_parceiros           is 'Formulário de parcerias — RF05 / US-05. INSERT apenas via Server Action (service_role).';
comment on column public.contatos_parceiros.lido      is 'Marcado como lido pela coordenação após revisão no Supabase Studio.';
comment on column public.contatos_parceiros.ip_hmac   is 'HMAC-SHA256(IP, HMAC_SECRET). Nunca armazena IP bruto. Usado para rate limiting.';
comment on column public.contatos_parceiros.ip_hmac_expira_em is 'Expiração do ip_hmac: default now()+30 days. Job pg_cron nulifica ao vencer (LGPD).';

create index if not exists idx_contatos_lido_criado
  on public.contatos_parceiros (lido, criado_em desc);

-- Rate limiting
create index if not exists idx_contatos_ip_hmac_criado
  on public.contatos_parceiros (ip_hmac, criado_em);

-- Job de limpeza
create index if not exists idx_contatos_ip_hmac_expira
  on public.contatos_parceiros (ip_hmac_expira_em)
  where ip_hmac is not null;

-- ---------------------------------------------------------------------------
-- 3. Tabela: eventos
--    Agenda pública — RF06 / US-06.
--    anon e authenticated podem SELECT apenas em eventos publicados e recentes.
--    INSERT/UPDATE/DELETE exclusivo do mantenedor via Supabase Studio
--    (service_role bypassa RLS por definição).
-- ---------------------------------------------------------------------------
create table if not exists public.eventos (
  id            uuid         primary key default gen_random_uuid(),
  slug          text         not null unique check (slug ~ '^[a-z0-9\-]+$'),
  titulo        text         not null check (char_length(titulo) between 3 and 200),
  descricao     text         not null check (char_length(descricao) between 10 and 5000),
  data          timestamptz  not null,
  local         text         not null check (char_length(local) between 2 and 300),
  maps_url      text         check (maps_url ~ '^https?://'),
  capa_url      text         check (capa_url ~ '^https?://'),
  publicado     boolean      not null default false,
  criado_em     timestamptz  not null default now(),
  atualizado_em timestamptz  not null default now()
);

comment on table  public.eventos              is 'Agenda pública de eventos — RF06 / US-06. anon/authenticated leem apenas publicado=true e data recente.';
comment on column public.eventos.slug         is 'Slug URL-safe para rota /agenda/[slug]. Gerado pelo mantenedor (ex.: sarau-outubro-2026).';
comment on column public.eventos.publicado    is 'Controla visibilidade pública. anon e authenticated veem apenas publicado=true.';
comment on column public.eventos.atualizado_em is 'Atualizado automaticamente pelo trigger trg_eventos_atualizado_em.';

-- Query pública: filtra publicado=true e data futura
create index if not exists idx_eventos_publicos
  on public.eventos (publicado, data)
  where publicado = true;

-- Lookup por slug (rota /agenda/[slug])
create index if not exists idx_eventos_slug
  on public.eventos (slug);

-- ---------------------------------------------------------------------------
-- 4. Funções
--    Ambas usam set search_path = '' para evitar search_path injection.
--    EXECUTE revogado de public, anon e authenticated (segurança mínima).
-- ---------------------------------------------------------------------------

-- 4.1 Trigger: mantém atualizado_em sincronizado em eventos
create or replace function public.set_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

revoke execute on function public.set_atualizado_em() from public;
revoke execute on function public.set_atualizado_em() from anon;
revoke execute on function public.set_atualizado_em() from authenticated;

create trigger trg_eventos_atualizado_em
  before update on public.eventos
  for each row execute function public.set_atualizado_em();

-- 4.2 Limpeza de ip_hmac vencidos (chamada pelo pg_cron)
--    Sem security definer: roda com os privilégios do usuário que executa o job.
--    pg_cron roda como superuser no Supabase — suficiente para UPDATE nas tabelas.
create or replace function public.cleanup_ip_hmac_vencidos()
returns void
language plpgsql
set search_path = ''
as $$
begin
  -- Nulifica ip_hmac vencido em interesses (preserva o registro do interesse)
  update public.interesses
    set ip_hmac = null,
        ip_hmac_expira_em = null
  where ip_hmac_expira_em is not null
    and ip_hmac_expira_em < now();

  -- Nulifica ip_hmac vencido em contatos_parceiros
  update public.contatos_parceiros
    set ip_hmac = null,
        ip_hmac_expira_em = null
  where ip_hmac_expira_em is not null
    and ip_hmac_expira_em < now();
end;
$$;

comment on function public.cleanup_ip_hmac_vencidos()
  is 'Nulifica ip_hmac e ip_hmac_expira_em após 30 dias (LGPD). Sem security definer; roda via pg_cron como superuser. search_path fixo em vazio.';

revoke execute on function public.cleanup_ip_hmac_vencidos() from public;
revoke execute on function public.cleanup_ip_hmac_vencidos() from anon;
revoke execute on function public.cleanup_ip_hmac_vencidos() from authenticated;

-- ---------------------------------------------------------------------------
-- 5. Row Level Security (RLS)
-- ---------------------------------------------------------------------------

-- 5.1 interesses — sem acesso de leitura ou escrita para qualquer role pública
alter table public.interesses enable row level security;
-- Nenhuma policy: anon e authenticated têm acesso zero.
-- service_role bypassa RLS; a Server Action usa service_role key.
-- Fase 2+: adicionar policy para papel 'coordenacao' em auth.jwt() ->> 'user_role'.

-- 5.2 contatos_parceiros — idem
alter table public.contatos_parceiros enable row level security;

-- 5.3 eventos — anon e authenticated podem SELECT somente eventos publicados e recentes
alter table public.eventos enable row level security;

create policy "public_select_eventos_publicados"
  on public.eventos
  for select
  to anon, authenticated
  using (
    publicado = true
    and data >= (now() - interval '1 hour')
    -- Margem de 1h para cobrir eventos cujo horário iniciou "agora"
  );

comment on policy "public_select_eventos_publicados" on public.eventos
  is 'anon e authenticated leem apenas eventos publicados e não encerrados há mais de 1 hora. INSERT/UPDATE/DELETE: apenas service_role.';

-- service_role bypassa RLS — mantenedor opera via Supabase Studio sem restrições.

-- ---------------------------------------------------------------------------
-- 6. Job pg_cron: limpeza diária de ip_hmac
--    ATENÇÃO: pg_cron deve estar habilitado no Dashboard antes de rodar esta migration
--    (Database → Extensions → pg_cron → Enable).
-- ---------------------------------------------------------------------------
select cron.schedule(
  'cleanup_ip_hmac_diario',
  '0 6 * * *',          -- 06:00 UTC = 03:00 BRT
  $$select public.cleanup_ip_hmac_vencidos();$$
);

-- ---------------------------------------------------------------------------
-- 7. Webhook de revalidação — instrução de configuração (fora do SQL)
--
--    O Supabase Database Webhook envia um payload JSON com os campos:
--      type:       "INSERT" | "UPDATE" | "DELETE"
--      table:      "eventos"
--      record:     objeto da linha após a operação (INSERT e UPDATE)
--      old_record: objeto da linha antes da operação (UPDATE e DELETE)
--
--    A rota /api/revalidate extrai o slug assim:
--      const slug = body.record?.slug ?? body.old_record?.slug
--    E revalida:
--      revalidatePath('/agenda')
--      revalidatePath(`/agenda/${slug}`, 'page')
--
--    Configuração no Dashboard → Database → Webhooks → Create a new hook:
--      Name:    revalidate_agenda
--      Table:   public.eventos
--      Events:  INSERT, UPDATE, DELETE
--      Method:  POST
--      URL:     https://<dominio>/api/revalidate
--      Headers: Authorization: Bearer <REVALIDATE_SECRET>
--
--    Via supabase CLI (v1.200+):
--      supabase webhooks create \
--        --name revalidate_agenda \
--        --table eventos \
--        --events insert,update,delete \
--        --url https://<dominio>/api/revalidate \
--        --header "Authorization=Bearer $REVALIDATE_SECRET"
-- ---------------------------------------------------------------------------

-- =============================================================================
-- FIM DA MIGRATION
-- Seed de desenvolvimento: supabase/seed.sql
-- =============================================================================
