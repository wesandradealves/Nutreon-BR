# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

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

[0.2.0]: https://github.com/nutreon/nutreon-br/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/nutreon/nutreon-br/releases/tag/v0.1.0