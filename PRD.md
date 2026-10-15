# PRD — Manifesto da Sul

Oct 14, 2026 · @Kaio

## Visão geral

O Manifesto da Sul (nome provisório) é a plataforma de um coletivo que nasceu como sarau e está virando um movimento político-cultural na Zona Sul de São Paulo. A plataforma precisa contar essa virada, abrir o coletivo para gente nova e dar ferramentas de organização interna.

**Contexto.** O coletivo está em reuniões para decidir o novo caminho. A maioria defende ir para a luta política, com a cultura como uma das dimensões da disputa. A proposta que será levada à reunião final é abrir o coletivo para novos integrantes.

**Problema.** Hoje o coletivo não tem presença própria além das redes sociais. Quem chega não sabe como participar, a memória dos saraus se perde e a organização interna acontece espalhada em grupos de mensagem.

**Objetivo.** Ter um site público que apresente o coletivo e capte interessados, evoluindo para uma plataforma com área de integrantes, agenda, acervo e ferramentas de decisão coletiva.

## Objetivos e métricas

O sucesso do MVP é medido por quantas pessoas novas demonstram interesse em participar. As metas numéricas abaixo são sugestões a validar com o coletivo.

| Objetivo | Métrica | Meta inicial sugerida |
| --- | --- | --- |
| Apoiar a decisão de abrir o coletivo | Site público no ar antes da reunião final | Publicado |
| Captar gente nova | Inscrições no formulário "Faça parte" | 20 nos primeiros 30 dias |
| Levar público aos eventos | Inscrições por evento divulgado | 10 por evento |
| Valorizar a raiz cultural | Propostas de artistas recebidas | 5 por mês |
| Organizar o coletivo por dentro | Integrantes ativos na área interna | 70% dos integrantes |
| Decidir de forma coletiva | Votações abertas com participação | 50% dos integrantes votando |

## Personas

São sete personas: cinco usam a plataforma, uma é externa e uma é de bastidor. Os nomes são ilustrativos.

| Persona | Quem é | O que quer | O que precisa | Login |
| --- | --- | --- | --- | --- |
| Visitante ("Dona Cida") | Moradora do bairro que viu um lambe ou post | Entender rápido quem é o coletivo e se é pra ela | Linguagem simples, mobile first, página leve, botão de WhatsApp | Não |
| Simpatizante ("Lucas, 19") | Frequenta os saraus, ainda sem compromisso com reuniões | Receber agenda, se inscrever em oficinas, ver fotos e poesias | Cadastro leve, avisos de eventos | Sim, leve |
| Artista/Proponente ("Mari, poeta e MC") | Quer se apresentar ou propor oficina | Inscrever trabalho, divulgar portfólio | Formulário de proposta, perfil público de artista | Sim |
| Integrante ("membro ativo") | Vai às reuniões e assume tarefas | Atas, tarefas, votações, formação, contato com o grupo | Área interna organizada por GTs | Sim |
| Coordenação/Articulação | Organiza agenda, puxa pautas, recebe gente nova | Criar eventos, aprovar entradas, ver quem está ativo | Painel com inscritos, eventos e presença | Sim |
| Parceiro externo | Escola, outro coletivo, CEU, imprensa | Entender o trabalho e propor parceria | Página de parcerias, material de imprensa, contato | Não |
| Mantenedor técnico | Quem cuida do sistema | Backups, permissões, segurança | Acesso administrativo restrito | Sim |

**Artista** pode ser um selo no perfil do simpatizante ou do integrante, sem precisar de papel separado. **Coordenação** deve ser papel rotativo, não cargo fixo, para respeitar a horizontalidade do coletivo.

## Jornadas e funil de participação

Toda pessoa nova entra como visitante e pode subir até a coordenação; esse caminho é o argumento prático para abrir o coletivo.

&#91;embedded content: jornada de participação · 4 etapas e 1 desvio cultural\]

O simpatizante é a etapa mais importante: é onde a maioria chega e de onde saem os futuros integrantes. O parceiro externo fica fora do funil e fala direto com a coordenação pelo contato institucional.

## Papéis e permissões

O sistema trabalha com quatro papéis de usuário mais um técnico. Cada papel herda o que o anterior pode fazer.

