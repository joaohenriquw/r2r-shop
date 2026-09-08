# 03 · Deploy no Vercel (recomendado, grátis)

Vercel é a plataforma dos criadores do Next.js. **Grátis** para uso comercial pequeno,
com CDN global e HTTPS automático. É a forma mais rápida.

## Opção A — Deploy pelo painel web (mais visual)

1. Crie conta em https://vercel.com/signup (login com Google/GitHub facilita)
2. Suba a pasta `site/` para um repositório no GitHub (privado)
3. No dashboard do Vercel, clique **"Add New… → Project"**
4. Selecione o repositório
5. Framework: já detecta **Next.js** automaticamente
6. Root Directory: `site/` (se subiu tudo)
7. Clique em **Deploy**

Em ~2 minutos o site está no ar em `https://SEU-PROJETO.vercel.app`.

## Opção B — Deploy pelo terminal (mais rápido, sem GitHub)

1. Instale a CLI:
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```
(cola o link que ele mostra no navegador)

3. Entre na pasta:
```bash
cd caminho/para/r2r-shop-entrega/site
```

4. Deploy:
```bash
vercel --prod
```

Responde:
- **Set up and deploy?** Yes
- **Which scope?** sua conta
- **Link to existing project?** No (é a primeira vez)
- **What's your project's name?** `r2r-shop` (ou qualquer nome)
- **In which directory is your code located?** `./`

Em ~2 minutos vem o link `https://r2r-shop-XXXX.vercel.app`.

## Domínio customizado (opcional)

Se você comprar um domínio (`r2rshop.com.br`, `r2rshop.com`, etc):

1. No painel do Vercel: **Project → Settings → Domains**
2. Adicione o domínio
3. O Vercel te dá 2 registros DNS para configurar no seu registrador (Registro.br, GoDaddy, etc)
4. HTTPS é automático (Vercel gera o certificado SSL grátis)

Custo do domínio `.com.br`: ~R$ 40/ano no Registro.br.

## Cada atualização de código

Se você usou **Opção A (GitHub)**: qualquer `git push` faz redeploy automático.

Se você usou **Opção B (CLI)**: rode `vercel --prod` de novo na pasta `site/`.

## Preço

- **Grátis** para uso comercial pequeno
- Limite: 100GB de banda por mês
- Se passar disso, plano Pro é USD 20/mês
- O site R2R shop deve caber tranquilamente no grátis por muito tempo
