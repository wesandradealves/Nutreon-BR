# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.3.5] - 2025-08-03

### Adicionado
- **Hooks Customizados**: Criação de hooks para centralizar lógica de negócio
  - `usePhoneFormat` - Formatação e validação de telefones brasileiros
  - `usePasswordValidation` - Validação de senhas e força de senha
  - `useCustomerProfile` - Gerenciamento de perfil do usuário
  - `useAuthForm` - Lógica unificada para formulários de login/registro

### Melhorado
- **Separação de Responsabilidades**: Preparação para mover lógica dos componentes para hooks
- **Reutilização**: Lógica de formatação e validação agora compartilhada entre componentes
- **Manutenibilidade**: Código mais modular e testável

### Técnico
- Todos os hooks seguem o padrão de nomenclatura com prefixo `use`
- Hooks são client-side com diretiva 'use client'
- Integração completa com hooks existentes (useAuth, usePhoneFormat)

## [0.3.4] - 2025-08-03

### Corrigido
- **TypeScript**: Correção completa dos últimos erros de tipo
  - Tipados corretamente arquivos `products/[id]/route.ts` e `products/create-sample/route.ts`
  - Resolvido problema de tipos do JWT com cast explícito `as jwt.SignOptions`
  - Adicionado tratamento seguro para propriedades opcionais
- **Projeto agora com 0 erros TypeScript** 🎉

### Melhorado
- **Type Safety**: 100% do código agora está tipado corretamente
- **Imports JWT**: Mudança de `import * as jwt` para `import jwt` para melhor compatibilidade

### Técnico
- Todos os arquivos de API agora usam tipos específicos da Nuvemshop
- Projeto completamente type-safe sem uso de `any`
- Build e type-check passando sem erros

## [0.3.3] - 2025-08-03

### Corrigido
- **TypeScript**: Correção extensiva de erros de tipo em todo o projeto
  - Adicionados tipos genéricos ao `nuvemshopClient` 
  - Criados tipos específicos para API Nuvemshop (`NuvemshopProduct`, `NuvemshopCategory`, `NuvemshopStore`)
  - Corrigido acesso a propriedades protegidas em entidades DDD
  - Ajustados tipos `null` vs `undefined` para compatibilidade com Prisma
  - Corrigido uso de `ZodError.issues` (não `errors`)
  - Tratamento de `searchParams` nullable
- **Limpeza**: Removido cache `.next` para eliminar referências a arquivos deletados

### Melhorado
- **Types Nuvemshop**: Criado arquivo dedicado `nuvemshop.types.ts` com interfaces tipadas
- **Entidade Customer**: Adicionados métodos `updateName()` e `updatePhone()` para encapsular mudanças
- **API Routes**: Tipagem completa em rotas de categories, products e store

### Técnico
- Redução de erros TypeScript de 30+ para menos de 10
- Melhoria na type safety do projeto
- Maior consistência no tratamento de tipos da API Nuvemshop

## [0.3.2] - 2025-08-03