| Ação | Visitante | Simpatizante | Integrante | Coordenação | Mantenedor |
| --- | --- | --- | --- | --- | --- |
| Ver site, manifesto, agenda e acervo | Sim | Sim | Sim | Sim | Sim |
| Enviar "Faça parte" e contato | Sim | Sim | Sim | Sim | Sim |
| Inscrever-se em eventos | Não | Sim | Sim | Sim | Sim |
| Propor apresentação (selo Artista) | Não | Sim | Sim | Sim | Sim |
| Ver atas, tarefas e materiais internos | Não | Não | Sim | Sim | Sim |
| Votar em decisões | Não | Não | Sim | Sim | Sim |
| Criar eventos e publicar conteúdo | Não | Não | Não | Sim | Sim |
| Aprovar novos integrantes | Não | Não | Não | Sim | Não |
| Abrir votações | Não | Não | Não | Sim | Não |
| Gerenciar papéis, backups e segurança | Não | Não | Não | Não | Sim |

O mantenedor técnico não aprova pessoas nem abre votações: decisões políticas ficam com a coordenação, não com quem cuida do código.

## Requisitos funcionais

Os requisitos estão agrupados em seis módulos. A coluna Fase indica quando cada um entra (detalhes no roadmap).

| ID | Módulo | Requisito | Persona | Fase |
| --- | --- | --- | --- | --- |
| RF01 | Site público | Página inicial com nome, frase-manifesto e chamada para participar | Visitante | 1 |
| RF02 | Site público | Seção "De onde viemos" com história e fotos do sarau | Visitante | 1 |
| RF03 | Site público | Seção "Pra onde vamos" com os eixos de atuação | Visitante | 1 |
| RF04 | Site público | Formulário "Faça parte": nome, bairro, contato, habilidades, consentimento LGPD | Visitante | 1 |
| RF05 | Site público | Página de parcerias e contato institucional | Parceiro | 1 |
| RF06 | Agenda | Lista pública de eventos com data, local e descrição | Visitante | 1 |
| RF07 | Agenda | Inscrição em evento com confirmação por e-mail ou WhatsApp | Simpatizante | 2 |
| RF08 | Contas | Cadastro e login (e-mail com link mágico ou Google) | Simpatizante | 2 |
| RF09 | Contas | Perfil com bairro, habilidades e selo Artista opcional | Simpatizante | 2 |
| RF10 | Cultura | Formulário de proposta de apresentação ou oficina | Artista | 2 |
| RF11 | Cultura | Acervo de poesias, vídeos e áudios dos saraus | Visitante | 2 |
| RF12 | Área interna | Pedido para virar integrante, com aprovação da coordenação | Simpatizante | 3 |
| RF13 | Área interna | Atas de reunião com busca | Integrante | 3 |
| RF14 | Área interna | Tarefas por GT com responsável e status | Integrante | 3 |
| RF15 | Área interna | Votações com prazo, opções e resultado visível | Integrante | 3 |
| RF16 | Área interna | Biblioteca de formação (textos, vídeos, trilhas) | Integrante | 3 |
| RF17 | Coordenação | Painel com inscritos, eventos, presença e pedidos pendentes | Coordenação | 3 |
| RF18 | Território | Mapa com equipamentos culturais e demandas do bairro | Integrante | 4 |
| RF19 | Território | Canal para moradores relatarem demandas | Visitante | 4 |
| RF20 | Sustentação | Mapeamento de editais de cultura com prazos | Coordenação | 4 |

## Requisitos não funcionais

A prioridade é funcionar bem no celular, com internet ruim, sem expor dados de quem participa.

- **Mobile first:** layout pensado para telas de 360 px; navegação com o polegar.
- **Leveza:** página inicial carregando em menos de 3 s em 3G; imagens otimizadas (WebP, lazy loading).
- **Acessibilidade:** contraste AA, textos alternativos nas imagens, linguagem simples.
- **Privacidade (LGPD):** consentimento explícito nos formulários; dados de membros nunca públicos; política de privacidade curta e clara; opção de pedir exclusão dos dados.
- **Segurança:** controle de acesso por papel no banco (RLS); login sem senha (link mágico) para reduzir vazamentos; proteção contra spam nos formulários.
- **Operação barata:** hospedagem em plano gratuito ou de baixo custo; nada que exija servidor dedicado.
- **Manutenção coletiva:** conteúdo (agenda, textos, acervo) editável pela coordenação sem mexer em código.

