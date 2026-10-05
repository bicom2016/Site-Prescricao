# Site Prescrição

Novo site do projeto Prescrição (Afya).

- **Homologação:** https://prescricao.conversion.com.br/ — ambiente de revisão
  da Afya. É para onde `canonical` e as meta tags sociais apontam hoje, e onde
  as três travas de indexação (ver "Antes de indexar") precisam continuar
  ligadas.
- **Lançamento:** `prescricaodigital.com` foi a decisão da reunião de 15/09,
  com a grafia a confirmar. O domínio já está registrado, mas hoje responde
  uma página de estacionamento.

Site estático — HTML, CSS e JavaScript, sem build step. Basta servir a raiz do
repositório.

## Origem

A base veio de https://whitebook.conversion.com.br/
(repositório [bicom2016/afya-whitebook](https://github.com/bicom2016/afya-whitebook)),
no commit `e81ed95`. Só a home veio junto: as páginas internas serão definidas
a partir da documentação em `docs/`.

O conteúdo da home já é de Prescrição — texto, navegação e meta tags foram
reescritos a partir de `docs/`. A proposta que originou esse texto está em
`docs/Conteudo Home - Prescricao Afya v1.docx`, ainda **pendente de validação
pela Afya**: as oito pendências listadas na seção 5 do documento (data da
liberação dos controlados, nome da norma, liberação dos números de prova,
menção ao CliqueFarma, nome da seção "Para quem", textos dos CTAs, domínio e
depoimentos) continuam em aberto.

A folha de estilo segue sendo a herdada do Whitebook: a home reaproveita os
componentes existentes (`hero`, `proof`, `afya-band`, `outcome-grid`,
`plans-grid`, `credibility`, `rx-demo`, `faq-list`, `final-cta`). Os blocos no
fim de `styles.css` cobrem só o que não existia: a marca (logo da Afya + texto), a
nota de apoio do hero e, desde 25/09, "Como funciona" com tela única (`how`,
`rx-app`), os casos de uso (`use-cases`, `ic-app`, `wb-phone`) e o carrossel de
benefícios no celular. As duas seções novas usam abas genéricas (`[data-tabs]`, no
fim de `script.js`).

Também ficaram no repositório assets e scripts do Whitebook que a home de
Prescrição não usa: os logos do clube de benefícios (`assets/images/benefits/`),
as fotos da equipe e dos depoimentos (`team/`, `testimonials/`), as telas,
avatares e cards de persona (`screens/`, `photos/`), o vídeo do Whitebook IA
(`assets/video/`, `images/video/`), os selos de download das lojas e dez ícones
soltos em `assets/icons/`. Em `script.js`, os blocos do explorador de produto,
do carrossel de benefícios, dos acordeões da jornada, do toggle de planos, da
demo do WB Assist e dos grupos do menu só rodam se encontrarem seus elementos,
que a home não tem. Tudo isso entra na imagem publicada; a decisão de remover ou
reaproveitar fica para quando as páginas internas forem definidas.

## Paleta

Desde 29/09 a paleta é a sóbria pedida no feedback consolidado da Afya: azul-escuro
na ação, azul no destaque, azul acinzentado nas superfícies e magenta só em
detalhes. Os valores são uma proposta e aguardam validação da Afya. Até 28/09 a
ação era roxa (`#8c279b`) e o destaque, magenta, cores amostradas da LP de
Prescrição do iClinic (https://lps.iclinic.com.br/prescricao-home/), que é a
campanha válida até dezembro.

| Papel | Token | Cor |
|---|---|---|
| Ação (botões) | `--action` | `#1b3f7a` |
| Destaque de texto, ícones e links | `--accent` | `#2f62b0` |
| Detalhe: olho das seções, sublinhado do menu, marcador do passo ativo | `--magenta` | `#c7127b` |
| Campanha: só no banner da nova prescrição | `--campaign` | `#8c279b` |
| Azul claro | `--berry-100` | `#b7d2f8` |
| Azul acinzentado | `--berry-120` | `#bccae5` |
| Azul acinzentado das bordas | `--berry-140` | `#cbd5e3` |
| Navy das faixas escuras | `--berry-10` | `#0d1b2a` |
| Faixas de quebra entre as seções brancas | `--berry-155` | `#ebeff6` |
| Caixas claras sobre fundo branco | `--berry-160` | `#f4f6fb` |
| Tinta | `--text` | `#2d2d2d` |
| Crédito da Conversion (só no rodapé) | `--conversion-blue` | `#1649ff` |

Nenhuma cor entra solta no CSS: toda cor passa por um token, para a troca
acontecer num lugar só. No topo, que é escuro, o botão primário é branco e o
secundário é contorno branco, porque o azul-escuro sumiria sobre o navy da foto.

A escala manteve os nomes `--berry-*` herdados do Whitebook — trocar os nomes
exigiria reescrever as ~6900 linhas que já os referenciam. O que mudou foram os
valores. Seguindo a LP, que é uma página clara, as seções "Para quem" e
"Ecossistema" deixaram de ser blocos escuros e passaram a faixas em azul e
lavanda; o escuro ficou só no hero (a chamada final também passou a clara em 25/09,
e "Para quem" virou a seção de casos de uso, que em 29/09 se juntou a "Onde você
prescreve" numa seção só; desde 05/10 ela tem as abas por contexto de uso em cima
e os recursos dos dois produtos lado a lado embaixo).

Desde 29/09 a página é branca na maior parte, com quebras em azul acinzentado
chapado (`--berry-155`), sem degradê: faixa de números, personas, depoimentos e
chamada final. A lavanda saiu da escala: `--berry-140`, `--berry-150` e
`--berry-155` passaram a azul acinzentado, e `--berry-152` deixou de existir.

Ainda é do Whitebook e precisa de arte própria a imagem social
(`assets/images/og-home.png`). O ícone da aba (`assets/images/afya-favicon.svg`)
é o "A" do logo da Afya desde 29/09.

A foto do hero (`assets/images/hero/hero-consultorio-*.webp`) é própria de
Prescrição, gerada a partir de `capa-afya-prescricao.jpg` em três recortes:
1280w e 1920w para o `srcset` e um 4:3 (960x720) que a folha troca em telas de
até 600px.

### Marca

Desde 29/09 o cabeçalho, o rodapé e o 404 usam só o logo da Afya: o feedback
consolidado pediu a marca sem a palavra "prescrição", então saiu o texto
"Prescrição digital" que ficava ao lado do logo desde 25/09. Na reunião de 22/09
ficou decidido que Prescrição é produto, não marca, então o lockup "Afya
Prescrição" já tinha saído de uso.
`assets/images/afya-logo.svg` são as quatro letras do lockup do iClinic
(`afya-iclinic-lockup.svg`), sem o iClinic — provisório até a Afya mandar o
arquivo oficial.

O lockup antigo e seu gerador continuam no repositório, sem uso na página:

`assets/images/afya-prescricao-lockup.png` foi montado a partir do lockup do
Whitebook: o símbolo "Afya" é recorte pixel a pixel do arquivo original, e
"PRESCRIÇÃO" foi composto em AfyaSans ExtraBold com os parâmetros medidos no
original — caixa-alta de 81px, inclinação de 10°, condensação de 0,95 e
entreletra de −4,51px. O script que gera o arquivo é
`tools/afya-prescricao-lockup.js` — fica em `tools/` porque o `.dockerignore`
barra essa pasta, e script de build não deve ser servido pelo site. Ele se
autocalibra: recompõe a palavra "WHITEBOOK" como controle e ajusta a entreletra
até reproduzir os 686px de largura do original.

Para gerar outra variante (por exemplo, uma versão em branco para fundo
escuro), instale a dependência uma vez com
`npm install --no-save --no-package-lock @napi-rs/canvas` (o `node_modules/`
já está no `.gitignore`) e rode
`node tools/afya-prescricao-lockup.js "PALAVRA" saida.png`. O script resolve o
lockup de origem e a fonte a partir da própria pasta do repositório, então roda
de qualquer máquina. É uma reprodução, não o arquivo oficial da marca — se a
Afya fornecer o lockup vetorial de Prescrição, substitua.

## Estrutura

```
index.html      home page
404.html        página de erro (mesmo header da home; alterar em todas)
recursos/       Recursos, com a subpágina recursos/rdc-1000-2025/
para-quem/      médicos, clínicas, pacientes e farmácias, em página única com âncoras
duvidas/        central de dúvidas, por tema
parceiros/      dispensador para farmácias (#dispensador) e indústria farmacêutica
blog/           linhas editoriais; sem artigos até a decisão de ferramenta
styles.css      estilos (folha completa herdada do Whitebook)
script.js       menu, animações de reveal e sprite de ícones
assets/         fontes, ícones, imagens e vídeos usados pelas páginas
robots.txt      bloqueando indexação — liberar só no lançamento
Dockerfile      imagem nginx para deploy
nginx.conf      configuração do servidor
DEPLOY_VPS.md   runbook do ambiente no VPS (Coolify): operar, domínio, lançamento
docs/           documentação de referência do projeto e registros de sessão
tools/          scripts de derivação de assets (fora da imagem publicada)
```

## Páginas internas

Desde 05/10 as cinco páginas do menu e a subpágina da RDC 1000/2025 existem, como
pastas com `index.html` (o nginx serve `/recursos/` pelo `index`). Elas repetem
o cabeçalho e o rodapé da home e reaproveitam os componentes dela: hero interno
claro (`.page-hero`), linhas que alternam texto e tela (`.why-row` +
`.feature-copy`), telas ilustrativas (`.rx-app`, `.ic-app`, `.wb-phone`,
`.rx-demo`), colunas de produto (`.compare-grid`), dúvidas (`.faq-item`) e a
chamada final. O que a home não tinha está no fim de `styles.css`: lista de
âncoras, cards numerados e cards de informação.

O copy das páginas veio dos documentos do projeto (Arquitetura Narrativa, Visão
360, Guia Mar Aberto e o board de estrutura) e da proposta em
`docs/proposta-paginas-internas-05-10-2026.html`. É uma primeira versão, a ser
trocada pelo copy que a Afya enviar. Ao mexer no menu ou no rodapé, alterar em
todas as páginas: `grep -rln 'site-header' --include=index.html --include=404.html .`

## Navegação desativada

Continuam sem `href`, inertes, os links cujo destino ainda não existe: os três
legais do rodapé (Termos de uso, Privacidade, Políticas e diretrizes) e, em
`parceiros/`, os botões "Acessar o dispensador" e "Fale com o time comercial",
cujos endereços dependem da Afya. O destino pretendido de cada um está em
`data-link-original`.

Para reativar um link quando o destino existir:

```html
<!-- de -->
<a data-link-original="/recursos/">Recursos</a>
<!-- para -->
<a href="/recursos/">Recursos</a>
```

Para listar o que falta: `grep -rn 'data-link-original' *.html`

## Desenvolvimento local

Qualquer servidor estático serve. Com Docker:

```sh
docker build -t site-prescricao .
docker run --rm -p 8080:80 site-prescricao
```

## Deploy

No ar desde 22/09/2026 em https://prescricao.conversion.com.br/, num container
nginx orquestrado pelo Coolify no VPS, no mesmo padrão do Whitebook e do
iClinic. O `Dockerfile` copia o contexto inteiro (o `.dockerignore` barra
`docs/`, `tools/` e os Markdown), então uma página nova não exige alteração no
build.

| Item | Valor |
|---|---|
| VPS | `148.230.73.9` (`srv915770`, Hostinger); Coolify em `http://148.230.73.9:8000` |
| Projeto Coolify | `prescricao` · uuid `cldesnd0gynu5hx7jx7dikqq` · ambiente `production` |
| Aplicação | `prescricao-site` · uuid `4cbwuxavvyzmsfe4vrw0qoak` |
| Build | Build Pack "Dockerfile", Base Directory `/`, Dockerfile Location `/Dockerfile`, porta 80 |
| Repositório | `git@github.com:bicom2016/Site-Prescricao.git`, branch `main` |
| Deploy key (GitHub) | somente-leitura, título `coolify-vps-srv915770-prescricao` |
| Webhook (GitHub) | push → `/webhooks/source/github/events/manual` no Coolify = **autodeploy** |
| DNS | registro A `prescricao` → `148.230.73.9`, **DNS only** (nuvem cinza no Cloudflare) |

Os UUIDs não são segredos — são identificadores para as chamadas de API do
Coolify. Nenhum segredo fica neste repositório: a chave privada do deploy está
no Coolify (Security → Keys), o secret do webhook é o
`manual_webhook_secret_github` da aplicação, e o token de API é criado sob
demanda e revogado depois.

**Publicar:** todo push na `main` dispara o webhook e o Coolify reconstrói e
troca o container (cerca de 40 s). Acompanhe em Coolify → projeto `prescricao`
→ `prescricao-site` → Deployments. Redeploy manual sem commit: botão **Deploy**
na UI, ou `POST /api/v1/applications/4cbwuxavvyzmsfe4vrw0qoak/start` com um
token de API.

O TLS é emitido pelo proxy do Coolify (Let's Encrypt). Por isso o DNS precisa
ficar sem o proxy da Cloudflare: com a nuvem laranja o desafio HTTP-01 falha.

Operação completa — logs, redeploy manual, adicionar domínio, checklist de
lançamento, como o ambiente foi criado — em `DEPLOY_VPS.md`. O que foi feito
em cada sessão fica em `docs/registro-DD-MM-AAAA.md`.

### Antes de indexar

O ambiente está fechado para busca em três lugares, de propósito. Os três só
saem no lançamento com o domínio oficial — em homologação devem continuar:

| Arquivo | O quê |
|---|---|
| `robots.txt` | `Disallow: /` |
| `index.html` | `<meta name="robots" content="noindex, nofollow">` |
| `nginx.conf` | `add_header X-Robots-Tag "noindex, nofollow"` |

## Pendências

Lista de trabalho do projeto. Concluídos ficam marcados com a data.

**Feito**

- [x] Home de Prescrição com conteúdo, paleta e identidade próprios (17/09/2026)
- [x] Revisão pré-publicação: 404 de Prescrição, nginx sem restos do Whitebook,
      gerador do lockup portável, preload do hero (22/09/2026, `e4e7ddb`)
- [x] DNS de prescricao.conversion.com.br, app no Coolify, deploy key, autodeploy
      por webhook — site no ar (22/09/2026, ver `DEPLOY_VPS.md`)
- [x] Ata de 22/09, tudo menos o topo: marca neutra, casos de uso, "Como funciona"
      com tela única, benefícios em carrossel no celular, papel de cada produto,
      cores em tokens (25/09/2026, ver `docs/registro-25-09-2026.md` e
      `docs/plano-29-09-2026.html`)
- [x] Feedback consolidado da Afya, o que não dependia de material: marca só com o
      logo, ícone da aba, paleta sóbria,
      benefícios em linhas alternadas, personas, banner, depoimentos e fundos
      (29/09/2026, ver `docs/registro-29-09-2026.md` e
      `docs/plano-feedback-afya-29-09-2026.html`)
- [x] Call de 29/09: subtítulo do topo amarrado aos produtos, abas por contexto de
      uso sem amarra ao celular, seção "Onde você prescreve" com abas + tela + frase
      em cima e recursos lado a lado embaixo, corte de texto, proposta de estrutura
      das páginas internas (05/10/2026, ver `docs/registro-05-10-2026.md` e
      `docs/plano-call-29-09-2026.html`)
- [x] Páginas internas do menu, primeira versão: Recursos, RDC 1000/2025, Para quem,
      Dúvidas, Para parceiros e Blog, com copy dos documentos do projeto
      (05/10/2026, ver `docs/registro-05-10-2026.md`)

**Conteúdo e marca**

- [ ] Validar o conteúdo da home com a Afya e resolver as 8 pendências da seção 5 de
      `docs/Conteudo Home - Prescricao Afya v1.docx` (data dos controlados, nome da
      norma, números de prova, CliqueFarma, nome da seção "Para quem", CTAs, domínio,
      depoimentos)
- [ ] Substituir a imagem social herdada do Whitebook (`assets/images/og-home.png`)
- [ ] Enviar à Afya o pedido de banner e telas
      (`docs/pedido-afya-banner-e-telas-29-09-2026.md`)
- [ ] Depoimentos: trocar os três cards de marcação pelo conteúdo real (texto, nome,
      especialidade e foto) antes de publicar no domínio oficial
- [ ] Banner da nova prescrição: receber a arte da Afya e confirmar posição, texto e
      destino do botão
- [ ] Confirmar com a Afya os botões do iClinic na comparação (a LP usa "Testar o
      iClinic grátis" e "Falar com especialista") e se "iBook", no resumo da call de
      29/09, é nome novo do Whitebook ou erro de transcrição
- [ ] Validar com a Afya o corte de texto aplicado em 05/10
      (`docs/corte-de-texto-05-10-2026.html`)
- [ ] Blog: decidir a ferramenta e quem escreve; a página mostra só as linhas editoriais
- [ ] RDC 1000/2025: confirmar a data (30/09) e o passo a passo real da numeração no
      SNCR antes de detalhar a subpágina
- [ ] Trocar as fotos provisórias das personas (herdadas do Whitebook) pelas
      definitivas
- [ ] Topo com duas cenas alternando (iClinic no consultório e Whitebook no plantão,
      com o paciente) e a mensagem central no subtítulo — ata de 22/09, fora da
      rodada de 25/09; depende das fotos e da decisão entre uma versão, duas ou
      troca automática
- [ ] Confirmar se a prescrição no Whitebook gratuito é "ilimitada" (texto atual do
      topo e do card) ou "limitada" (ata de 22/09)
- [ ] Pedir à Afya o logo oficial da Afya em vetor e trocar `afya-logo.svg`
- [ ] Receber telas e GIFs reais do produto e o print da tela de prescrição do
      iClinic: hoje "Como funciona" e as personas usam telas recriadas em HTML
- [ ] Validar com a Afya os valores da paleta sóbria e o ritmo dos fundos aplicados
      em 29/09
- [ ] Números do ecossistema Afya para a faixa de prova, fotos dos depoimentos e
      definição do vídeo (Afya, ata de 22/09)

**Site**

- [ ] Páginas internas: trocar o copy desta primeira versão pelo da Afya, página a
      página, e receber os endereços do dispensador e do contato comercial
      (`grep -rn 'data-link-original' --include=*.html -r .`)
- [ ] Páginas legais (Termos de uso, Privacidade, Políticas e diretrizes): conteúdo
      jurídico da Afya
- [ ] Decidir o destino dos assets e scripts do Whitebook sem uso (ver "Origem"):
      apagar ou reaproveitar quando as páginas internas existirem
- [ ] Instalar medição (GA4/GTM) — hoje a página não tem nenhum script de análise

**Lançamento**

- [ ] Confirmar a grafia do domínio oficial (`prescricaodigital.com`, reunião de 15/09)
- [ ] Liberar a indexação nos três pontos de "Antes de indexar" e trocar canonical,
      `og:url` e `og:image` para o domínio oficial
- [ ] Apontar o domínio oficial e adicioná-lo à aplicação no Coolify
      (`DEPLOY_VPS.md` §5)
- [ ] Opcional: rotacionar o secret do webhook do GitHub (passou pelo log da sessão
      de 22/09)
