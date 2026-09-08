# 06 · Conectar o Bling ERP (opcional)

Este passo é **opcional** — o site funciona sem Bling. Você só precisa disso se
quiser, no futuro, sincronizar os produtos direto do Bling em vez de manter o
arquivo `products.json` manual.

## O que já está pronto

- Aplicativo Bling **"Bot Expert Racing"** já criado no Developer Bling
  - Client ID: `<pedir-ao-owner>`
  - Client Secret: guardado em `painel-admin-bling/.env.local.example`
- Painel admin que faz o OAuth com o Bling (pasta `painel-admin-bling/`)
- Banco Neon PostgreSQL configurado (grátis) que guarda o token criptografado

## Conta Bling correta

A integração deve ser feita com a conta **oficial do cliente** — pedir credenciais
e email ao owner do projeto. A conta antiga usada em fase de teste foi descartada.

## Passo a passo

### 1. Instalar o painel
```bash
cd painel-admin-bling
npm install
```

### 2. Configurar o `.env.local`
Copie o arquivo `.env.local.example` para `.env.local`:
```bash
cp .env.local.example .env.local
```

Abra `.env.local` e preencha os valores (todos estão em `docs/08-credenciais.md`):
```
DATABASE_URL=postgresql://...
BLING_CLIENT_ID=<pedir-ao-owner>
BLING_CLIENT_SECRET=... (ver docs/08-credenciais.md)
BLING_REDIRECT_URI=http://localhost:3002/api/bling/callback
ENCRYPTION_KEY=... (ver docs/08-credenciais.md)
```

### 3. Rodar o painel
```bash
npm run dev
```

Abre em `http://localhost:3002`.

### 4. Autorizar Bling

1. **Antes de clicar em qualquer coisa**, abra `bling.com.br` em outra aba
2. Faça login com **o email oficial do cliente (pedir ao owner)**
3. Volte para `http://localhost:3002/connect`
4. Clique no botão coral **"🔗 Conectar Bling"**
5. O Bling vai pedir para autorizar o app "Bot Expert Racing" — clique em **Autorizar**
6. Volta para a página `/connect` com o status **✓ Ativo**

### 5. Testar a integração

Acesse `http://localhost:3002/api/bling/test?q=polia` no navegador — deve
retornar JSON com os produtos que o Bling encontrou.

## O que fazer com a integração depois

O painel apenas **prova** que a integração funciona. Para **usar os produtos do
Bling no site** você precisa desenvolver um pipeline separado — normalmente:

1. Script que roda periodicamente (via cron/GitHub Actions)
2. Puxa todos os produtos do Bling via API
3. Gera novo `site/src/data/products.json`
4. Faz commit e redeploy do site

Esse pipeline **ainda não existe** — é uma evolução futura. Por enquanto,
o `products.json` é editado manualmente.

## Domínio de produção (importante)

O `BLING_REDIRECT_URI` no `.env.local` é `http://localhost:3002/...` — só
funciona rodando local. Se você quiser hospedar o painel admin em produção
(ex: `painel.r2rshop.com.br`):

1. Atualize `BLING_REDIRECT_URI=https://painel.r2rshop.com.br/api/bling/callback`
2. No painel do Bling Developer, adicione essa URL como redirect autorizada
3. Reautorize a conta Bling