## Escopo do MVP e roadmap

O MVP é a Fase 1 (RF01 a RF06): site público com manifesto, agenda e "Faça parte" funcionando, pronto para mostrar na reunião final.

&#91;embedded content: roadmap · 4 fases e 3 portões de decisão\]

Cada fase só começa quando o portão anterior acontece; se a reunião não aprovar a abertura, o site público continua útil como vitrine do coletivo. Fora do MVP: app nativo, pagamentos e chat próprio (o WhatsApp já cumpre esse papel).

## Stack técnica e modelo de dados

A stack sugerida é Next.js + Supabase na Vercel: rápida de construir, barata de manter e com controle de acesso por papel nativo.

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Front-end | Next.js (App Router) + TypeScript + Tailwind | SSR para leveza e SEO; componentes reutilizáveis |
| Back-end e banco | Supabase (Postgres, Auth, Storage) | Auth pronto, RLS por papel, storage para fotos e áudios |
| Hospedagem | Vercel | Deploy automático pelo GitHub, plano gratuito |
| Conteúdo | Tabelas no Supabase com painel da coordenação | Edição sem código |
| Notificações | E-mail (Resend) e link de WhatsApp | Baixo custo, alcance real no bairro |

Entidades principais:

- **profiles:** id, nome, bairro, contato, habilidades, papel (visitante, simpatizante, integrante, coordenacao, mantenedor), selo\_artista, consentimento\_lgpd, criado\_em
- **interesses:** inscrições do "Faça parte" antes de criar conta
- **eventos:** título, descrição, data, local, capa, publicado
- **inscricoes\_evento:** evento\_id, profile\_id, presença
- **propostas:** profile\_id, tipo (apresentação, oficina), descrição, status
- **acervo:** tipo (poesia, vídeo, áudio, foto), título, autor, arquivo, público
- **gts:** nome, descrição; **gt\_membros:** gt\_id, profile\_id
- **atas:** data, gt\_id, texto
- **tarefas:** gt\_id, título, responsável, status, prazo
- **votacoes:** título, opções, prazo, status; **votos:** votacao\_id, profile\_id, opção (um voto por pessoa)

## Riscos, questões em aberto e uso com agentes

**Riscos**

- **Exposição de membros:** movimento político pode atrair atenção indesejada. Mitigação: dados privados por padrão, RLS, nada de lista pública de integrantes.
- **Plataforma sem uso:** se tudo continuar no WhatsApp, a área interna morre. Mitigação: começar só pelo site público e pela agenda; área interna só quando o coletivo pedir.
- **Dependência de uma pessoa:** só o mantenedor sabe mexer. Mitigação: painel de conteúdo para a coordenação e documentação curta no repositório.
- **Hierarquia percebida:** papéis com cara de cargo podem gerar atrito. Mitigação: coordenação rotativa e decisões por votação.

**Questões em aberto**

- [ ] Nome definitivo do coletivo e domínio
- [ ] Eixos de atuação oficiais (cultura, formação, território, comunicação?)
- [ ] Identidade visual: cores, tipografia, logo
- [ ] Quem aprova novos integrantes e com que critério
- [ ] Quais GTs existem no começo
- [ ] Fotos e textos do sarau que podem ser publicados (autorização de imagem)

**Como usar este PRD no AIOX**

1. **Agente PM:** transformar os requisitos RF01 a RF06 em histórias de usuário com critérios de aceite.
2. **Agente UX/design:** propor identidade visual com cara de cultura periférica da Zona Sul e o wireframe mobile da página inicial.
3. **Agente arquiteto:** gerar o schema SQL do Supabase a partir do modelo de dados, com políticas RLS por papel.
4. **Agente dev:** implementar a Fase 1 em Next.js e publicar na Vercel.
5. **Agente QA:** testar no celular, checar LGPD do formulário e tempo de carregamento.
