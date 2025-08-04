# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.4.3] - 2025-08-04

### Adicionado
- **Hook useApiRequest**: Centraliza lógica de chamadas API
  - Tratamento de erro padronizado
  - Loading state automático
  - Headers padrão configurados
  - Reduz duplicação de código

### Melhorado
- **useResendVerification**: Refatorado para usar useApiRequest
  - Removido axios em favor de fetch padronizado
  - Código reduzido de 52 para 43 linhas
  - Mantém mesma interface pública
- **useStoreAuth**: Refatorado para usar useApiRequest
  - Adicionada tipagem TypeScript adequada
  - Melhor tratamento de erros
  - Código mais limpo e consistente
- **useCustomerProfile**: Refatorado para usar useApiRequest
  - Código reduzido de 122 para 107 linhas
  - Tratamento de erro centralizado
  - Mantém estado de mensagem separado
- **API Client Unificado**: Criado api-client.ts para centralizar todas chamadas
  - Unifica APIs internas e externas em um único cliente
  - Interceptors globais para loading/spinner automático
  - Mantém rate limiting para API externa (Nuvemshop)
  - Suporta flag isExternal para escolher o cliente correto
  - Remove duplicação entre api.ts e useApiRequest

## [0.4.2] - 2025-08-03

### Corrigido
- **CSS Reset**: Ordem de carregamento do GlobalStyle ajustada
  - GlobalStyle movido para logo após ThemeProvider
  - Bullets de listas agora são removidos corretamente
  - Reset CSS sobrescreve estilos padrão do navegador

### Melhorado
- **Header**: Refatoração completa seguindo padrão Atomic Design
  - Estrutura HTML exata mantida conforme especificação
  - Ícones Font Awesome atualizados para versão 6
  - Cores centralizadas em `/src/styles/theme.ts`
  
### Removido
- Arquivos SCSS redundantes de cores e variáveis
- Styled.d.ts duplicado
- Cores hardcoded dos componentes
- api.ts antigo (substituído por api-client.ts unificado)

## [0.4.1] - 2025-08-03

### Adicionado
- **Sistema de Reenvio de Email de Verificação**
  - Endpoint `/api/auth/resend-verification` para solicitar novo email
  - Hook `useResendVerification` para gerenciar estado
  - Botão "Reenviar Email de Verificação" na página de conta
  - Use case `ResendVerificationEmailUseCase` com segurança aprimorada
  - Métodos `findByCustomerId` e `delete` no `IEmailVerificationRepository`
  - Tokens antigos são invalidados ao solicitar reenvio

### Corrigido
- **Middleware**: Páginas `/auth/verify-email` e `/auth/reset-password` agora são acessíveis independente do status de autenticação
  - Corrigido redirecionamento indevido que impedia verificação de email
  - Adicionadas rotas públicas no middleware

### Melhorado
- **UX de Verificação**: Feedback visual de sucesso/erro ao reenviar email
- **Segurança**: Mensagem genérica ao reenviar (não revela se email existe)
- **Performance**: Página de conta recarrega dados ao montar

### Técnico
- Hook `useCustomerProfile` atualizado para incluir reenvio
- Página `/conta` agora chama `checkAuth()` ao carregar
- Limpeza de logs de debug em produção

## [0.4.0] - 2025-08-03

### Adicionado
- **Sistema de Verificação de Email**: Fluxo completo de ativação de conta
  - Envio de email com link de verificação após cadastro
  - Página `/auth/verify-email` para processar token
  - Endpoint `/api/auth/verify-email` para validação
  - Proteção da página de conta para emails não verificados
  - Campo `verified` no banco de dados de clientes
  - Use case `VerifyEmailUseCase` para lógica de verificação
  - Repositório `PrismaEmailVerificationRepository`

### Alterado
- **Fluxo de Registro**: Removido login automático após cadastro
  - Usuário precisa verificar email antes de fazer login
  - Mensagem informativa sobre verificação de email
  - Formulário limpo após registro bem-sucedido
  - Sem redirecionamento automático

### Corrigido
- **Erro de Hidratação**: Página de conta com Material UI
  - Adicionado estado `isMounted` para garantir renderização cliente
  - Loading state enquanto componente não está pronto
  - Evita diferenças entre SSR e renderização do cliente

### Melhorado
- **Segurança**: Email verificado obrigatório para acessar conta
- **UX**: Mensagens claras sobre status de verificação
- **Fluxo de Autenticação**: Registro → Verificação → Login → Conta

### Técnico
- Migração `add_email_verification` aplicada ao banco
- Container atualizado com repositório de verificação
- Templates de email atualizados com link de verificação

## [0.3.9] - 2025-08-03

### Adicionado
- **Sistema de Sessões**: Tracking completo de sessões de usuário no banco de dados
  - Registro de login com IP e User Agent
  - Histórico de sessões mantido para auditoria
  - Logout marca sessão como inativa (não apaga)
  - Campos `isActive` e `loggedOutAt` na tabela sessions
  - Use cases `AuthenticateCustomerUseCase` e `LogoutCustomerUseCase` atualizados
  - Repositório `PrismaSessionRepository` para gerenciar sessões

