# Brief visual — Manifesto da Sul (v2: construtivista, sem cara de IA)

## 0. ANTES DE TUDO
Um agente anterior começou esta mudança e parou no meio.
1. Rode `git status` e `git diff` e me diga o que já foi alterado.
2. Rode `npm run build`. Se quebrar, conserte isso primeiro.
3. Só então implemente o brief abaixo, reaproveitando o que estiver certo.
Não toque em lógica: Server Actions, Supabase, rate limit, honeypot, LGPD e
/api/revalidate ficam intactos. Esta tarefa é SÓ camada visual.

## 1. O QUE O SITE PRECISA PASSAR
Coletivo da Zona Sul de SP que nasceu como sarau e virou movimento político-cultural.
Tese: "a cultura também é território de disputa".
O site é um CHAMADO, não uma vitrine: linguagem de cartaz de rua, lambe-lambe no
poste, panfleto mimeografado. Força coletiva, diagonais que avançam, origem popular
e periférica, mas acolhedor pra "Dona Cida", de 60 anos, e pro "Lucas", de 19.
Referência: cartazes construtivistas soviéticos (imagem anexa), APROPRIADOS pela
quebrada, com casas de bloco, lajes, caixas d'água, pipas e o megafone do sarau.
Não copie nenhum cartaz da referência. Não use cirílico falso (Я no lugar de R).

## 2. A REGRA MAIS IMPORTANTE: MATAR O "VISUAL PADRÃO DE IA"
O site atual tem a cara genérica que IAs geram. PROIBIDO usar qualquer item desta lista:
- Cantos arredondados (rounded-*, exceto rounded-none). Zero border-radius no site inteiro.
- Botões em pílula, botões com gradiente, botões com sombra desfocada.
- Sombras suaves (shadow-sm/md/lg/xl). Só sombra sólida deslocada.
- Gradientes, glassmorphism, backdrop-blur, header translúcido "flutuando".
- Header padrão "logo à esquerda, links no centro, CTA à direita" em barra fina.
- Hero centralizado com selo-pílula em cima ("CHAMADA ABERTA" num chip), título
  centralizado, parágrafo cinza centralizado e dois botões lado a lado.
- Grid de 3 ou 4 cards idênticos com ícone em círculo + título + texto.
- Ícones do lucide/heroicons decorativos em círculos coloridos. Emojis.
- Tudo dentro de `max-w-7xl mx-auto` com o mesmo padding em todas as seções.
- Texto cinza claro (text-gray-500/600) como cor de texto secundário.
- Animações de hover genéricas: hover:scale-105, hover:shadow-lg, fade-in ao rolar.
- Bolinha colorida antes de rótulos ("● WhatsApp"), badges com ponto pulsando.
- Tipografia "Inter em tudo" com títulos em peso bold comum.
Teste final: se uma tela poderia ser a landing page de uma startup trocando o texto,
ela está ERRADA. Refaça.

## 3. O QUE FAZER NO LUGAR (linguagem de cartaz)
**Grid quebrado e assimétrico.** Elementos que se sobrepõem, títulos que vazam da
coluna, blocos de larguras diferentes. Composição em diagonal, não em caixinhas.

**Header = cabeçalho de jornal/cartaz.**
- Faixa superior fina em vermelho com "Nº 01 · OUTUBRO 2026 · ZONA SUL · SP"
  (como edição de jornal operário).
- Logo grande em Stalinist One, alinhado à esquerda, sem ícone genérico.
- Navegação numerada em Oswald: "01 INÍCIO  02 AGENDA  03 HISTÓRIA  04 PRIVACIDADE",
  separada por filetes verticais pretos de 2px.
- CTA "FAÇA PARTE" como bloco vermelho sólido COLADO na borda direita do header,
  com altura total do header (não um botão flutuante).
- Mobile: menu abre em tela cheia vermelha com os itens em Russo One gigante.

**Botões = blocos de impressão.**
- Retângulo reto, borda preta de 3px, sombra sólida `6px 6px 0 #111`.
- Seta "→" num quadrado preto separado, colado à direita do texto (bloco duplo).
- Hover: o botão "afunda" (translate(6px,6px) e a sombra some) e as cores invertem.
  Sem scale, sem transição longa (100ms, steps se quiser efeito de carimbo).
- Foco visível: contorno dourado #E8B10C de 3px (acessibilidade).

**Etiquetas/tags = carimbo.** Borda dupla, leve rotação (−3° a 3°), Oswald caixa alta,
como carimbo de tinta em documento. Não usar chip arredondado.

