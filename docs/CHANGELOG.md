# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.4.0] - 2025-01-20

### Corrigido

- **Testes Unitários**
  - Instalação das dependências @swc/core e @swc/jest para resolver erro de SWC binary
  - Correção dos testes de middleware removendo imports não utilizados
  - Ajuste nos testes de integração de acessibilidade
  - Tipagem correta dos mocks nos testes do layout
  - Todos os testes agora passam com sucesso (99 testes)

### Modificado

- **Dependências**
  - Adicionado @swc/core e @swc/jest ao package.json
  - Atualizado package-lock.json com novas dependências

### Testes

- Coverage mantido em 98.73% (middleware com 85.18% devido a limitações do ambiente)
- Todos os 99 testes passando com sucesso
- Testes de acessibilidade funcionando corretamente

## [0.3.0] - 2025-01-20

### Adicionado

- **Documentação Profissional do README**
  - Estrutura completa e profissional
  - Badges informativos
  - Guias de instalação e desenvolvimento
  - Documentação de arquitetura e padrões
  - Seções de testes, deploy e troubleshooting

- **Validação de Commits**
  - Documentação sobre padrões de commit [MONT-XXX]
  - Lista de palavras proibidas
  - Instruções de uso do commitlint e hooks

### Modificado

- **README.md**
  - Removidos emojis para manter profissionalismo
  - Corrigidos símbolos HTML
  - Melhor organização do conteúdo

## [0.2.0] - 2025-01-20

### Adicionado

- **Acessibilidade WCAG 2.1 AA**
  - Componente `SkipLink` para navegação por teclado
  - ARIA labels e roles em todos os componentes
  - Estrutura semântica HTML5 (main, section, nav, header)
  - Suporte completo para screen readers
  - Focus visible em todos elementos interativos
  - Textos alternativos e descrições para acessibilidade

- **Sistema de Testes Completo**
  - Testes unitários com 98.73% de cobertura
  - Testes de acessibilidade com jest-axe
  - Testes de regressão para componentes críticos
  - Testes de qualidade (DRY, padrões de código)
  - Testes de integração para fluxos completos
  - Testes do design pattern Atomic Design

- **Melhorias no Componente Button**
  - Propriedade `isLoading` com feedback visual
  - Suporte a `ariaLabel` customizado
  - Estados de loading com aria-busy
  - Melhor tratamento de disabled states

- **Hooks de Git Aprimorados**
  - Validação de formato de commit [MONT-XXX]
  - Bloqueio de palavras proibidas nos commits
  - Execução de testes com coverage no pre-commit
  - Integração com commitlint

### Modificado

- Layout principal com suporte a SkipLink
- Página Home com estrutura semântica completa
- ESLint configurado com regras mais rigorosas
- Husky atualizado para validações mais completas

### Documentação

- Adicionadas regras de acessibilidade no CLAUDE.md
- Documentação sobre testes obrigatórios
- Exemplos de implementação de componentes acessíveis

### Testes

- 80 novos testes adicionados
- Coverage aumentado de 75% para 98.73%
- Todos os componentes agora têm testes de acessibilidade

## [0.1.0] - 2025-01-20

### Adicionado

- **Setup Inicial do Projeto**
  - Next.js 15 com App Router
  - TypeScript em modo strict
  - Styled Components com registry SSR
  - Tailwind CSS configurado para dark mode
  - SCSS support

- **Estrutura de Pastas Atomic Design**
  - Components (atoms, molecules, organisms)
  - Contexts para gerenciamento de estado
  - Hooks customizados
  - Services para integração com API
  - Types centralizados
  - Utils para funções auxiliares

- **Componentes Base**
  - Button atom com variantes e tamanhos
  - PageWrapper para metadata SEO
  - Layout principal com dark mode

- **Configurações de Desenvolvimento**
  - ESLint com regras TypeScript strict
  - Prettier para formatação
  - Jest + React Testing Library
  - Husky + lint-staged para pre-commit
  - Variáveis de ambiente configuradas

- **Infraestrutura**
  - Middleware de autenticação
  - Hook useMetadata para SEO
  - Registry para Styled Components
  - Suporte a Framer Motion

### Configurado

- Git com credenciais locais
- Commits seguindo padrão [MONT-XXX]
- Dark mode como padrão
- Font Inter do Google Fonts

### Documentação

- CLAUDE.md com todas as regras do projeto
- README.md inicial do Next.js
- Documentação inline com TypeScript

### Testes

- Configuração inicial do Jest
- Primeiros testes do componente Button
- Setup para testes de acessibilidade

---

## Convenções

### Tipos de Mudança

- **Adicionado** - Funcionalidades novas
- **Modificado** - Mudanças em funcionalidades existentes
- **Corrigido** - Correções de bugs
- **Removido** - Funcionalidades removidas
- **Documentação** - Mudanças na documentação
- **Testes** - Adição ou modificação de testes
- **Performance** - Melhorias de performance
- **Segurança** - Correções de segurança

### Versionamento

- **MAJOR.MINOR.PATCH**
- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas de forma compatível
- **PATCH**: Correções de bugs compatíveis

[0.4.0]: https://github.com/montink/frontend/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/montink/frontend/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/montink/frontend/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/montink/frontend/releases/tag/v0.1.0