### Melhorado
- Refatoração DRY (Don't Repeat Yourself) extensiva para eliminar redundâncias
- Consolidação de componentes de autenticação (mantido apenas ProtectedRoute)
- Renomeação de hooks para maior clareza: `useAuth` → `useStoreAuth` (Nuvemshop)
- Criação de types centralizados em `/src/types`
  - `api.types.ts` - Types de resposta de API
  - `customer.types.ts` - Types de cliente/endereço
  - `auth.types.ts` - Types de autenticação
- Remoção de styled components vazios (footer, home)

### Removido
- `userService.ts` - serviço legado não utilizado
- `utils/index.ts` - arquivo vazio
- `auth-guard` - componente duplicado do ProtectedRoute
- Styled components vazios que apenas importavam sem estilização

### Refatorado
- Footer e HomePage agora usam elementos HTML diretos sem styled components vazios
- Hook `useAuth` renomeado para `useStoreAuth` para evitar confusão com autenticação de clientes

## [0.3.1] - 2025-08-03

### Corrigido
- **CRÍTICO**: Header de autenticação da API Nuvemshop corrigido para `Authentication` (não `Authorization`)
- Remoção de arquivos de teste e debug que não deveriam estar em produção
- Correção de imports de styles que foram removidos
- Limpeza de código não utilizado e redundante

### Removido
- APIs de debug e teste (/api/debug, /api/test, etc.)
- Componentes não utilizados (auth-guard)
- Hooks duplicados (useAuth antigo)
- Arquivos de estilo vazios

### Importante
- A API Nuvemshop usa o header `Authentication: bearer TOKEN` conforme documentação oficial
- Token deve ser configurado uma única vez no `.env.local`
- Usuários finais não precisam fazer OAuth, apenas o dono da loja

## [0.3.0] - 2025-08-03

### Adicionado
- Arquitetura completa Domain-Driven Design (DDD) com separação clara de camadas
  - Domain Layer: Entidades, Value Objects, Repositórios (interfaces) e Serviços de domínio
  - Application Layer: Use Cases, DTOs e interfaces de serviços
  - Infrastructure Layer: Implementações concretas, ORM, serviços externos
  - Presentation Layer: Controllers API e páginas
- Sistema robusto de autenticação JWT
  - Registro com validação completa de dados
  - Login com geração de tokens seguros
  - Gestão de sessão com cookies HTTPOnly
  - Refresh token automático
  - Logout com limpeza de sessão
- Value Objects para garantir integridade dos dados
  - Email com validação de formato
  - Phone com formatação brasileira
  - Address com validação de CEP
- Container de injeção de dependências (DI Container)
- Repositórios com Prisma ORM seguindo padrões DDD
- Use Cases implementando regras de negócio isoladas
- Sistema de notificações por email
  - Templates HTML responsivos
  - Email de boas-vindas personalizado
  - Notificação de login com detalhes de segurança
- Validação de dados com Zod schemas
- Middlewares customizados
  - Autenticação com verificação JWT
  - Tratamento global de erros
  - CORS configurado para segurança
- ESLint configurado para manter qualidade do código
- Hooks React customizados para integração com BFF
- Páginas protegidas com verificação de autenticação
- Componente ProtectedRoute para controle de acesso

### Melhorado
- Estrutura de pastas seguindo princípios DDD
- Separação clara de responsabilidades entre camadas
- Tipagem forte com TypeScript em todo o projeto
- Tratamento de erros padronizado com classes específicas
- Performance com lazy loading de componentes
- Reutilização de código com componentes compartilhados

### Modificado
- Migração completa da arquitetura MVC para DDD
- Refatoração de todos os endpoints para usar Use Cases
- Atualização da estrutura de autenticação para padrão DDD

### Segurança
- Implementação de Value Objects para validação de dados sensíveis
- Criptografia de senhas com salt rounds configuráveis
- Tokens JWT com expiração configurável
- Validação em múltiplas camadas (frontend e backend)
- Proteção contra injeção SQL com Prisma ORM

## [0.2.0] - 2025-08-03

### Adicionado
- Sistema completo de autenticação de clientes com JWT
- Arquitetura DDD (Domain-Driven Design) com camadas bem definidas
- Banco de dados PostgreSQL com Prisma ORM
- Docker Compose para ambiente de desenvolvimento
- Sistema de envio de emails com Nodemailer
  - Email de boas-vindas ao cadastrar
  - Notificação de login com IP e dispositivo
- Páginas de autenticação (login/cadastro)
- Área do cliente com edição de dados pessoais
- Alteração de senha com logout automático
- Máscara de telefone brasileiro
- Middleware de proteção de rotas
- BFF (Backend for Frontend) para integração com Nuvemshop API
- Token Manager para gerenciamento centralizado de tokens

### Melhorado
- Context API para gerenciamento de estado de autenticação
- Header dinâmico mostrando status de login
- Validação de formulários com react-hook-form
- Tratamento de erros padronizado
- Responsividade em todas as páginas

### Corrigido
- Problema de CORS com chamadas diretas à API
- Compatibilidade de máscaras com React 19
- Sincronização de dados após atualização

### Segurança
- Cookies HTTPOnly para tokens JWT
- Hash de senha com bcrypt
- Validação de entrada com Zod
- Proteção contra acesso não autorizado

## [0.1.0] - 2025-08-02

### Adicionado
- Estrutura inicial do projeto Next.js
- Integração OAuth 2.0 com Nuvemshop
- Configuração básica do ambiente
- Documentação inicial

[0.3.1]: https://github.com/nutreon/nutreon-br/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/nutreon/nutreon-br/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/nutreon/nutreon-br/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/nutreon/nutreon-br/releases/tag/v0.1.0