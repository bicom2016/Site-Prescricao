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
`plans-grid`, `steps-grid`, `trust-band`, `credibility`, `rx-demo`, `faq-list`,
`final-cta`). O bloco no fim de `styles.css` cobre só o que não existia — marca
em texto, a nota de apoio do hero e o grid de quatro passos.

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
| Tinta | `--text` | `#2d2d2d` |

A escala manteve os nomes `--berry-*` herdados do Whitebook — trocar os nomes
exigiria reescrever as ~6900 linhas que já os referenciam. O que mudou foram os
valores. Seguindo a LP, que é uma página clara, as seções "Para quem" e
"Ecossistema" deixaram de ser blocos escuros e passaram a faixas em azul e
lavanda; o escuro ficou no hero e na chamada final.

Ainda são do Whitebook e precisam de arte própria: o favicon
(`whitebook-logo.svg`) e a imagem social (`assets/images/og-home.png`).

A foto do hero (`assets/images/hero/hero-consultorio-*.webp`) é própria de
Prescrição, gerada a partir de `capa-afya-prescricao.jpg` em três recortes:
1280w e 1920w para o `srcset` e um 4:3 (960x720) que a folha troca em telas de
até 600px. Os arquivos `hero-plantao-v4-*` ficaram sem uso e podem ser
removidos.

### Lockup da marca

`assets/images/afya-prescricao-lockup.png` foi montado a partir do lockup do
Whitebook: o símbolo "Afya" é recorte pixel a pixel do arquivo original, e
"PRESCRIÇÃO" foi composto em AfyaSans ExtraBold com os parâmetros medidos no
original — caixa-alta de 81px, inclinação de 10°, condensação de 0,95 e
entreletra de −4,51px. O script que gera o arquivo está ao lado dele
(`afya-prescricao-lockup.gen.js`) e se autocalibra: ele recompõe a palavra
"WHITEBOOK" como controle e ajusta a entreletra até reproduzir os 686px de
largura do original.

Para gerar outra variante (por exemplo, uma versão em branco para fundo
escuro), rode o script com a palavra desejada. É uma reprodução, não o arquivo
oficial da marca — se a Afya fornecer o lockup vetorial de Prescrição,
substitua.

## Estrutura

```
index.html      home page
404.html        página de erro
styles.css      estilos (folha completa herdada do Whitebook)
script.js       menu, animações de reveal e sprite de ícones
assets/         fontes, ícones, imagens e vídeos usados pela home
robots.txt      bloqueando indexação — liberar só no lançamento
Dockerfile      imagem nginx para deploy
nginx.conf      configuração do servidor
docs/           documentação de referência do projeto
```

## Navegação desativada

A home aponta para 19 destinos que ainda não existem — as cinco páginas do menu
(Recursos, Para quem, Dúvidas, Para parceiros e Blog), a subpágina da RDC
1000/2025 e os links de rodapé. Os elementos `<a>` foram mantidos (preservando
layout e espaçamento), mas sem `href` — ficam inertes. O destino pretendido de
cada um está guardado em `data-link-original`.

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

Coolify no VPS, mesmo padrão do iClinic: Build Pack "Dockerfile", Base
Directory `/`, Dockerfile Location `/Dockerfile`, porta 80. O `Dockerfile`
copia o contexto inteiro (o `.dockerignore` barra `docs/` e os Markdown), então
uma página nova não exige alteração no build.

DNS: um registro A de `prescricao.conversion.com.br` apontando para o IP do
VPS. O TLS é emitido pelo proxy do Coolify.

### Antes de indexar

O ambiente está fechado para busca em três lugares, de propósito. Os três só
saem no lançamento com o domínio oficial — em homologação devem continuar:

| Arquivo | O quê |
|---|---|
| `robots.txt` | `Disallow: /` |
| `index.html` | `<meta name="robots" content="noindex, nofollow">` |
| `nginx.conf` | `add_header X-Robots-Tag "noindex, nofollow"` |

## Pendências

- [ ] Validar o conteúdo da home com a Afya e resolver as 8 pendências do documento
- [ ] Substituir os assets herdados do Whitebook (favicon e imagem social)
- [ ] Definir as páginas internas a partir de `docs/Estrutura Páginas Site Prescrição.pdf`
- [ ] Apontar o DNS de prescricao.conversion.com.br e criar a app no Coolify
- [ ] Instalar medição (GA4/GTM) — hoje a página não tem nenhum script de análise
- [ ] Liberar a indexação nos três pontos acima, no lançamento
