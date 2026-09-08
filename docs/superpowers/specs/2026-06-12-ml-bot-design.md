# Design Spec: Bot de Respostas Automáticas para Mercado Livre

**Versão:** 1.0  
**Data:** 2026-06-12  
**Autor:** Brainstorming com cliente  
**Status:** Pendente de aprovação

---

## Visão Geral

Bot automatizado que responde perguntas de compradores no Mercado Livre em tempo real, usando IA generativa (Groq/Llama 3) contextualizada com descrição do produto e histórico de Q&As anteriores (RAG).

**Objetivo principal:** Reduzir tempo de resposta e aumentar automação, sem custos com API (Groq free tier).

**Caso de uso:** Seller recebe pergunta → ML dispara webhook → bot busca contexto → IA gera resposta → resposta postada no anúncio em <2 segundos.

---

## Requisitos Funcionais

### RF-1: Recepção de perguntas via webhook
- Bot expõe endpoint `POST /webhook/questions` que recebe notificações do ML em tempo real
- Cada webhook contém: question ID, seller ID, item ID (produto)
- Bot processa imediatamente ou falha com retry automático (max 3 tentativas)

### RF-2: Busca de contexto da pergunta
- Bot chama API do ML para trazer: texto completo da pergunta, descrição do produto
- Busca no banco local histórico de Q&As do mesmo produto
- Converte pergunta em embedding (Gemini) e busca as 3–5 Q&As mais similares via pgvector

### RF-3: Geração de resposta via IA
- Bot envia prompt estruturado para Groq (Llama 3.3 70B)
- Prompt inclui: sistema prompt (tone/regras), descrição do produto, contexto RAG, pergunta
- Recebe resposta em <1 segundo
- Valida tamanho (max 300 caracteres, limite do ML) e formata

### RF-4: Posting de resposta no ML
- Bot chama API do ML para postar a resposta no comentário original
- Falha → salva em fila para retry manual via painel admin
- Sucesso → salva Q&A no banco local

### RF-5: Aprendizado contínuo
- Cada Q&A respondida é armazenado com embedding
- Cliente pode editar respostas via painel → nova versão é embedida e entra na base
- Próximas perguntas similares usam essa base atualizada

### RF-6: Painel de administração
- **Conectar ML:** botão de OAuth para vincular conta do cliente
- **Instruções por produto:** campo customizável por item (ex: "mencionar frete grátis")
- **Histórico:** lista de Q&As respondidas, com opção de edição/revisão
- **Prompt do sistema:** campo para tone of voice e regras gerais
- **Status do bot:** últimas perguntas processadas, taxa de sucesso

---

## Requisitos Não-Funcionais

### RNF-1: Performance
- Resposta dentro de 2 segundos (webhook → answer posted)
- Groq responde em <1s, overhead do bot <1s

### RNF-2: Confiabilidade
- Webhook processado com retry (max 3 tentativas, backoff exponencial)
- Falha crítica → registra em logs + notifica via painel

### RNF-3: Segurança
- OAuth 2.0 para integração com ML (token armazenado encrypted)
- Webhook signature validation (HMAC-SHA256)
- Rate limiting no painel admin (1.000 req/hora por IP)
- Senhas do banco via variáveis de ambiente

### RNF-4: Escalabilidade
- Hostinger VPS (2 vCPU / 4 GB) suporta ~500 perguntas/dia sem problema
- Se escalar: migração para node cluster + PostgreSQL gerenciado é straightforward

### RNF-5: Custo
- Groq: gratuito (14.400 req/dia)
- Gemini embeddings: gratuito (1.500 req/min)
- Hostinger: ~R$60/mês
- Total operacional: ~R$60/mês, escalável até 10x volume

---

