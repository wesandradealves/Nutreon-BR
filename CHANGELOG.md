# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

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

[0.3.0]: https://github.com/nutreon/nutreon-br/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/nutreon/nutreon-br/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/nutreon/nutreon-br/releases/tag/v0.1.0