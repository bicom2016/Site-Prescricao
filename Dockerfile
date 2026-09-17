# Homepage estática do Afya Whitebook servida por nginx.
# No Coolify: Build Pack "Dockerfile", Base Directory "/", Dockerfile Location "/Dockerfile",
# porta 80 (mesmo padrão de container do deploy do iClinic no VPS).

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# O repositório espelha a estrutura de URLs do site: cada pasta da raiz é uma página.
# Copiamos o contexto inteiro (o .dockerignore já barra docs, specs e Markdown) e
# removemos só os arquivos de build, para que uma página nova não precise de COPY próprio.
COPY . /usr/share/nginx/html/
RUN rm -rf /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore \
           /usr/share/nginx/html/nginx.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/robots.txt || exit 1