## Stack Tecnológico

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Linguagem** | Node.js 20 LTS + TypeScript | Leve, ótimo para I/O assíncrono |
| **Framework** | Fastify | Mais rápido que Express, webhook handler eficiente |
| **Banco de dados** | PostgreSQL 15 + pgvector | Relacional + busca vetorial na mesma instância |
| **IA generativa** | Groq API (Llama 3.3 70B) | Free tier: 14.400 req/dia, resposta <1s |
| **Embeddings** | Google Gemini text-embedding-004 | Free tier: 1.500 req/min, alta qualidade |
| **Frontend admin** | Next.js 15 (App Router) | SSR, integrado no mesmo servidor |
| **Autenticação ML** | OAuth 2.0 (MercadoLibre) | Padrão oficial, token auto-renova |
| **Hosting** | Hostinger VPS (2 vCPU / 4 GB / 60 GB SSD) | ~R$60/mês, suficiente para início |
| **Container** | Docker (opcional em prod) | Simplifica deploy na Hostinger |
| **Logging** | Winston (Node.js) | Logs estruturados, fácil debug |

---

## Arquitetura

### Fluxo de uma pergunta (passo a passo)

```
1. Comprador pergunta no anúncio
   ↓
2. ML envia webhook: POST /webhook/questions
   {
     "question_id": "q12345",
     "item_id": "MLB999",
     "seller_id": "user123"
   }
   ↓
3. Bot recebe webhook
   - Valida HMAC signature
   - Chama ML API: GET /questions/q12345 + /items/MLB999
   ↓
4. Bot busca contexto
   - Converte pergunta em embedding (Gemini)
   - Query em pgvector: SELECT * WHERE product_id = MLB999 
     ORDER BY embedding <-> new_embedding LIMIT 5
   ↓
5. Bot monta prompt
   - System prompt (tone, regras gerais)
   - Descrição do produto
   - Histórico das 3 Q&As mais similares
   - Pergunta atual
   ↓
6. Bot chama Groq
   - Envia prompt via API
   - Recebe resposta em <1s
   - Valida tamanho (max 300 chars)
   ↓
7. Bot posta resposta
   - POST /answers (ML API)
   - Sucesso → salva Q&A no banco + gera embedding
   - Falha → fila de retry
   ↓
8. Comprador recebe notificação
```

### Componentes do servidor (módulos)

```
bot-server/
├── src/
│   ├── webhooks/
│   │   ├── questions.ts      # Endpoint POST /webhook/questions
│   │   └── validator.ts      # HMAC + signature validation
│   ├── services/
│   │   ├── ml-api.ts         # Client para ML API (Bearer token)
│   │   ├── groq.ts           # Client para Groq (IA)
│   │   ├── gemini.ts         # Client para embeddings (Gemini)
│   │   ├── rag.ts            # RAG + pgvector search
│   │   └── queue.ts          # Retry queue pra falhas
│   ├── database/
│   │   ├── schema.sql        # Schema de tabelas
│   │   └── client.ts         # Pool de conexão PostgreSQL
│   ├── admin/                # Next.js painel admin
│   │   ├── pages/
│   │   │   ├── connect.tsx   # OAuth callback
│   │   │   ├── history.tsx   # Histórico Q&A
│   │   │   └── settings.tsx  # Config por produto + prompt
│   │   └── api/
│   │       ├── auth.ts       # OAuth flow
│   │       ├── questions.ts  # CRUD de Q&A
│   │       └── products.ts   # CRUD de instruções por produto
│   ├── lib/
│   │   ├── logger.ts         # Winston
│   │   ├── env.ts            # Validação de env vars
│   │   └── crypto.ts         # Encrypt/decrypt de tokens
│   └── main.ts               # Entry point, inicializa server
├── docker-compose.yml        # PostgreSQL + pgvector local
└── package.json
```

---

## Modelo de Dados (PostgreSQL)

### Tabela: `ml_credentials`
```sql
CREATE TABLE ml_credentials (
  id SERIAL PRIMARY KEY,
  seller_id TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```
**Propósito:** Armazenar tokens OAuth do ML (encrypted em disk).

---

