# 05 · Se o plano é usar Base44

Se você tem uma conta no **Base44** e quer subir o site por lá, tem
duas abordagens dependendo do que o Base44 aceita:

## Abordagem A — Hospedar o build estático como assets

O Base44, como muitas plataformas no-code, geralmente permite **fazer upload de
arquivos HTML/CSS/JS estáticos** para um app.

1. Zipe a pasta `build-pronto/` inteira (Windows: botão direito → "Enviar para → Pasta compactada").
2. No app do Base44, procure a opção de **"Upload files"** ou **"Static assets"** ou **"Custom HTML"**.
3. Faça upload do ZIP (ou dos arquivos descompactados, se o Base44 pedir).
4. Configure a rota para servir o `index.html` como página inicial.

⚠️ **Importante**: os produtos individuais são páginas em subpastas
(`/produto/nome-do-produto/index.html`). O Base44 precisa suportar **rewrites
para caminhos aninhados**. Se ele redirecionar tudo pra `/index.html`, os links
internos não vão funcionar corretamente.

## Abordagem B — Rebuild dentro do Base44

Se o Base44 é uma plataforma de app-builder que **não aceita upload direto de HTML**,
você precisará **recriar as telas no Base44 nativo**. Use os arquivos deste
pacote como **referência de design**:

- `site/src/data/products.json` — os 249 produtos (você importa esses dados no Base44)
- `site/src/data/nav.ts` — as 8 categorias + subcategorias
- `site/public/assets/` — os logos R2R oficiais (SVGs)
- `site/public/products/` — as 249 imagens dos produtos
- `site/tailwind.config.ts` — a paleta de cores oficial
- `site/src/app/globals.css` — os tokens CSS e configurações globais

Estrutura das telas a recriar no Base44:

1. **Home** (`site/src/app/page.tsx`) — hero com logo grande, categorias, destaques, CTA ML
2. **Categoria** (`site/src/app/categoria/[slug]/page.tsx`) — sidebar de subcategorias + grid de produtos
3. **Produto** (`site/src/app/produto/[slug]/page.tsx`) — imagem grande + info + botão "Ver no ML"
4. **Header/Footer** (`site/src/components/`) — reutilizáveis

## Abordagem C — Manter no Vercel + Base44 só como landing

Muitos usam o Base44 apenas para páginas de captura/landing, e o site principal
fica em outra plataforma. Se for esse caso:

1. Suba o site em **Vercel/Netlify/Cloudflare Pages** (veja `03-deploy-vercel.md`)
2. Use o Base44 para outras coisas (landing pages, apps internos)

## Não sei o que o Base44 permite

Se você não tiver certeza de qual abordagem funciona no seu plano do Base44,
faça o teste mais barato primeiro:

1. Suba a pasta `build-pronto/` como assets (Abordagem A)
2. Se funcionar: perfeito, acabou
3. Se não funcionar: parte pra Abordagem B ou C

Em qualquer caso, você **não perde nada** — a pasta `build-pronto/` sempre
serve como referência visual e todos os dados/assets estão disponíveis.