### Corrigido
- **Erro de Hidratação**: Resolvido problema de diferença entre SSR e cliente
  - Adicionadas verificações `typeof window !== 'undefined'` no AuthContext
  - Header component atualizado para evitar diferenças de renderização
  - Estado inicial consistente entre servidor e cliente
- **Erros de TypeScript**: Corrigidos todos os erros de tipo
  - Removido uso de `any` explícito
  - Corrigido acesso a params em rotas dinâmicas
  - Tipos adequados em hooks e componentes

### Melhorado
- **Segurança**: Melhor rastreamento de sessões com informações de contexto
- **Auditoria**: Histórico completo de logins e logouts
- **Performance**: Eliminação de chamadas desnecessárias ao localStorage durante SSR

### Técnico
- Migração `add_session_tracking` aplicada ao banco
- Container atualizado com `SessionRepository` e use cases
- Endpoint `/api/customer/logout` atualizado para desativar sessão

## [0.3.8] - 2025-08-03

### Adicionado
- **Recuperação de Senha**: Sistema completo de recuperação de senha por email
  - Terceira aba "Recuperar Senha" na página `/auth`
  - Página `/auth/reset-password` para redefinir senha com token
  - Endpoints API `/api/auth/request-password-reset` e `/api/auth/reset-password`
  - Hook `usePasswordRecovery` para gerenciar estado
  - Template de email HTML profissional
  - Tokens seguros com expiração de 1 hora
  - Link "Esqueceu sua senha?" no formulário de login

### Corrigido
- **Chamada desnecessária de API**: Removida chamada automática para `/api/customer/me` ao carregar aplicação
  - Agora verifica apenas localStorage para estado inicial
  - API só é chamada quando necessário (login, páginas protegidas)
- **Formato de resposta da API**: Padronizado respostas dos endpoints de recuperação de senha
  - Adicionado campo `success` em todas as respostas
  - Corrigido erro no console ao enviar email de recuperação

### Melhorado
- **Performance**: Redução de chamadas desnecessárias à API
- **Segurança**: Sistema de recuperação não revela se email existe no banco
- **Hook usePasswordValidation**: Adicionado estado completo para validação de senhas
  - Força da senha com feedback visual
  - Validação em tempo real
  - Suporte para confirmação de senha

### Técnico
- Criada tabela `password_resets` no banco de dados
- Implementados use cases `RequestPasswordResetUseCase` e `ResetPasswordUseCase`
- Adicionado repositório `PrismaPasswordResetRepository`
- Atualizado `AuthContext` para verificar apenas dados locais no carregamento inicial

## [0.3.7] - 2025-08-03

### Corrigido
- **Loop Infinito**: Corrigido erro "Maximum update depth exceeded" na página de conta
  - Removido `formatPhone` das dependências do useEffect
  - Memoizado funções no hook `usePhoneFormat` com useCallback
  - Previne re-renderizações desnecessárias

### Técnico
- Funções utilitárias agora são memoizadas para melhor performance
- Dependências do useEffect otimizadas para evitar loops

## [0.3.6] - 2025-08-03

### Refatorado
- **Páginas de Autenticação**: Refatoração completa para usar hooks customizados
  - Página `/conta` agora usa `useCustomerProfile`, `usePhoneFormat` e `usePasswordValidation`
  - Página `/auth` agora usa `useAuthForm` para login e registro
  - Toda lógica de negócio movida dos componentes para hooks
  - Componentes agora são puramente apresentacionais

### Melhorado
- **Separação de Responsabilidades**: Componentes focados apenas em UI
- **Manutenibilidade**: Lógica centralizada em hooks reutilizáveis
- **Testabilidade**: Hooks podem ser testados isoladamente
- **Performance**: Menos re-renderizações desnecessárias

### Técnico
- Componentes reduzidos em ~60% de linhas de código
- Lógica de formatação, validação e chamadas API centralizadas
- Hooks integrados mantendo toda funcionalidade existente

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

[0.4.0]: https://github.com/nutreon/nutreon-br/compare/v0.3.9...v0.4.0
[0.3.9]: https://github.com/nutreon/nutreon-br/compare/v0.3.8...v0.3.9
[0.3.8]: https://github.com/nutreon/nutreon-br/compare/v0.3.7...v0.3.8
[0.3.7]: https://github.com/nutreon/nutreon-br/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/nutreon/nutreon-br/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/nutreon/nutreon-br/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/nutreon/nutreon-br/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/nutreon/nutreon-br/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/nutreon/nutreon-br/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/nutreon/nutreon-br/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/nutreon/nutreon-br/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/nutreon/nutreon-br/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/nutreon/nutreon-br/releases/tag/v0.1.0