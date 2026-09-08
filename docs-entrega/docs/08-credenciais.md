# 08 · Credenciais e chaves (template)

> ⚠️ **Este arquivo é o TEMPLATE público do repositório.**
> As chaves reais estão fora do git — pergunte ao owner do projeto
> ou consulte o ZIP privado de handoff.

---

## Site (`admin/`)

**Não usa credenciais.** É estático, funciona sozinho.

---

## Painel admin Bling (`bot-admin/`)

Copie estas linhas para o arquivo `bot-admin/.env.local` **substituindo pelos valores reais**:

```env
DATABASE_URL=postgresql://USUARIO:SENHA@HOST/DB?sslmode=require&channel_binding=require

BLING_CLIENT_ID=<pedir ao owner>
BLING_CLIENT_SECRET=<pedir ao owner>
BLING_REDIRECT_URI=http://localhost:3002/api/bling/callback

ENCRYPTION_KEY=<32 bytes hex — gerar com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

---

## Contas de acesso (referência)

### Bling ERP
- **URL**: https://bling.com.br
- **Email da conta correta**: `<pedir-ao-owner>`
- **Aplicativo criado**: "Bot Expert Racing" (no Bling Developer Portal)
- **Client ID / Secret**: fora do git — pedir ao owner
- **Redirect URI cadastrada**: `http://localhost:3002/api/bling/callback`

### Banco Neon PostgreSQL
- **URL**: https://console.neon.tech
- **Projeto**: `ml-bot-expert`
- **Região**: AWS São Paulo (sa-east-1)
- **Plano**: grátis (500MB, mais que suficiente)
- **Tabelas**: `bling_accounts`, `bling_products`, `knowledge_base`, `ml_accounts`, `qa_history`, `webhook_events`
- **Connection string**: fora do git — pedir ao owner

### Vercel
- **Conta**: `henriquw334-3846s-projects`
- **Projeto ativo**: `r2r-shop`
- **URL atual**: https://r2r-shop.vercel.app
- **Deploy**: `cd admin && vercel --prod`

---

## Contas descartadas

- ❌ Bling — conta antiga usada em fase de teste, token removido do banco
- ❌ Mercado Livre "EXPERT.STORE" — app OAuth criado mas nunca conectado. Cliente decidiu não usar bot.

---

## Recomendações de segurança

1. **Nunca commite** o arquivo `.env` / `.env.local` (o `.gitignore` deste repo já protege).
2. Em produção, use **variáveis de ambiente do host** (Vercel Dashboard → Project → Settings → Environment Variables).
3. **Rotacione o Bling Client Secret** no painel do Bling Developer se suspeitar de vazamento.
4. **Gere nova ENCRYPTION_KEY** para cada ambiente (dev/staging/prod) — 32 bytes hex.
