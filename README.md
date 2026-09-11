# André Ribeiro Tattoo — GitHub + Vercel + Neon

Projeto completo com site público e painel CMS separado por rotas.

## 1. Subir no GitHub

Extraia o ZIP, crie um repositório vazio e envie todos os arquivos.

## 2. Criar o banco Neon

Crie um projeto no Neon e copie a variável `DATABASE_URL`. As tabelas são criadas automaticamente na primeira utilização. O arquivo `database/schema.sql` também pode ser executado no SQL Editor do Neon.

## 3. Importar na Vercel

Importe o repositório do GitHub na Vercel. O framework será identificado como Next.js. Em **Settings → Environment Variables**, adicione:

```env
DATABASE_URL=cole-a-connection-string-do-neon
ADMIN_USER=admin
ADMIN_PASSWORD=crie-uma-senha-forte
BLOB_READ_WRITE_TOKEN=token-do-vercel-blob
INSTAGRAM_ACCESS_TOKEN=
```

Crie um armazenamento **Vercel Blob** no projeto e conecte-o. A Vercel adicionará `BLOB_READ_WRITE_TOKEN` automaticamente. Ele armazena a foto do artista, a imagem de fundo da página inicial e as imagens das especialidades.

Depois de adicionar as variáveis, faça um novo deploy.

## 4. Acessar o CMS

Abra `/cms-login` no endereço publicado. Use o conteúdo de `ADMIN_USER` e `ADMIN_PASSWORD` configurado na Vercel.

## Rotas do CMS

- `/admin` — visão geral
- `/admin/aparencia` — logotipo, cores, SEO e imagem de fundo da página inicial
- `/admin/perfil` — foto, biografia e contatos
- `/admin/configuracoes` — textos, destaques e cartões da página inicial
- `/admin/especialidades` — estilos, explicações, exemplos e imagens individuais
- `/admin/atendimento` — etapas do atendimento
- `/admin/cuidados` — orientações
- `/admin/depoimentos` — avaliações
- `/admin/duvidas` — perguntas frequentes
- `/admin/instagram` — integração e portfólio
- `/admin/orcamentos` — pedidos recebidos
- `/admin/orcamento` — textos do formulário

## Desenvolvimento local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Preencha `.env.local` antes de testar banco, CMS e uploads.

## O que pode ser alterado sem mexer no código

- Identidade da marca e paleta de cores
- Imagem, enquadramento e escurecimento da capa
- Título e descrição exibidos nos buscadores
- Foto, biografia, contatos e redes sociais do artista
- Todos os textos e atalhos da página inicial
- Imagens e textos das especialidades
- Atendimento, cuidados, depoimentos e perguntas frequentes
- Integração do portfólio com o Instagram
- Conteúdo do formulário e acompanhamento dos orçamentos
