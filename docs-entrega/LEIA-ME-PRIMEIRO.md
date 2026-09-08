# R2R shop — Entrega para o sócio

Olá! Este pacote contém tudo que você precisa para subir e manter o site
**R2R shop**. Leia esta página primeiro — em 3 minutos você entende o que
tem aqui e por onde começar.

---

## 📦 O que tem nesse ZIP

```
r2r-shop-entrega/
├── LEIA-ME-PRIMEIRO.md              ← você está aqui
├── site/                            ← código-fonte do site (Next.js 15)
├── build-pronto/                    ← HTML/CSS/JS já compilado (pode subir direto)
├── painel-admin-bling/              ← painel opcional pra conectar o Bling ERP
└── docs/
    ├── 01-visao-geral.md            ← contexto do projeto e o que já está pronto
    ├── 02-como-rodar-local.md       ← testar o site na sua máquina
    ├── 03-deploy-vercel.md          ← subir em produção (recomendado, grátis)
    ├── 04-deploy-outros-hosts.md    ← alternativas (Netlify, S3, hospedagem estática)
    ├── 05-deploy-base44.md          ← se o plano é usar Base44
    ├── 06-conectar-bling.md         ← integrar a nova conta Bling
    ├── 07-editar-conteudo.md        ← trocar textos, cores, produtos
    └── 08-credenciais.md            ← todas as credenciais em um só lugar
```

---

## 🚀 Onde começar (escolha um caminho)

### Cenário A — "Quero só ver o site funcionando em produção"
Você não precisa nem baixar nada extra:
1. Leia [docs/03-deploy-vercel.md](docs/03-deploy-vercel.md)
2. 5 minutos depois o site está no ar em `https://SEU-DOMÍNIO.vercel.app`

### Cenário B — "Quero rodar local antes de mexer em qualquer coisa"
1. Instale Node.js 20+ (nodejs.org)
2. Leia [docs/02-como-rodar-local.md](docs/02-como-rodar-local.md)

### Cenário C — "Vou hospedar no Base44"
1. Leia [docs/05-deploy-base44.md](docs/05-deploy-base44.md)
2. Use a pasta `build-pronto/` (HTML puro, sem Node necessário no servidor)

### Cenário D — "Preciso conectar o Bling ERP com a conta nova"
1. Leia [docs/06-conectar-bling.md](docs/06-conectar-bling.md)
2. Só use a pasta `painel-admin-bling/` — ela é o único componente que fala com o Bling

---

## 📌 O essencial em 30 segundos

- **Site**: 249 produtos, 8 categorias, botão "Ver no Mercado Livre" em cada produto que leva direto pra loja do cliente no ML.
- **Está no ar** (versão atual): https://r2r-shop.vercel.app
- **Tecnologia**: Next.js 15 estático → o `build-pronto/` roda em qualquer lugar que sirva arquivos HTML.
- **Sem banco de dados** (para o site) — tudo é estático. Só o painel de admin do Bling usa um banco Neon PostgreSQL na nuvem (já configurado, grátis).
- **Design** segue a guideline oficial R2R: off-white + grafite + laranja `#FF4E00`, tipografia Archivo + IBM Plex Mono.

---

## ⚠️ Segurança — importante

O arquivo `docs/08-credenciais.md` contém **todas as chaves e senhas** do projeto (Bling, Mercado Livre, banco Neon, Groq). Trate esse arquivo como confidencial:

- Não commite em GitHub público
- Não envie por WhatsApp/e-mail sem criptografia
- Quando subir em produção, use **variáveis de ambiente do host** (Vercel Dashboard → Settings → Environment Variables), não deixe as chaves no código

---

## 🆘 Dúvidas ou algo quebrou?

Se algum passo não funcionar, me chama. Também recomendo abrir uma sessão do
**Claude Code** apontando pra pasta do projeto e colar o `docs/01-visao-geral.md`
como primeira mensagem — o assistente entende todo o contexto e ajuda ponto
a ponto.
