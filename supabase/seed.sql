-- =============================================================================
-- Seed: supabase/seed.sql
-- Projeto:  Manifesto da Sul
-- Uso:      Desenvolvimento local. NÃO rodar em produção.
--           supabase db reset  →  aplica migrations + este seed automaticamente.
-- =============================================================================

-- Evento de exemplo (publicado=false — mantenedor publica no Studio quando pronto)
insert into public.eventos (slug, titulo, descricao, data, local, publicado)
values (
  'sarau-inauguracao-2026',
  'Sarau de Inauguração — Manifesto da Sul',
  'Primeiro evento da plataforma. Poesia, música e cultura periférica da Zona Sul de São Paulo.',
  now() + interval '15 days',
  'CEU Campo Limpo — Rua Honduras, 251, Campo Limpo, SP',
  false
)
on conflict (slug) do nothing;
