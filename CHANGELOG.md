# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.1] - 2024-01-03

### Adicionado
- Configuração do ambiente para integração com Nuvemshop API
- Arquivo `.env.local` e `.env.example` com variáveis necessárias
- Estrutura de pastas completa seguindo arquitetura definida
- Configuração do Axios com:
  - Rate limiting (2 requisições por segundo)
  - Headers de autenticação Bearer Token
  - Interceptors para loading global
  - Tratamento de erros 429 (rate limit exceeded)
- Script `type-check` no package.json
- Estrutura de diretórios para e-commerce:
  - `/components/{product,cart,checkout,category,common}`
  - `/components/{atoms,molecules,organisms}` (Atomic Design)
  - `/services/nuvemshop`
  - `/app/{produtos,produto,carrinho,checkout,conta,busca}`

### Modificado
- `src/services/api.ts` - Adaptado para Nuvemshop API
- `src/middleware.ts` - Corrigido warnings de lint
- `package.json` - Adicionado script type-check

### Corrigido
- Erros de lint em `api.ts` e `middleware.ts`
- Warnings de tipos não utilizados

## [0.1.0] - 2024-01-03

### Adicionado
- Estrutura inicial do projeto Next.js 15 com TypeScript
- Configuração de styled-components + Tailwind CSS
- Documentação completa (README.md, ARCHITECTURE.md, DEVELOPMENT_PLAN.md)
- Configuração de Docker e docker-compose
- Setup de linting com ESLint e Husky
- Contextos base (Auth e Loader)
- Componentes iniciais (Header, Footer, Spinner)
- Integração com Storybook