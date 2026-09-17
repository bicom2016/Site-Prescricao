# Site Prescrição

Novo site do projeto Prescrição (Afya), a ser publicado em https://prescricao.conversion.com.br/

Site estático — HTML, CSS e JavaScript, sem build step. Basta servir a raiz do
repositório.

## Origem

A home page foi migrada de https://whitebook.conversion.com.br/
(repositório [bicom2016/afya-whitebook](https://github.com/bicom2016/afya-whitebook)),
no commit `e81ed95`. Só a home veio junto: as páginas internas serão definidas
a partir da documentação em `docs/`.

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

A home herdou ~40 links para páginas internas do Whitebook que ainda não
existem aqui. Os elementos `<a>` foram mantidos (preservando layout e
espaçamento), mas sem `href` — ficam inertes. O destino original de cada um
está guardado em `data-link-original`.

Para reativar um link ao criar a página correspondente:

```html
<!-- de -->
<a data-link-original="/planos/">Planos</a>
<!-- para -->
<a href="/planos/">Planos</a>
```

Para listar o que falta: `grep -rn 'data-link-original' *.html`

## Desenvolvimento local

Qualquer servidor estático serve. Com Docker:

```sh
docker build -t site-prescricao .
docker run --rm -p 8080:80 site-prescricao
```

## Pendências

- [ ] Adaptar conteúdo, marca e meta tags da home (hoje ainda são do Whitebook)
- [ ] Definir as páginas internas a partir de `docs/Estrutura Páginas Site Prescrição.pdf`
- [ ] Configurar o DNS de prescricao.conversion.com.br e o deploy
- [ ] Liberar a indexação no `robots.txt` no lançamento