### Tabela: `products`
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,  -- ml_item_id
  seller_id TEXT NOT NULL,
  ml_item_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  custom_instructions TEXT,  -- Instruções específicas do cliente
  system_prompt TEXT,        -- Tone of voice global
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (seller_id) REFERENCES ml_credentials(seller_id),
  INDEX (seller_id)
);
```
**Propósito:** Cachear metadados do produto + armazenar customizações por item.

---

### Tabela: `qa_history`
```sql
CREATE TABLE qa_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  ml_question_id TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  embedding vector(768),      -- Embedding da pergunta (Gemini)
  status TEXT DEFAULT 'success',  -- success, failed, pending_review
  answered_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX (product_id, answered_at),
  INDEX USING ivfflat (embedding vector_cosine_ops)  -- pgvector index
);
```
**Propósito:** Histórico completo + base para RAG.

---

### Tabela: `webhook_logs`
```sql
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id TEXT NOT NULL,
  seller_id TEXT NOT NULL,
  question_id TEXT,
  status TEXT,  -- received, processing, success, failed
  error_message TEXT,
  attempts INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (seller_id) REFERENCES ml_credentials(seller_id),
  INDEX (seller_id, created_at)
);
```
**Propósito:** Debug + audit de webhooks recebidos.

---

## Fluxo de Autenticação (OAuth 2.0)

### Setup inicial (one-time)

1. Cliente acessa painel admin → página "Conectar Mercado Livre"
2. Clica botão "Autorizar" → redirecionado para ML com scopes:
   ```
   - read:account (informações da conta)
   - read:selling (ler anúncios)
   - write:questions (responder perguntas)
   - write:question_feedback (opcional)
   ```
3. ML retorna `code` para callback URL: `https://seu-bot.com/api/auth/callback`
4. Bot troca `code` por `access_token + refresh_token` (off-the-record)
5. Tokens salvos **encrypted** em `ml_credentials` com `expires_at`
6. Painel mostra "Conectado como [seller_name]"

### Renovação automática (a cada 6 horas)

- Bot agenda job que verifica `expires_at` a cada hora
- Se token expira em <1 hora, faz refresh automaticamente
- Nenhuma intervenção manual necessária

### Tratamento de erro

- Token expirado durante webhook → tenta refresh
- Refresh falha → marca webhook como `pending_retry`, notifica painel
- Cliente pode reconectar conta via painel

---

## Painel Admin (Next.js)

### Páginas

#### `/dashboard`
- Status geral: últimas 10 perguntas processadas
- Taxa de sucesso (% respostas postadas com sucesso)
- Tokens de quota Groq / Gemini restantes (estimado)
- Botão de reconexão ML

#### `/connect`
- Botão "Conectar com Mercado Livre"
- Redireciona para OAuth flow
- Callback aqui, salva token

#### `/history`
- Tabela: Data | Produto | Pergunta | Resposta gerada | Status
- Filtrar por data, produto, status
- Cada linha tem botão "Editar resposta"
- Botão "Marcar como spam" (não salva na base)

#### `/settings`
- **Prompt do sistema** (textarea): instruções globais
  ```
  Ex: "Você é um atendente amigável. Sempre mencione frete grátis 
       acima de R$100. Nunca ofereça desconto sem autorização."
  ```
- **Instruções por produto** (tabela)
  - Item | Instruções customizadas
  - Botão add/edit/delete

#### `/stats`
- Gráfico: perguntas por dia (últimos 30 dias)
- Top 5 produtos com mais perguntas
- Palavras mais frequentes nas perguntas

---

## Deployment

### Hostinger VPS Setup

1. **Criar VPS** (2 vCPU / 4 GB RAM / 60 GB SSD)
   - Recomendado: Ubuntu 22.04 LTS
   - SSH key cadastrada

