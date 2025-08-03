# Nutreon - E-commerce Headless com Nuvemshop

Aplicação e-commerce moderna construída com Next.js, TypeScript e integração completa com a API da Nuvemshop. Oferece uma experiência de compra rápida e responsiva com checkout otimizado.

## 🚀 Stack Tecnológica

- **Framework:** Next.js 15.3.3 + React 19.0.0
- **TypeScript:** 5.x
- **Arquitetura:** Domain-Driven Design (DDD)
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **Autenticação:** JWT com cookies HTTPOnly
- **Estilização:** Styled Components 6.1.19 + Tailwind CSS 3.4.1
- **Animações:** Framer Motion 11.5.4
- **HTTP Client:** Axios 1.8.4
- **UI Components:** Material-UI 7.0.0 + Nimbus Design System
- **Ícones:** React Icons 5.5.0 + Heroicons 2.2.0
- **Gerenciamento de Estado:** Context API
- **Formulários:** React Hook Form 7.58.1 + Zod
- **E-commerce:** Integração Nuvemshop API v1
- **Email:** Nodemailer com templates HTML
- **Validação:** Zod schemas
- **Containerização:** Docker + Docker Compose

## 📋 Sumário
- [Visão Geral](#visão-geral)
- [Features](#features)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração Nuvemshop](#configuração-nuvemshop)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Deploy](#deploy)

## 🎯 Visão Geral

Nutreon é uma solução e-commerce headless que combina a robustez da API Nuvemshop com a performance e flexibilidade do Next.js. O projeto segue arquitetura Domain-Driven Design (DDD) com separação clara de responsabilidades, autenticação JWT segura, BFF (Backend for Frontend) para otimização de chamadas API, componentes reutilizáveis, estado global gerenciado via Context API e integração completa com OAuth 2.0.

## ✨ Features

### E-commerce Completo
- 🛍️ Catálogo de produtos com filtros e busca
- 🏷️ Categorias hierárquicas
- 🛒 Carrinho de compras persistente
- 💳 Checkout multi-etapas
- 📦 Cálculo de frete integrado
- 🎟️ Sistema de cupons de desconto
- 💰 Múltiplas formas de pagamento (Cartão, Boleto, Pix)
- 👤 Área do cliente com histórico de pedidos

### Técnicas
- ⚡ Server Side Rendering (SSR)
- 📱 Design responsivo mobile-first
- 🔍 SEO otimizado
- 🌐 Suporte multi-idioma (pt, es, en)
- 🔐 Autenticação JWT + OAuth 2.0
- ✉️ Verificação de email obrigatória
- 🔄 Recuperação de senha por email
- 📊 Tracking de sessões de usuário
- 👤 Sistema completo de gestão de clientes
- 📊 Rate limiting automático
- 🎨 Tema customizável
- ♿ Acessibilidade (WCAG 2.1)
- 🏗️ Arquitetura DDD com camadas isoladas
- 🔄 BFF Pattern para otimização de APIs
- 📧 Sistema de emails transacionais
- 🛡️ Middlewares de segurança e validação

## 📋 Requisitos

- Node.js >= 18.x
- npm, yarn, pnpm ou bun
- PostgreSQL 14+ (ou usar Docker Compose incluído)
- Conta de parceiro Nuvemshop
- Docker (opcional, mas recomendado)

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nutreon.git
cd nutreon

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o banco de dados com Docker
docker-compose up -d postgres

# Execute as migrações do banco
npx prisma migrate dev

# Execute em modo desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🔧 Configuração Nuvemshop

### 1. Criar Aplicação no Painel de Parceiros

1. Acesse o [Painel de Parceiros Nuvemshop](https://partners.nuvemshop.com.br)
2. Crie uma nova aplicação
3. Escolha o tipo "Aplicação Externa (Standalone)"
4. Configure a URL de callback: `http://localhost:3000/callback`

### 2. Configurar Variáveis de Ambiente

```env
# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/nutreon

# Autenticação JWT
JWT_SECRET=sua_chave_secreta_segura_aqui
JWT_EXPIRATION=7d
SALT_ROUNDS=10

# Nuvemshop OAuth
NEXT_PUBLIC_NUVEMSHOP_CLIENT_ID=seu_client_id_aqui
NEXT_PUBLIC_NUVEMSHOP_CLIENT_SECRET=seu_client_secret_aqui
NEXT_PUBLIC_NUVEMSHOP_REDIRECT_URI=http://localhost:3000/callback
NEXT_PUBLIC_NUVEMSHOP_STORE_ID=id_da_loja_demo

# Nuvemshop API
NUVEMSHOP_ACCESS_TOKEN=token_de_acesso_aqui
NEXT_PUBLIC_NUVEMSHOP_USER_ID=user_id_aqui
NEXT_PUBLIC_NUVEMSHOP_API_URL=https://api.tiendanube.com
NEXT_PUBLIC_NUVEMSHOP_API_VERSION=v1

# Aplicação
NEXT_PUBLIC_APP_NAME=Nutreon
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CURRENCY=BRL
NEXT_PUBLIC_LOCALE=pt-BR

# Email (Desenvolvimento usa conta de teste)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=gerado_automaticamente
EMAIL_PASS=gerado_automaticamente
EMAIL_FROM="Nutreon <noreply@nutreon.com.br>"

# Pagamento (opcional)
NEXT_PUBLIC_PAYMENT_GATEWAY=mercadopago
PAYMENT_SECRET_KEY=chave_secreta_gateway
```

### 3. Obter Token de Acesso

1. Execute a aplicação: `npm run dev`
2. Acesse: `http://localhost:3000/setup` (configuração inicial)
3. Configure o token de acesso da Nuvemshop
4. Ou acesse: `http://localhost:3000/auth` para OAuth
5. O token será salvo e gerenciado automaticamente pelo Token Manager

## 💻 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev         # Inicia servidor de desenvolvimento
npm run build       # Build de produção
npm run start       # Inicia servidor de produção
npm run lint        # Executa linter
npm run type-check  # Verifica tipos TypeScript

# Banco de Dados
npm run db:migrate  # Executa migrações
npm run db:studio   # Abre Prisma Studio (GUI)
npm run db:seed     # Popula banco com dados de teste

# Storybook
npm run storybook   # Inicia Storybook
npm run build-storybook # Build do Storybook

# Docker
docker-compose up   # Inicia todos os serviços
docker-compose up -d postgres # Inicia apenas PostgreSQL
docker-compose down # Para containers
```

### Padrões de Código

O projeto segue padrões rigorosos documentados em `ARCHITECTURE.md` e `DEVELOPMENT_PROMPT.md`:

- **Arquitetura:** Domain-Driven Design (DDD) com 4 camadas
- **Componentes:** 3 arquivos (componente.tsx, styles.tsx, typo.ts)
- **Estilização:** Styled Components + Tailwind CSS
- **Estado:** Context API para estado global
- **BFF:** Backend for Frontend para otimização de APIs
- **Services:** Camada de abstração para API
- **TypeScript:** Tipagem completa, evitar `any`
- **Validação:** Zod schemas em todas as entradas
- **Segurança:** JWT + cookies HTTPOnly + middlewares
- **Commits:** Convenção em português

## 📁 Estrutura do Projeto

```
src/
├── app/                        # Next.js App Router
│   ├── api/                   # API Routes (BFF)
│   │   ├── auth/             # Endpoints de autenticação
│   │   ├── customer/         # Gestão de clientes
│   │   ├── products/         # Produtos Nuvemshop
│   │   └── categories/       # Categorias
│   ├── (home)/               # Página inicial
│   ├── login/                # Login de clientes
│   ├── conta/                # Área do cliente
│   └── setup/                # Configuração inicial
├── core/                      # Núcleo DDD
│   ├── domain/               # Camada de domínio
│   │   ├── entities/        # Entidades (Customer, etc)
│   │   ├── value-objects/   # Email, Phone, Address
│   │   ├── repositories/    # Interfaces de repositórios
│   │   └── services/        # Serviços de domínio
│   ├── application/          # Camada de aplicação
│   │   ├── use-cases/       # Casos de uso
│   │   ├── dtos/            # Data Transfer Objects
│   │   └── interfaces/      # Interfaces de serviços
│   └── infrastructure/       # Camada de infraestrutura
│       ├── repositories/     # Implementações Prisma
│       ├── services/         # JWT, Bcrypt, etc
│       ├── email/            # Templates e envio
│       ├── middleware/       # Auth, error handling
│       └── container/        # Injeção de dependências
├── components/               # Componentes React
│   ├── auth/                # ProtectedRoute, etc
│   ├── header/              # Header com auth status
│   └── common/              # Componentes comuns
├── context/                  # Contextos globais
│   └── auth.tsx             # Estado de autenticação
├── lib/                      # Bibliotecas e clientes
│   ├── nuvemshop-client.ts  # Cliente API Nuvemshop
│   └── nuvemshop-token-manager.ts # Gestão de tokens
├── hooks/                    # Custom hooks
│   └── useBFF.ts            # Hook para chamadas BFF
├── utils/                    # Funções utilitárias
└── types/                    # Definições TypeScript
```

## 🏗️ Arquitetura

### Domain-Driven Design (DDD)

O projeto segue arquitetura DDD com 4 camadas bem definidas:

1. **Domain Layer**: Regras de negócio puras
   - Entities, Value Objects, Domain Services
   - Sem dependências externas

2. **Application Layer**: Orquestração de casos de uso
   - Use Cases, DTOs, Application Services
   - Coordena operações de domínio

3. **Infrastructure Layer**: Implementações técnicas
   - Repositórios, serviços externos, email
   - Integração com frameworks e bibliotecas

4. **Presentation Layer**: Interface com usuário
   - API Routes, páginas, componentes React
   - Controllers e views

### Fluxo de Dados

```mermaid
graph TD
    A[Cliente React] --> B[BFF API Routes]
    B --> C[Use Cases]
    C --> D[Domain Services]
    C --> E[Repositories]
    E --> F[PostgreSQL]
    B --> G[Nuvemshop Client]
    G --> H[Nuvemshop API]
    C --> I[Email Service]
    I --> J[SMTP Server]
```

### Contextos Principais

1. **AuthContext**: Gerencia autenticação JWT/OAuth
   - Login/logout de clientes
   - Estado de autenticação
   - Verificação de email
   - Tracking de sessões

### Fluxo de Autenticação de Clientes

1. **Registro**:
   - Cliente se cadastra com email e senha
   - Sistema envia email de verificação
   - Conta criada mas não ativa

2. **Verificação de Email**:
   - Cliente clica no link do email
   - Token validado (expira em 24h)
   - Conta ativada para login

3. **Login**:
   - Apenas contas verificadas
   - Geração de JWT token
   - Sessão registrada no banco

4. **Recuperação de Senha**:
   - Solicitação por email
   - Link com token (expira em 1h)
   - Nova senha e logout automático

### BFF (Backend for Frontend)

O projeto implementa o padrão BFF para otimizar chamadas à API:

- **Centralização**: Token management unificado
- **Otimização**: Reduz chamadas do cliente
- **Segurança**: Tokens não expostos ao frontend
- **Cache**: Gerenciamento inteligente de cache

### Services & Use Cases

#### Autenticação
- **RegisterCustomerUseCase**: Cadastro com validação completa e envio de email
- **AuthenticateCustomerUseCase**: Login seguro com JWT e tracking de sessão
- **VerifyEmailUseCase**: Verificação de email com token seguro
- **ChangePasswordUseCase**: Alteração de senha com logout automático
- **UpdateCustomerUseCase**: Atualização de dados pessoais
- **RequestPasswordResetUseCase**: Solicitação de recuperação de senha
- **ResetPasswordUseCase**: Redefinição de senha com token
- **LogoutCustomerUseCase**: Logout com desativação de sessão

#### Integração Nuvemshop
- **Products**: Busca e filtragem via BFF
- **Categories**: Navegação hierárquica
- **Store**: Informações da loja
- **Orders**: Pedidos e histórico

#### Infraestrutura
- **JwtTokenService**: Geração e validação de tokens
- **BcryptPasswordHasher**: Criptografia segura
- **NodemailerEmailService**: Emails transacionais
- **PrismaCustomerRepository**: Persistência de dados

## 🐳 Docker

### Build e Execução

```bash
# Build da imagem
docker build -t nutreon .

# Executar com docker-compose
docker-compose up -d

# Verificar logs
docker-compose logs -f

# Parar aplicação
docker-compose down
```

### Configuração Docker

O projeto inclui configuração completa para containerização:

```yaml
# docker-compose.yml inclui:
- PostgreSQL 14 com volume persistente
- Aplicação Next.js com hot reload
- Rede isolada para segurança
- Variáveis de ambiente configuráveis
```

Arquivos incluídos:
- `Dockerfile`: Multi-stage build otimizado
- `docker-compose.yml`: Orquestração completa
- `.dockerignore`: Otimização de build
- Scripts de inicialização do banco

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch main

### Outros Provedores

O projeto é compatível com qualquer plataforma que suporte Next.js:
- AWS Amplify
- Netlify
- Railway
- Render
- Google Cloud Run

### Variáveis de Produção

Certifique-se de atualizar as URLs para produção:

```env
NEXT_PUBLIC_NUVEMSHOP_REDIRECT_URI=https://seudominio.com/callback
NEXT_PUBLIC_APP_URL=https://seudominio.com
```

## 📚 Documentação Adicional

### Documentação do Projeto
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Guia completo de arquitetura e padrões
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - Plano de desenvolvimento detalhado

### Documentação Nuvemshop API

#### Recursos Principais
- [API Documentation](https://tiendanube.github.io/api-documentation/intro) - Documentação completa da API
- [Developer Portal](https://dev.nuvemshop.com.br) - Portal do desenvolvedor
- [Partner Panel](https://partners.nuvemshop.com.br) - Painel de parceiros
- [API Playground](https://tiendanube.github.io/api-documentation/playground) - Teste as APIs

#### Ferramentas
- [Nimbus Design System](https://nimbus.nuvemshop.com.br) - Sistema de design oficial
- [Nexo Framework](https://dev.nuvemshop.com.br/docs/developer-tools/nexo) - Framework de integração

#### Recursos da API
- [OAuth Authentication](https://dev.nuvemshop.com.br/docs/applications/authentication)
- [Products](https://tiendanube.github.io/api-documentation/resources/product)
- [Orders](https://tiendanube.github.io/api-documentation/resources/order)
- [Customers](https://tiendanube.github.io/api-documentation/resources/customer)
- [Categories](https://tiendanube.github.io/api-documentation/resources/category)
- [Checkout](https://tiendanube.github.io/api-documentation/resources/checkout)
- [Webhooks](https://tiendanube.github.io/api-documentation/webhooks)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js e Nuvemshop API**