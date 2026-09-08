# 01 · Visão geral do projeto R2R shop

## O que é

Site vitrine do **R2R shop** (marca de peças de performance automotiva — polias,
blocos billet, coletores, juntas, tampas de válvula, respiros).

- **249 produtos** cadastrados com imagem, preço e categoria
- **8 categorias principais** com subcategorias (Polias & Roda Fônica, Exp Billet, Coletores, Juntas, Tampas & Respiros, Reforço de Bloco, Vestuário, Expert Collections)
- Cada produto tem botão **"Ver no Mercado Livre"** que abre a busca do produto na loja oficial do cliente no ML
- Site **estático puro** (HTML/CSS/JS pré-renderizados) — funciona em qualquer host, sem servidor Node

## Stack técnica

- **Next.js 15** com App Router + export estático (`output: 'export'`)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 3.4** para styling
- Fontes **Archivo** + **IBM Plex Mono** via Google Fonts
- **Zero backend** para o site — tudo é pré-renderizado no build
- **249 imagens** de produto servidas de `public/products/`

## Arquitetura visual

Paleta oficial da guideline R2R (aplicada em todo o site):

| Cor | Hex | Uso | Proporção |
|-----|-----|-----|-----------|
| Off-white | `#F5F4F1` | Fundos, painéis | 55% |
| Grafite | `#1B1E21` | Texto, títulos | 30% |
| Laranja R2R | `#FF4E00` | Acento: CTA, ícones, chevrons | 10% |
| Laranja texto | `#D63F00` | Laranja com WCAG AA (usado em texto) | — |
| Aço | `#9AA1A7` | Legendas, bordas, dados secundários | 5% |

Slogan oficial: **"Peça certa. Preço justo."**

Selos de benefício: **Envio em 24h · Garantia 90 dias · Compatibilidade verificada**

## O que já está pronto

- ✅ Design completo seguindo guideline oficial (logo R2R sem "FAST")
- ✅ 303 páginas geradas (home + 50 categorias + 249 produtos + 404)
- ✅ Header sticky com dropdown (com suporte a teclado) + menu mobile acessível
- ✅ SEO: meta tags, OpenGraph, Twitter cards, favicon oficial, sitemap implícito
- ✅ Acessibilidade WCAG AA (skip link, contraste, aria-labels, foco visível)
- ✅ Responsivo (mobile-first, touch targets ≥44px)
- ✅ 404 personalizado com identidade R2R
- ✅ Auditoria de qualidade passada (score ~19/20)
- ✅ Deploy funcional no Vercel (versão atual: https://r2r-shop.vercel.app)

## O que NÃO está incluído

- ❌ **Bot de resposta automática Mercado Livre** — foi arquivado (decisão do cliente). Se um dia quiser retomar, o código está no backup completo (não neste ZIP).
- ❌ **Páginas institucionais** (Sobre nós, Trocas, Privacidade, Termos) — hoje aparecem como "em breve" no footer. Precisam do conteúdo do cliente.
- ❌ **Dados reais de contato** (e-mail R2R, WhatsApp, CNPJ verificado) — cliente precisa fornecer.
- ❌ **Sincronização automática de produtos com o Bling** — o `products.json` é estático hoje. Se quiserem produtos vivos, precisa desenvolver um pipeline Bling → JSON antes do build.

## O que existe como opcional nesta entrega

- **`painel-admin-bling/`** — um Next.js separado (porta 3002) que só serve para autorizar OAuth com o Bling ERP e ver o token no banco. Use apenas se o cliente quiser cadastrar produtos vindos do Bling.