2. **Instalação de dependências**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs postgresql postgresql-contrib
   npm install -g pm2
   ```

3. **Clone + setup**
   ```bash
   git clone <repo> /opt/ml-bot
   cd /opt/ml-bot
   npm install
   cp .env.example .env
   # Editar .env com credenciais
   ```

4. **Banco de dados**
   ```bash
   sudo -u postgres psql < docs/schema.sql
   npm run migrate
   ```

5. **Iniciar servidor com PM2**
   ```bash
   pm2 start dist/main.js --name ml-bot
   pm2 save
   pm2 startup
   ```

6. **SSL (Let's Encrypt)**
   ```bash
   sudo snap install certbot --classic
   sudo certbot certonly --standalone -d seu-bot.com
   # Renovação automática via cron
   ```

7. **Variáveis de ambiente**
   ```bash
   GROQ_API_KEY=gsk_...
   GEMINI_API_KEY=AI...
   ML_APP_ID=...
   ML_APP_SECRET=...
   ML_REDIRECT_URI=https://seu-bot.com/api/auth/callback
   DATABASE_URL=postgresql://user:pass@localhost:5432/ml_bot
   NODE_ENV=production
   JWT_SECRET=... (gerado)
   ```

---

## Considerações de Segurança

1. **Webhook signature validation:** Todo webhook recebido valida HMAC-SHA256
2. **Tokens encrypted:** Access/refresh tokens do ML armazenados com AES-256
3. **Rate limiting:** Painel admin com 1.000 req/hora por IP
4. **Environment vars:** Nenhuma secret em código
5. **Logs sanitizados:** Logs nunca incluem tokens completos
6. **HTTPS obrigatório:** Hostinger + Let's Encrypt

---

## Roadmap de Fases

### Fase 1 (MVP - 2-3 semanas)
- ✅ Webhook receiver funcionando
- ✅ Integração com Groq (resposta básica sem RAG)
- ✅ Posting de resposta no ML
- ✅ Banco de dados simples
- ✅ Painel admin mínimo (conectar ML + histórico)
- **Teste com 1–2 clientes piloto**

### Fase 2 (RAG - 1 semana após Fase 1)
- ✅ Integração com Gemini embeddings
- ✅ pgvector setup + busca semântica
- ✅ RAG engine na geração de respostas
- **Teste melhoria de qualidade**

### Fase 3 (Polish - 1 semana)
- ✅ Painel admin completo (settings, stats, edit respostas)
- ✅ Retry queue para falhas
- ✅ Email de notificação (falhas críticas)
- ✅ Logging estruturado

### Fase 4 (Escalabilidade - conforme demanda)
- ✅ Migração para Vercel (painel admin) + Railway (servidor bot)
- ✅ PostgreSQL gerenciado (Supabase / Neon)
- ✅ Monitoramento (Sentry, DataDog)

---

## Métricas de Sucesso

1. **Tempo de resposta:** <2s do webhook até answer posted
2. **Taxa de acerto:** >85% de respostas úteis (avaliação manual ou feedback do cliente)
3. **Uptime:** >99%
4. **Custo mensal:** <R$100 (servidor + APIs gratuitas)
5. **Satisfação do cliente:** NPS >7

---

## Possíveis Problemas & Soluções

| Problema | Solução |
|----------|---------|
| Groq atinge limite diário (14.400 req) | Fallback para template resposta até reset diário |
| Pergunta muito longa, resposta excede 300 chars | Sumarizar via Groq ou truncar |
| Erro ao postar resposta no ML | Salvar em retry queue + notificar painel |
| Token ML expirado | Auto-refresh, fallback para reconectar |
| Pergunta está em idioma diferente (ex: inglês) | LLM responde no idioma da pergunta |

---

## Glossário

- **RAG:** Retrieval-Augmented Generation — busca contexto relevante antes de gerar resposta
- **Embedding:** Representação vetorial de um texto (768 dimensões)
- **pgvector:** Extensão PostgreSQL para busca vetorial (similarity search)
- **Webhook:** Notificação HTTP em tempo real (ML → Bot)
- **OAuth 2.0:** Padrão de autenticação / autorização seguro
- **Token refresh:** Renovação automática de credenciais expiradas

---

## Próximos Passos (após aprovação)

1. Invocar skill `writing-plans` para criar plano de implementação detalhado
2. Setup do repositório Git + estrutura de diretórios
3. Iniciar Fase 1 (MVP) com tarefas em backlog
