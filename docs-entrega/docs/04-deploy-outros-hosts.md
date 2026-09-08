# 04 · Deploy em outros hosts (alternativas ao Vercel)

O site R2R shop é **HTML estático puro** após o build. Isso significa que ele
funciona em qualquer host que sirva arquivos. Você tem duas opções:

- Usar a pasta **`build-pronto/`** que já veio pronta no ZIP
- OU rodar `npm run build` na pasta `site/` para gerar sua própria pasta `out/`

Depois é só enviar o conteúdo dessa pasta para o host escolhido.

## Netlify (grátis, similar ao Vercel)

1. Crie conta em https://app.netlify.com/signup
2. Arraste a pasta `build-pronto/` inteira no dashboard (drag-and-drop)
3. Pronto — em ~1 minuto está no ar em `https://SEU-SITE.netlify.app`

Domínio customizado e HTTPS: mesmos passos do Vercel, tudo grátis.

## Cloudflare Pages (grátis, muito rápido no Brasil)

1. Crie conta em https://dash.cloudflare.com/sign-up
2. Menu **"Workers & Pages" → "Create application" → "Pages" → "Upload assets"**
3. Envie o ZIP da pasta `build-pronto/`
4. Nome do projeto: `r2r-shop`
5. Pronto — `https://r2r-shop.pages.dev`

Vantagem: **CDN da Cloudflare** — o site fica ainda mais rápido no Brasil.

## Hospedagem tradicional (KingHost, Hostgator, Locaweb)

1. Acesse o painel de controle da sua hospedagem
2. Abra o gerenciador de arquivos (File Manager) ou conecte via FTP
3. Vá para a pasta `public_html/` (ou equivalente)
4. Copie **todo o conteúdo** da pasta `build-pronto/` para lá
5. Acesse seu domínio — site no ar

Se o site já tem outra coisa em `public_html/`, coloque em `public_html/r2r/` e acesse `seudominio.com.br/r2r/`.

## AWS S3 + CloudFront (avançado, ~R$ 5-10/mês)

1. Crie um bucket S3, ative "Static website hosting"
2. Upload de `build-pronto/*` para o bucket
3. Configure CloudFront apontando para o bucket
4. Domínio customizado via Route 53

Guia oficial: https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html

## GitHub Pages (grátis, com domínio `.github.io`)

1. Suba a pasta `build-pronto/` como repositório no GitHub (público)
2. Repo settings → Pages → Source: `main` branch, `/ (root)`
3. Site no ar em `https://SEU-USUARIO.github.io/r2r-shop/`

**Cuidado**: as URLs viram `seu-site/subpasta/produto/xxx` — pode quebrar links relativos.
Melhor usar `.nojekyll` na raiz e testar tudo depois.

## Recomendação

| Cenário | Escolha |
|---------|---------|
| Nunca fiz deploy, quero simples | **Netlify** (drag-and-drop) |
| Quero domínio customizado grátis com HTTPS | **Vercel** ou **Cloudflare Pages** |
| Já tenho hospedagem paga do domínio | **A hospedagem que já tem** (envia por FTP) |
| Preciso da máxima velocidade no Brasil | **Cloudflare Pages** |
