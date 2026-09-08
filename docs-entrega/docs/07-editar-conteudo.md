# 07 · Como editar textos, cores e produtos

## Trocar textos institucionais

### Slogan / hero da home
Arquivo: `site/src/app/page.tsx` (procure "Peça certa. Preço justo.")

### Descrição principal
Mesmo arquivo, procure "Peças e componentes com qualidade de linha original..."

### Selos de benefício (Envio 24h, Garantia, etc)
Mesmo arquivo, seção `SELOS DE BENEFÍCIO`

### Meta tags SEO (título da aba, descrição para Google)
Arquivo: `site/src/app/layout.tsx` (procure `metadata`)

### Textos do footer
Arquivo: `site/src/components/Footer.tsx`

### Textos do menu / categorias
Arquivo: `site/src/data/nav.ts`

---

## Trocar cores

Arquivo: `site/tailwind.config.ts`

```typescript
brand: {
  orange: '#FF4E00',        // acento principal — CTAs, ícones
  orangeText: '#D63F00',    // laranja escuro pra texto (WCAG AA)
  orangeHover: '#E64700',   // hover dos CTAs
  dark: '#1B1E21',          // grafite — textos e títulos
  offWhite: '#F5F4F1',      // creme — fundos secundários
  ...
}
```

Também é usado em `site/src/app/globals.css` (as mesmas cores repetidas como
CSS custom properties para uso em CSS puro).

Depois de mudar, rode `npm run build` para gerar novo `out/` estático.

---

## Adicionar / remover / editar produtos

Arquivo: `site/src/data/products.json`

Cada produto é um objeto assim:
```json
{
  "id": "polia-comando-gm-chevette-street-azul",
  "name": "POLIA COMANDO GM CHEVETTE STREET - AZUL",
  "price": 519,
  "image": "/products/polia_do_comando_gm_chevette_street_azul_849_1_....png",
  "url": "https://www.expertracingparts.com.br/...",
  "category": "POLIA DO COMANDO",
  "categorySlug": "polia-do-comando",
  "available": true
}
```

**Campos importantes:**
- `id` — slug único (sem acento, minúsculo, hífen). É o que vai na URL: `/produto/{id}`
- `image` — caminho relativo dentro de `site/public/products/` (adicione o PNG lá antes)
- `url` — URL de fallback (não usada hoje — o botão do produto vai pro ML por busca)
- `categorySlug` — precisa bater com um dos slugs em `site/src/data/nav.ts`
- `available` — se `false`, o produto aparece marcado como "Indisponível"

Depois de editar, rode `npm run build` para regenerar as páginas HTML.

## Trocar produtos da home (destaques)

Arquivo: `site/src/data/home-featured.json`

Contém 3 arrays: `featured` (8), `vestuario` (3), `collections` (4). Cada item
segue o mesmo formato do `products.json`. Basta copiar objetos de lá para cá.

---

## Trocar as imagens (logo, favicon, badges)

- Logo horizontal (usado no header/hero): `site/public/assets/r2r-logo-horizontal-dark.svg`
- Símbolo (chevron duplo): `site/public/assets/r2r-simbolo.svg`
- Favicon: `site/public/favicon.ico` (16×16, 32×32)
- Apple touch icon: `site/public/apple-touch-icon.png` (180×180)
- OpenGraph card (preview WhatsApp/Twitter): `site/public/og-image.svg` (1200×630)
- Trust badges (Entrega, Segurança, etc): `site/public/assets/*.png`

Os SVGs oficiais R2R vieram da guideline. Se for trocar, **mantenha as mesmas
dimensões** para não quebrar o layout.

---

## Fluxo de atualização

1. Edite o arquivo
2. Teste local: `npm run dev` (ver `docs/02-como-rodar-local.md`)
3. Se estiver ok, gere o build estático: `npm run build`
4. Redeploy no host (Vercel: `vercel --prod`, ou push no GitHub)
