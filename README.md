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

As cores vêm da LP de Prescrição do iClinic
(https://lps.iclinic.com.br/prescricao-home/), amostradas da própria página:

| Papel | Token | Cor |
|---|---|---|
| Destaque de texto e ícones | `--magenta` | `#c7127b` |
| Ação (botões) | `--action` | `#8c279b` |
| Azul claro | `--berry-100` | `#b7d2f8` |
| Azul acinzentado | `--berry-120` | `#bccae5` |
| Lavanda | `--berry-140` | `#ceceea` |
| Navy das faixas escuras | `--berry-10` | `#0d1b2a` |
| Faixa de números | `--berry-155` | `#eaeaf4` |
| Fim do degradê das faixas claras | `--berry-152` | `#e6ebf8` |
| Tinta | `--text` | `#2d2d2d` |
| Crédito da Conversion (só no rodapé) | `--conversion-blue` | `#1649ff` |

A reunião de 22/09 decidiu buscar uma paleta neutra entre iClinic e Whitebook (o
Lucas, da Afya, apoia a definição). Até lá nenhuma cor nova entra solta no CSS:
toda cor passa por um token, para a troca acontecer num lugar só.

A escala manteve os nomes `--berry-*` herdados do Whitebook — trocar os nomes
exigiria reescrever as ~6900 linhas que já os referenciam. O que mudou foram os
valores. Seguindo a LP, que é uma página clara, as seções "Para quem" e
"Ecossistema" deixaram de ser blocos escuros e passaram a faixas em azul e
lavanda; o escuro ficou só no hero (a chamada final também passou a clara em 25/09,
e "Para quem" virou a seção de casos de uso).

Ainda são do Whitebook e precisam de arte própria: o favicon
(`whitebook-logo.svg`) e a imagem social (`assets/images/og-home.png`).

A foto do hero (`assets/images/hero/hero-consultorio-*.webp`) é própria de
Prescrição, gerada a partir de `capa-afya-prescricao.jpg` em três recortes:
1280w e 1920w para o `srcset` e um 4:3 (960x720) que a folha troca em telas de
até 600px.

### Marca

Desde 25/09 o cabeçalho, o rodapé e o 404 usam o logo da Afya seguido de
"Prescrição digital" em texto. Na reunião de 22/09 ficou decidido que Prescrição
é produto, não marca, então o lockup "Afya Prescrição" saiu de uso.
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
404.html        página de erro (mesmo header da home; alterar nos dois)
styles.css      estilos (folha completa herdada do Whitebook)
script.js       menu, animações de reveal e sprite de ícones
assets/         fontes, ícones, imagens e vídeos usados pela home
robots.txt      bloqueando indexação — liberar só no lançamento
Dockerfile      imagem nginx para deploy
nginx.conf      configuração do servidor
DEPLOY_VPS.md   runbook do ambiente no VPS (Coolify): operar, domínio, lançamento
docs/           documentação de referência do projeto e registros de sessão
tools/          scripts de derivação de assets (fora da imagem publicada)
```

## Navegação desativada

A home aponta para 19 destinos que ainda não existem — as cinco páginas do menu
(Recursos, Para quem, Dúvidas, Para parceiros e Blog), a subpágina da RDC
1000/2025 e os links de rodapé. Os elementos `<a>` foram mantidos (preservando
layout e espaçamento), mas sem `href` — ficam inertes. O destino pretendido de
cada um está guardado em `data-link-original`. A `404.html` repete o menu da
home e, com ele, os mesmos cinco itens inertes.

Para reativar um link ao criar a página correspondente:

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

**Conteúdo e marca**

- [ ] Validar o conteúdo da home com a Afya e resolver as 8 pendências da seção 5 de
      `docs/Conteudo Home - Prescricao Afya v1.docx` (data dos controlados, nome da
      norma, números de prova, CliqueFarma, nome da seção "Para quem", CTAs, domínio,
      depoimentos)
- [ ] Substituir os assets herdados do Whitebook: favicon (`whitebook-logo.svg`) e
      imagem social (`assets/images/og-home.png`)
- [ ] Topo com duas cenas alternando (iClinic no consultório e Whitebook no plantão,
      com o paciente) e a mensagem central no subtítulo — ata de 22/09, fora da
      rodada de 25/09; depende das fotos e da decisão entre uma versão, duas ou
      troca automática
- [ ] Confirmar se a prescrição no Whitebook gratuito é "ilimitada" (texto atual do
      topo e do card) ou "limitada" (ata de 22/09)
- [ ] Pedir à Afya o logo oficial da Afya em vetor e trocar `afya-logo.svg`
- [ ] Receber telas e GIFs reais do produto e o print da tela de prescrição do
      iClinic: hoje "Como funciona" e os casos de uso usam telas recriadas em HTML
- [ ] Paleta neutra entre iClinic e Whitebook (Afya, com o Lucas)
- [ ] Números do ecossistema Afya para a faixa de prova, fotos dos depoimentos e
      definição do vídeo (Afya, ata de 22/09)

**Site**

- [ ] Definir as páginas internas a partir de `docs/Estrutura Páginas Site Prescrição.pdf`
      (Recursos, Para quem, Dúvidas, Para parceiros, Blog, RDC 1000/2025) e reativar
      os links inertes (`grep -rn 'data-link-original' *.html`)
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
