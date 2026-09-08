# 02 · Como rodar o site na sua máquina

## Pré-requisitos

1. **Node.js 20 ou superior** — instalar em https://nodejs.org (LTS)
2. Um terminal (PowerShell no Windows, Terminal no Mac)

Confirme que instalou:
```bash
node --version    # deve mostrar v20.x.x ou maior
npm --version     # deve mostrar 10.x.x ou maior
```

## Passo a passo

### 1. Extraia o ZIP
Se já extraiu, entre na pasta `r2r-shop-entrega/site/`:
```bash
cd caminho/para/r2r-shop-entrega/site
```

### 2. Instale as dependências
```bash
npm install
```
(demora 1-2 minutos na primeira vez, cria a pasta `node_modules/`)

### 3. Rode em modo desenvolvimento
```bash
npm run dev
```

Vai aparecer:
```
▲ Next.js 15.5.23
- Local:        http://localhost:3000
```

### 4. Abra o navegador
Acesse **http://localhost:3000**

Deve aparecer o site R2R shop com:
- Logo grande no topo do hero
- "Peça certa. Preço justo."
- Grid de categorias
- Produtos em destaque
- Footer com marca

### 5. Para parar
Pressione `Ctrl + C` no terminal.

---

## Se quiser gerar o build estático (HTML puro)

```bash
npm run build
```

Cria a pasta `out/` com todos os arquivos HTML. Você pode enviar essa pasta
para qualquer host de arquivos estáticos (S3, Cloudflare Pages, hospedagem tradicional).

A pasta `build-pronto/` que veio no ZIP é exatamente isso — só que já gerado.

---

## Problemas comuns

**"npm install" falha com erro de permissão (Windows)**
Rode o PowerShell como Administrador uma vez, ou use `npx` para tudo.

**"port 3000 already in use"**
Outro programa está usando a porta. Mude para outra:
```bash
npm run dev -- -p 3001
```

**A página abre mas fica em branco**
Aperte `Ctrl + F5` (recarregar ignorando cache). Se persistir, deleta a pasta
`.next/` e roda `npm run dev` de novo.
