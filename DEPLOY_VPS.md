# Deploy do site no VPS (Coolify) — runbook

> **Documento operacional interno.** Não publicar junto ao site nem copiar seus
> identificadores para tickets ou canais públicos. Nenhum segredo neste arquivo.

Runbook para operar o ambiente de homologação do site Prescrição Afya: um container
nginx orquestrado pelo Coolify no VPS, no mesmo padrão do Whitebook
(`C:\DevOps\Afya_Whitebook\DEPLOY_VPS.md`) e do iClinic. O site é 100% estático e a
imagem é reconstruída a cada push.

Colocado no ar em **2026-09-22** (registro em `docs/registro-22-09-2026.md`).

---

## 1. Inventário da infraestrutura

| Item | Valor |
|---|---|
| VPS | `148.230.73.9` (hostname `srv915770`), Hostinger |
| Orquestrador | Coolify 4.3.23 (UI em `http://148.230.73.9:8000`) |
| Projeto Coolify | `prescricao` · uuid `cldesnd0gynu5hx7jx7dikqq` · ambiente `production` |
| Aplicação | `prescricao-site` · uuid `4cbwuxavvyzmsfe4vrw0qoak` (id interno `34`) |
| URL pública | `https://prescricao.conversion.com.br` (TLS Let's Encrypt via Traefik) |
| Repositório | `git@github.com:bicom2016/Site-Prescricao.git`, branch `main` (repo público) |
| Deploy key (GitHub) | somente-leitura, título `coolify-vps-srv915770-prescricao` |
| Webhook (GitHub) | id `683858609`, push → `/webhooks/source/github/events/manual` no Coolify = **autodeploy** |
| Build | Build pack **Dockerfile**; contexto = raiz do repo; `/Dockerfile`; porta 80 |
| DNS | Cloudflare, zona `conversion.com.br`: registro `A` `prescricao` → `148.230.73.9`, **DNS only** |

Os UUIDs não são segredos — são identificadores usados nas chamadas de API do Coolify.

## 2. Como o container roda

Imagem definida pelo [`Dockerfile`](Dockerfile) (`nginx:1.27-alpine`), idêntico ao do
Whitebook:

- copia o contexto de build inteiro para `/usr/share/nginx/html` e remove só os arquivos
  de build (`Dockerfile`, `nginx.conf`, `.dockerignore`). O que não é site (`docs/`,
  `tools/`, Markdown, PDF, DOCX) fica de fora pelo [`.dockerignore`](.dockerignore);
- [`nginx.conf`](nginx.conf) define gzip, cache de 7 dias para `/assets/`, HTML sempre
  revalidado, `absolute_redirect off`, a página `404.html` do site via `error_page` e o
  header **`X-Robots-Tag: noindex, nofollow`** de homologação;
- `listen 80` + `listen [::]:80` — o IPv6 é necessário porque o busybox `wget` do
  healthcheck resolve `localhost` para `::1`;
- **HEALTHCHECK:** `wget --spider http://127.0.0.1/robots.txt` a cada 30s. O Coolify só
  troca o container quando ele reporta `healthy` (rolling update, sem indisponibilidade).

Não há variáveis de ambiente nem volumes: todo o conteúdo entra na imagem no build.

## 3. Operações rotineiras

### Publicar mudanças (deploy)

**Automático:** todo push na `main` dispara o webhook do GitHub e o Coolify reconstrói e
troca o container em cerca de 40 s. Acompanhe em Coolify → projeto `prescricao` →
`prescricao-site` → Deployments.

**Manual (redeploy sem commit):** botão **Deploy** na UI, ou pela API (de dentro do VPS):

```
curl -X POST -H "Authorization: Bearer <TOKEN>" http://localhost:8000/api/v1/applications/4cbwuxavvyzmsfe4vrw0qoak/start
```

Atenção: o endpoint `GET /api/v1/deploy?uuid=...` usado no runbook do Whitebook responde
`405` nesta versão do Coolify — use o `POST .../start` acima.

### Ver logs / status

```
ssh -i ~/.ssh/claude_ai_mkt root@148.230.73.9
CID=$(docker ps -q --filter name=4cbwuxavvyzmsfe4vrw0qoak | head -1)
docker logs --tail 50 "$CID"
docker ps --filter name=4cbwuxavvyzmsfe4vrw0qoak --format "{{.Status}}"   # deve dizer (healthy)
```

Histórico e log de cada deploy, direto no banco do Coolify (a coluna `application_id`
é texto; o id interno da aplicação é `34`):

```
docker exec coolify-db psql -U coolify -d coolify -c "select id, status, left(commit,7), created_at from application_deployment_queues where application_id='34' order by id desc limit 5;"
```

### Teste rápido de saúde externa

```
curl -sI https://prescricao.conversion.com.br/ | head -5      # HTTP 200 + X-Robots-Tag
curl -sI https://prescricao.conversion.com.br/x | head -1     # HTTP 404 (página do site)
curl -s  https://prescricao.conversion.com.br/robots.txt      # Disallow: /
```

Verificação de que o ar corresponde ao repositório: baixar `/` e `/x` e comparar byte a
byte com `git show HEAD:index.html` e `git show HEAD:404.html` (`cmp`).

### Adicionar ou trocar um domínio

Criar o DNS **não basta**: o Traefik só roteia hostnames que estejam no campo *Domains*
da aplicação no Coolify.

1. **DNS:** registro `A` → `148.230.73.9`, **DNS only** (nuvem cinza no Cloudflare). Com o
   proxy ligado o desafio HTTP-01 do Let's Encrypt falha.
2. **Coolify:** adicionar a URL ao campo *Domains* da aplicação, separando por vírgula e
   mantendo as existentes (UI, ou `PATCH /api/v1/applications/{uuid}` com `domains`).
3. **Redeploy** — as labels do Traefik só são regeradas no deploy; é ele que cria o router
   e dispara a emissão do certificado (cerca de 1 min).
4. **Conferir:** `curl -sv https://<dominio>/ 2>&1 | grep -E 'subject:|issuer:'` deve
   mostrar Let's Encrypt.

**Como reconhecer "domínio sem app":** neste VPS o proxy responde `503 no available
server` com o `TRAEFIK DEFAULT CERT` para **qualquer** hostname desconhecido em HTTPS
(há um router pega-tudo de outro app) e `404` em HTTP. Isso não indica container
doente — indica que nenhuma aplicação do Coolify tem aquele domínio.

## 4. Acesso

- **SSH:** `ssh -i ~/.ssh/claude_ai_mkt root@148.230.73.9` (chave local do responsável;
  também vale para os demais projetos Afya neste VPS).
- **Coolify UI:** `http://148.230.73.9:8000`, login do responsável
  (`bi@comunicacaoaberta.com.br`).
- **Coolify API:** não há token persistido. Criar sob demanda com `php artisan tinker`
  dentro do container `coolify` (o script precisa começar com `<?php` e definir
  `session(['currentTeam' => $u->teams()->first()])` antes de `$u->createToken(...)`),
  usar via `http://localhost:8000/api/v1` de dentro do VPS e revogar ao fim
  (`delete from personal_access_tokens where name='...'` no `coolify-db`).
- **GitHub (bicom2016):** credencial do `git credential fill` na máquina do responsável
  (OAuth, escopo `repo`) — suficiente para deploy keys e webhooks via API REST.

## 5. Checklist de lançamento (domínio oficial)

Este ambiente é de **homologação** e bloqueia indexação de propósito. Ao promover para o
domínio oficial (`prescricaodigital.com`, grafia a confirmar):

1. remover o header `X-Robots-Tag` do [`nginx.conf`](nginx.conf);
2. liberar o [`robots.txt`](robots.txt) (remover o `Disallow: /`);
3. remover o `<meta name="robots" content="noindex, nofollow">` de `index.html`
   (a `404.html` pode manter o `noindex`);
4. trocar `canonical`, `og:url` e `og:image` em `index.html` para o domínio oficial;
5. DNS do domínio oficial → `148.230.73.9` (DNS only) e adicionar a URL ao campo
   *Domains* da aplicação (seção 3); manter `prescricao.conversion.com.br` enquanto a
   Afya usar como revisão, ou remover e redeployar;
6. resolver as pendências de marca e conteúdo listadas no `README.md`.

## 6. Como este ambiente foi criado (para reproduzir)

Tudo via API do Coolify, de dentro do VPS, em 2026-09-22 (token temporário
`claude-cli-prescricao`, revogado ao fim):

1. **Projeto** `prescricao` (`POST /projects`) — o ambiente `production` vem junto.
2. **Deploy key** ed25519 gerada no VPS (`ssh-keygen -t ed25519`); pública no GitHub
   (`POST /repos/bicom2016/Site-Prescricao/keys`, `read_only: true`); privada no Coolify
   (`POST /security/keys`). A cópia em disco foi apagada.
3. **Aplicação** (`POST /applications/private-deploy-key`) com `server_uuid`
   `wg8cs8cgsogs8o0wock04s8g`, `destination_uuid` `sscgoog0w044sk88s4so084k` (rede
   `coolify`), build pack `dockerfile`, base `/`, `/Dockerfile`, porta 80, domínio
   `https://prescricao.conversion.com.br`, `instant_deploy: false`.
4. **Primeiro deploy** (`POST /applications/{uuid}/start`): 45 s, container `healthy`.
5. **Autodeploy:** webhook de `push` no GitHub (`POST /repos/.../hooks`) apontando para
   `http://148.230.73.9:8000/webhooks/source/github/events/manual`, `content_type: json`,
   assinado com o `manual_webhook_secret_github` da aplicação (lido via
   `GET /applications/{uuid}`).
6. Push seguinte (`0f46941`) disparou o deploy pelo webhook: entrega `200` no GitHub,
   deploy em 37 s, container trocado — pipeline validado de ponta a ponta.

## 7. Segredos e credenciais

| Segredo | Onde está |
|---|---|
| Chave SSH do VPS | Com o responsável pelo VPS (fora do repositório) |
| Deploy key do GitHub | Privada no Coolify (Security → Keys); pública no repo (Deploy keys) |
| Token de API do Coolify | Criado sob demanda e revogado; nenhum persistido |
| Secret do webhook | `manual_webhook_secret_github` da aplicação no Coolify; espelhado no webhook do GitHub. Passou pelo log da sessão de 22/09 — rotacionar se quiser (regenerar no Coolify e editar o hook no GitHub) |