**Seções = páginas de cartaz.**
- Numeração gigante (01, 02, 03) em Russo One, vermelho, vazando para fora da seção.
- Cada seção com composição DIFERENTE (não repetir o mesmo layout).
- Fundos alternando papel, preto e vermelho, com transição em DIAGONAL
  (clip-path), nunca em linha reta horizontal.

**Eixos de atuação.** Não fazer 4 cards iguais. Opções: lista tipográfica gigante
(cada eixo em uma linha diagonal), ou blocos de tamanhos diferentes num mosaico,
com a letra/número do eixo como elemento gráfico enorme.

**Agenda = cartaz de evento / lambe.** Cada evento parece um lambe-lambe colado:
data ENORME em bloco preto, título em Russo One, leve rotação alternada (±1°).

**Formulário "Faça parte" = ficha de filiação.** Visual de ficha impressa: campos
como LINHAS para escrever (só borda inferior de 3px), numerados ("1. NOME OU NOME
SOCIAL"), cabeçalho "FICHA DE PARTICIPAÇÃO Nº ____", carimbo "CHAMADA ABERTA"
rotacionado num canto. Checkbox quadrado com X em vez de ✓.

**Textura.** Leve granulado/papel no fundo (SVG noise inline, < 10 KB, opacidade baixa).
Imagens e fotos com tratamento de alto contraste: preto e branco + duotone vermelho.

## 4. TOKENS (fonte de verdade; substituir TODOS em src/app/globals.css)
--brand-red: #C8102E        vermelho bandeira (ação, destaque); nunca alaranjado
--brand-red-dark: #8B0A1A   raios, fundos secundários
--brand-ink: #111111        texto, silhuetas, blocos
--brand-paper: #EDE3CC      fundo principal
--brand-paper-2: #D9CCB0    cards, texto sobre preto
--brand-concrete: #5E5A55   texto secundário (no lugar de gray-500)
--brand-gold: #E8B10C       acento RARO: foco, kickers, detalhes
Remover verde e âmbar antigos. Nada fora desta paleta.

Tipografia (next/font/google, display: swap):
- Títulos: Russo One, caixa alta, entrelinha 0.9, tamanho com clamp()
- Logo e carimbos curtos: Stalinist One (máx. ~3 palavras)
- Navegação, rótulos e botões: Oswald 600/700, caixa alta, tracking 1.5–2px
- Texto corrido: Inter 400/500, 16–20px, entrelinha 1.55 (legibilidade)

Gestos fixos: faixas diagonais em −7° com a frase do coletivo; título do hero com
rotate(-4deg); raios de luz em SVG atrás do hero; megafone em silhueta; skyline
da quebrada em SVG na base do hero; sombras SEMPRE sólidas.

## 5. RESTRIÇÕES
- WCAG AA: testar creme sobre vermelho, vermelho sobre creme, dourado sobre preto.
- Mobile first (360–390px): nada de rolagem horizontal; títulos com clamp().
- Hero < 3s em 3G: SVG inline otimizado, sem imagens pesadas, fontes com swap.
- respeitar prefers-reduced-motion (sem rotações animadas nesse caso).
- Componentizar: Header, Button, Stamp (tag), SectionNumber, DiagonalBand,
  EventPoster, FichaField. Tudo em src/components/.
- Textos provisórios (eixos, datas, locais) continuam marcados como placeholder.

## 6. ENTREGA
1. Primeiro me mostre o plano: quais arquivos vai mudar e como fica cada componente.
2. Implemente em etapas: tokens e fontes → Header e Button → Home → Faça parte.
3. Ao final: `npm run typecheck`, `npm run build` e a lista de arquivos alterados.
4. Rode este checklist e responda item por item:
   [ ] Nenhum rounded-* além de rounded-none
   [ ] Nenhuma shadow-* do Tailwind (só sombra sólida custom)
   [ ] Nenhum gradiente nem blur
   [ ] Nenhuma seção repete o layout de outra
   [ ] Header no formato jornal/cartaz descrito
   [ ] Formulário no formato ficha de filiação
   [ ] Contraste AA conferido
   [ ] Build passando

   ## 7. MOTION (animações)
Princípio: o movimento imita a IMPRESSÃO e a RUA (carimbo batendo, cartaz sendo
colado, papel rasgando, megafone vibrando). Nada de fade suave genérico.
Movimentos curtos e secos: 150–400ms, easing `cubic-bezier(.2,.9,.1,1)` ou `steps()`.

Stack: CSS + IntersectionObserver, ou a lib `motion` (motion.dev) se precisar.
Não usar libs pesadas (GSAP completo, Lottie). Orçamento: < 15 KB de JS para motion.
Animar apenas `transform`, `opacity` e `clip-path` (nada que cause relayout).

Hero (entrada, uma vez):
1. Raios de luz giram 0→8° e ficam girando muito devagar (60s por volta).
2. Título "A QUEBRADA TEM VOZ" entra como CARIMBO: escala 1.3→1, rotação −8°→−4°,
   com um tremor de 2 frames no impacto. Cada linha com 120ms de atraso.
3. Megafone entra pela direita e "vibra" (3 pulsos curtos); as ondas/raios de som
   piscam em sequência, como se estivesse gritando.
4. Faixa diagonal vira LETREIRO correndo (marquee CSS infinito, 30s, pausa no hover).
5. Skyline sobe da base, com prédios entrando em alturas escalonadas (stagger 40ms);
   a pipa balança em loop suave.

Ao rolar (cada elemento anima uma vez ao entrar na tela):
- Números de seção (01, 02, 03) deslizam na diagonal e "batem" no lugar.
- Títulos revelam com wipe diagonal (clip-path em −7°), como tinta passando no rolo.
- Cards de evento = lambe sendo colado: entram com rotação ±3° e "assentam" em ±1°.
- Carimbos/tags: escala 1.4→1 com rotação, simulando o carimbo batendo no papel.
- Formulário: as linhas da ficha se desenham da esquerda pra direita (scaleX 0→1).

Interação:
- Botão: "afunda" no hover/clique (translate(6px,6px), sombra some), em 100ms.
- Enviar do formulário: no sucesso, aparece um carimbo vermelho "RECEBIDO" batendo
  sobre a ficha.
- Links da nav: sublinhado em bloco vermelho que entra da esquerda.

Acessibilidade:
- `prefers-reduced-motion: reduce` → desliga rotações, marquee, vibração e loops;
  o conteúdo aparece direto, já no estado final.
- Nada pisca mais de 3 vezes por segundo.
- O conteúdo nunca depende da animação para aparecer (sem JS, tudo fica visível).

## 8. TRANSIÇÕES ENTRE SEÇÕES
Regra: CADA transição é diferente. Nunca repetir o mesmo divisor. Cada uma é um
componente SVG próprio em src/components/dividers/, animado ao entrar na tela.

1. Hero → 01 (papel → preto): SKYLINE DA QUEBRADA. Casas de bloco, lajes, caixas
   d'água, uma pipa. Os prédios sobem ao rolar; as janelas acendem em sequência
   aleatória (amarelo-papel), como o bairro anoitecendo.
2. 01 → 02 (preto → vermelho): MARTELO E FOICE. Um emblema central entre dois
   filetes horizontais grossos; a fronteira preto/vermelho é uma diagonal em −7°
   passando atrás dele. Desenhe um SVG ORIGINAL, geométrico e simples (não copie
   bandeiras ou logos existentes). Animação: o emblema gira 0→360° uma vez e
   "carimba". Deixe-o como componente isolado (`EmblemDivider`) com uma prop
   `symbol`, para trocar facilmente por punho, estrela ou megafone se o coletivo
   decidir.
3. 02 → 03 (vermelho → papel): PAPEL RASGADO. Borda irregular de lambe-lambe
   rasgado (path SVG serrilhado irregular), com um pedaço de papel "descolando"
   no canto. Animação: o rasgo percorre a tela da esquerda pra direita.
4. 03 → CTA final (papel → preto): RAIOS DE SOL. Um sol nascente construtivista
   (meio círculo vermelho com raios) surgindo do horizonte da seção preta.
   Animação: o sol sobe e os raios se abrem em leque.
5. CTA → Rodapé: PICOTE DE INGRESSO. Borda serrilhada, como canhoto de ingresso de
   sarau, com a frase "VOCÊ FAZ PARTE" correndo em letreiro pequeno.
6. Faça parte (topo vermelho → ficha): A FICHA ENTRA POR CIMA DO TOPO, sobreposta
   com sombra sólida, como papel colocado sobre o cartaz (sem divisor separado).

Mobile: os divisores podem ser mais simples (menos detalhes no SVG), mas continuam
diferentes entre si. Altura de cada divisor: 60–140px no desktop, 40–90px no mobile.

## Checklist extra
   [ ] Cada transição é visualmente diferente das outras
   [ ] Motion só com transform/opacity/clip-path
   [ ] prefers-reduced-motion testado (DevTools → Rendering → Emulate)
   [ ] Lighthouse Performance ≥ 90 no mobile mesmo com motion
   [ ] EmblemDivider aceita trocar o símbolo por prop