# R2R shop

Site vitrine oficial do **R2R shop** — peças e componentes de performance
automotiva para carros, motos, náutica e motores em geral.

> **Peça certa. Preço justo.**

- 🌐 **Produção**: https://r2r-shop.vercel.app
- 🎨 **Design system**: paleta oficial R2R (off-white / grafite / laranja `#FF4E00`)
- 📦 **249 produtos** em 8 categorias
- 🛒 **Integração ML**: cada produto abre a busca no Mercado Livre
- ⚡ **Next.js 15** estático (deploy em qualquer host)

---

## Estrutura do repositório

```
r2r-shop/
├── admin/                   ← SITE (Next.js 15 estático)
├── bot-admin/               ← Painel opcional pra reconectar Bling ERP
├── docs-entrega/            ← Documentação passo a passo pro time
│   ├── LEIA-ME-PRIMEIRO.md
│   └── docs/                ← 8 guias: rodar local, deploy, Bling, etc
└── README.md                ← este arquivo
```

---

## Começar (5 minutos)

### Rodar o site local

```bash
cd admin
npm install
npm run dev
# abre http://localhost:3000
```

### Fazer build estático (HTML puro)

```bash
cd admin
npm run build
# gera admin/out/ com os arquivos prontos pra qualquer host
```

### Deploy no Vercel

```bash
cd admin
npx vercel --prod
```

---

## Documentação completa

Toda a documentação técnica está em [`docs-entrega/`](docs-entrega/):

| # | Guia |
|---|------|
| 01 | [Visão geral do projeto](docs-entrega/docs/01-visao-geral.md) |
| 02 | [Como rodar local](docs-entrega/docs/02-como-rodar-local.md) |
| 03 | [Deploy no Vercel](docs-entrega/docs/03-deploy-vercel.md) |
| 04 | [Deploy em outros hosts](docs-entrega/docs/04-deploy-outros-hosts.md) |
| 05 | [Deploy no Base44](docs-entrega/docs/05-deploy-base44.md) |
| 06 | [Conectar Bling ERP](docs-entrega/docs/06-conectar-bling.md) |
| 07 | [Editar textos, cores e produtos](docs-entrega/docs/07-editar-conteudo.md) |
| 08 | [Credenciais (template)](docs-entrega/docs/08-credenciais.md) |

---

## Stack técnica

- **Next.js 15** com App Router + `output: 'export'`
- **React 19** + **TypeScript 5**
- **Tailwind CSS 3.4**
- **Google Fonts**: Archivo + IBM Plex Mono
- Deploy: qualquer host estático (recomendado: Vercel)

---

## Credenciais

As credenciais reais (Bling, banco, deploy) **não estão neste repositório** —
consulte o owner do projeto ou o ZIP privado de handoff. O template em
[`docs-entrega/docs/08-credenciais.md`](docs-entrega/docs/08-credenciais.md)
mostra onde cada chave é usada.

Em produção, use **variáveis de ambiente do host** (nunca `.env` commitado).

---

## Licença

Propriedade privada da R2R shop. Todos os direitos reservados.
