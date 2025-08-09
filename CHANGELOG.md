# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

## [0.15.1] - 2025-01-10

### Corrigido
- **Sincronização de Quantidade no Carrinho**: Quantidade agora sincronizada entre todos os componentes
  - ProductCard mostra quantidade real do carrinho
  - Página de produto mostra quantidade real do carrinho
  - Drawer, carrinho e produtos agora sempre sincronizados
  - Adicionada função `getProductQuantity` ao contexto do carrinho
  - useEffect para atualização automática quando carrinho muda

## [0.15.0] - 2025-01-10

### Adicionado
- **Sistema de Favoritos no Carrinho**: Botão de favoritar em itens do carrinho
  - Implementado tanto no CartDrawer quanto na página de carrinho
  - Integração com contexto de favoritos existente
  - Componente FavoriteToggle reutilizável (Atomic Design)

- **Métricas de Qualidade de Código**: Sistema de monitoramento de qualidade
  - Métricas mínimas estabelecidas (nota geral: 8.8/10)
  - Checklist obrigatório antes de commits
  - Red flags para correção imediata
  - Documentado em Claude.md

### Melhorado
- **Refatoração DRY Massiva**: Eliminação de código duplicado
  - Hook `useFavoriteActions` centraliza toda lógica de favoritos
  - Componente `QuantityControls` unifica controles de quantidade
  - Eliminada duplicação em 3+ arquivos diferentes
  
- **Performance**: Otimizações com useCallback
  - Todas funções inline convertidas para callbacks memoizados
  - Prevenção de re-renders desnecessários
  - Página de produto completamente otimizada

- **Consistência de UI**: Padronização de componentes
  - BuyButton consistente em toda aplicação
  - Botões seguem mesmo estilo visual (shadow-box effect)
  - Styled Components sem tags HTML diretas (100% compliance)

- **SEO e Metadata**: Padronização de títulos
  - Formato unificado: "Página - Nutreon BR"
  - Descrições relevantes para todas as páginas
  - Keywords apropriadas para busca

### Corrigido
- **Toast Duplicado**: Mensagens de favoritos apareciam 2x
  - Removido toast redundante em useFavoriteActions
  - Mantido apenas no hook original useFavorites

- **Imports Não Utilizados**: Limpeza completa
  - Removidas importações desnecessárias
  - Build sem warnings de ESLint

## [0.14.0] - 2025-01-10

### Adicionado
- **Página de Detalhes do Produto**: Implementação completa da página de produto
  - Integração com API `/api/products/[handle]` usando handle dinâmico
  - Galeria de imagens com miniaturas
  - Cálculo de frete integrado
  - Breadcrumb dinâmico com categorias
  - Tabs de descrição e detalhes
  - Produtos relacionados
  - Sistema de favoritos integrado
  - Adicionar ao carrinho com seletor de quantidade
  - SEO dinâmico com metadata do produto

### Melhorado
- **Qualidade de Código e DRY**: Refatoração para eliminar duplicação
  - Unificação de constantes AUTH_TOKEN (removida duplicação)
  - Remoção de função formatPrice redundante (usar apenas formatCurrency)
  - ProductCard usando constante IMAGES.PRODUCT_PLACEHOLDER
  - QuantitySelector refatorado para usar apenas classes Tailwind

### Corrigido
- **Tipagem TypeScript**: Eliminação de uso de `any`
  - Tipos adequados e específicos em todas as funções
  - Uso de tipagem centralizada em `src/types/`
  - Correção de tipos do Prisma vs tipos do frontend
  - Build limpo sem erros de TypeScript

- **Componentes React**: Correções de compatibilidade
  - Remoção de `legacyBehavior` deprecado do Link
  - Correção de erro de hidratação (nested `<a>` tags)
  - BreadcrumbLink mudado de `styled.a` para `styled.span`

- **Sistema de Email**: Atualização de credenciais e templates
  - Novas credenciais Ethereal configuradas
  - Correção do caminho do logo nos templates (logo.PNG)
  - Templates de welcome, password-reset e login-notification atualizados

### Documentação
- **Claude.md**: Adição de regras de tipagem
  - Nunca usar `any` no TypeScript
  - Sempre criar tipos adequados
  - Usar tipagem centralizada
  - Verificar se tipo existe antes de criar

## [0.13.0] - 2025-01-09

### Adicionado
- **Sistema de Busca Completo**: Implementação de busca de produtos integrada com Nuvemshop
  - SearchBar com busca em tempo real (debounce de 500ms)
  - Página de resultados de busca (/busca)
  - API route /api/search otimizada
  - ProductCardCompact para resultados de busca
  - Integração com parâmetro `q` da API Nuvemshop

### Melhorado
- **Arquitetura e Padrões**: Refatoração completa para consistência
  - API de busca usando `nuvemshopClient` padrão
  - Remoção de interfaces duplicadas (Product)
  - Uso consistente de `NuvemshopProduct`
  - Criação de helpers centralizados em `/utils/product-helpers.ts`
  - Aplicação de useCallback e useMemo para performance

### Adicionado
- **Componentes Reutilizáveis**:
  - `ProductCardCompact`: Versão compacta do ProductCard para busca
  - Helpers de produto: getProductName, getProductPrice, getProductImage, etc.
  - Integração com constante IMAGES.PRODUCT_PLACEHOLDER

### Corrigido
- **Imagens de Produtos**: Correção do placeholder de imagem
  - Uso correto da constante IMAGES.PRODUCT_PLACEHOLDER
  - Fallback funcional para produtos sem imagem

### Documentação
- **Claude.md**: Atualização de regras e padrões
  - Documentação de lógicas centralizadas
  - Regra de responder sempre em português
  - Regra de implementar uma coisa por vez
  - Regra de não adicionar comentários no código
  - Regra de usar useCallback/useMemo apropriadamente

## [0.12.3] - 2025-01-06

### Adicionado
- **Sistema de Templates Next.js**: Implementação de templates para páginas de autenticação
  - Template para login/cadastro/recuperar-senha com layout compartilhado
  - Template para verify-email/reset-password com layout compartilhado
  - Eliminação de código duplicado entre páginas

### Melhorado
- **Layout de Páginas de Autenticação**: Ajustes visuais e estruturais
  - Largura máxima definida (max-w-6xl) para evitar conteúdo esticado
  - Templates unificados com mesmo padrão visual
  - Estado de sucesso em reset-password mantém layout de duas colunas
  - Ícone de sucesso e botão de ação no estado de confirmação

- **Proteção de Rotas de Token**: Páginas reset-password e verify-email agora redirecionam se não houver token
  - reset-password redireciona para /recuperar-senha
  - verify-email redireciona para /login
  - Mensagens de erro específicas para tokens expirados/inválidos
  - Botões de ação contextuais para solicitar novos tokens

### Reestruturado
- **Organização de Rotas**: Páginas movidas para grupos de rotas
  - Páginas de formulários movidas para `(auth-forms)/`
  - URLs permanecem inalteradas devido ao uso de grupos de rotas
  - Código de layout centralizado em templates
  
### Segurança
- **Validação de Tokens**: Sistema completo de validação no backend
  - Verifica se token existe no banco de dados
  - Verifica se token já foi utilizado
  - Verifica se token expirou (1 hora para reset de senha)
  - Mensagens de erro padronizadas e seguras

## [0.12.2] - 2025-01-06

### Melhorado
- **Proteção de Rotas de Token**: Páginas reset-password e verify-email agora redirecionam se não houver token
  - reset-password redireciona para /recuperar-senha
  - verify-email redireciona para /login
  - Mensagens de erro específicas para tokens expirados/inválidos
  - Botões de ação contextuais para solicitar novos tokens
  
### Segurança
- **Validação de Tokens**: Sistema completo de validação no backend
  - Verifica se token existe no banco de dados
  - Verifica se token já foi utilizado
  - Verifica se token expirou (1 hora para reset de senha)
  - Mensagens de erro padronizadas e seguras

## [0.12.1] - 2025-01-06

### Melhorado
- **Página de Redefinição de Senha**: Refatorada para seguir o padrão visual das outras páginas de autenticação
  - Adicionado background com imagem e overlay primário
  - Card branco com bordas arredondadas e sombra
  - Cores de texto e elementos ajustados para o padrão
  - Botão com efeito de sombra 3D
  - Seção informativa lateral com dicas de segurança
  - Adicionado hook useMetadata para SEO

### Corrigido
- **Erro de Hydration do Styled Components**: Resolvido problema de classes CSS diferentes entre servidor e cliente
  - Adicionada configuração `compiler.styledComponents: true` no next.config.js
  - Garante geração consistente de classes CSS em SSR e cliente

## [0.12.0] - 2025-01-06

### Adicionado
- **Template de Verificação de Conta**: Novo template de e-mail específico para ativação de conta
  - Design consistente com identidade visual dark da Nutreon
  - Ícones visuais e seção destacada para o botão de verificação
  - Explicação dos benefícios da verificação

### Melhorado
- **Página de Verificação de E-mail**: Refatorada seguindo padrão visual das páginas de autenticação
  - Background com imagem em grayscale e overlay primário
  - Layout em duas colunas com card de verificação e seção informativa
  - Preservados todos os redirects e funcionalidades críticas
  - Ícones maiores e mais visíveis para os estados de loading, sucesso e erro

- **Templates de E-mail**: Todos os templates atualizados com nova identidade visual
  - **Design Dark Mode**: Fundo escuro (#171717 e #262626) para todos os templates
  - **Logo Nutreon**: Adicionado no header de todos os e-mails
  - **Cores Consistentes**: Primary (#00e8d4) e paleta de cinzas
  - **Template de Boas-vindas**: Visual moderno com seção de benefícios destacada
  - **Template de Recuperação de Senha**: Incluídas dicas de segurança e visual aprimorado
  - **Template de Notificação de Login**: Alerta de segurança detalhado com informações do dispositivo
  - **Footer Padronizado**: Links para redes sociais e políticas em todos os templates

### Técnico
- **Styled Components**: Removidas todas as tags HTML diretas do projeto
  - Criados styled components para todas as tags HTML em páginas e componentes
  - Exceções mantidas: templates de e-mail e páginas em /auth (conforme solicitado)
  - Melhoria na manutenibilidade e consistência do código

- **Correções de Lint**: Resolvidos todos os erros de variáveis não utilizadas
  - Removidos imports e variáveis desnecessárias
  - Código mais limpo e sem warnings

## [0.11.1] - 2025-01-06

### Melhorado
- **Botões de Ação**: Padronização visual dos botões
  - Todos os botões principais agora usam `bg-primary-500` com hover `bg-primary-600`
  - Removidos ícones dos botões de submit para visual mais limpo
  - Botões afetados: Entrar, Criar conta, Enviar e-mail de recuperação, Voltar ao login
- **Ícone do Header**: Alterado ícone de login de seta (`fa-share`) para perfil (`fa-user`)

### Técnico
- Consistência visual aprimorada em todas as páginas de autenticação
- Melhor contraste dos botões sobre o fundo com overlay

## [0.11.0] - 2025-01-06

### Adicionado
- **Páginas de Autenticação Individuais**: Novas páginas separadas para login, cadastro e recuperação de senha
  - `/login` - Página de login com layout moderno em 2 colunas
  - `/cadastro` - Página de cadastro com benefícios e formulário
  - `/recuperar-senha` - Página de recuperação com guia passo-a-passo
  - Componentes atoms criados: Checkbox, Link e Divider
  - Integração completa com hooks de autenticação existentes
  - Design responsivo e acessível

- **Background com Overlay nas Páginas de Autenticação**:
  - Imagem de fundo com filtro grayscale
  - Overlay na cor primária (ciano) com opacidade 90%
  - Efeito mix-blend-multiply para melhor integração visual
  - Constante global `AUTH_BACKGROUND` em constants.ts
  - Textos e elementos visuais adaptados para contraste

### Melhorado
- **Links do Header**: Atualizados para apontar para as novas páginas
  - Login: `/auth` → `/login`
  - Cadastre-se: `/auth?tab=1` → `/cadastro`
  - Recuperar senha: `/auth?tab=2` → `/recuperar-senha`
- **Middleware**: Atualizado para incluir novas rotas de visitantes
- **Visibilidade de Elementos**: Melhorias visuais na página de login
  - Ícones aumentados e com maior destaque (shadow-lg)
  - Títulos com font-bold e drop-shadow
  - Botão "Criar conta" com fundo branco para contraste
  - Textos com melhor legibilidade sobre o fundo

### Técnico
- Styled Components aplicados em todos os elementos (sem tags HTML diretas)
- Tailwind CSS para estilização visual
- useCallback para todos os handlers
- Performance otimizada com memoização

## [0.10.3] - 2025-01-05

### Adicionado
- **Menu Mobile Completo**: Implementação de navegação mobile com animações
  - Overlay com animação fade e backdrop blur
  - Menu lateral deslizante com transição suave
  - Animações de entrada escalonada para itens do menu
  - Submenus com animação accordion (expand/collapse)
  - Efeitos visuais no hover (barra lateral, bullets animados)
  - Integração com sistema de autenticação
  - Suporte a submenus expansíveis
  - Fechamento por ESC ou clique no overlay
  - Prevenção de scroll do body quando aberto

### Melhorado
- **Arquitetura e Padrões**: Atualização da documentação
  - Adicionada regra obrigatória de usar styled components para todos elementos
  - Proibição explícita de tags HTML diretas
  - Regra de performance: sempre usar useCallback e useMemo
  - Exemplos atualizados no ARCHITECTURE.md

### Corrigido
- **Import do Header**: Corrigido caminho para `/components/organisms/header`
- **Footer**: Removida variável não utilizada `setCurrentYear`
- **Ícones do Footer**: Atualizados para Font Awesome 6 (fa-brands, fa-regular)

## [0.10.2] - 2025-01-05

### Adicionado
- **Contador de itens no título da página**: Mostra quantidade de itens do carrinho no título da aba
  - Formato: "(2) Nutreon BR" quando há itens no carrinho
  - Atualiza automaticamente ao adicionar/remover itens
  - Ajuda usuário a acompanhar carrinho mesmo em outras abas
- **Footer Completo**: Novo componente de rodapé com design moderno
  - Logo da empresa
  - Seção de formas de pagamento com ícones
  - Menu institucional com links para páginas principais
  - Informações de contato (telefone e email)
  - Integração com componente SocialLinks existente
  - Seção de site seguro com ícones
  - Copyright com ano dinâmico
  - Banner de cookies LGPD funcional
  - Design responsivo para todos dispositivos
  - Segue padrão Styled Components + Tailwind CSS

### Corrigido
- **Sistema de Autenticação e Carrinho**:
  - Padronizado nome do cookie de autenticação (`auth-token`) em todo o sistema
  - Logout agora deleta completamente a sessão do banco de dados (não apenas desativa)
  - Cookie `cart_session` só é criado para usuários não autenticados
  - Cookie `cart_session` é removido ao limpar carrinho (usuários não autenticados)
  - Carrinho é corretamente deletado do banco quando todos os itens são removidos
  - Prevenida criação automática de novo carrinho após limpeza/remoção de todos itens

### Melhorado
- **UX do CartDrawer**: Múltiplas melhorias de usabilidade
  - Fecha ao clicar no overlay (fundo escuro) - já estava implementado
  - Adicionado cursor pointer no overlay para indicar que é clicável
  - Fecha ao pressionar a tecla ESC
  - Previne scroll do body quando o drawer está aberto
  - Adicionado aria-label no overlay para acessibilidade
- **Performance**: Otimização de componentes com useCallback e useMemo
  - Button: useMemo para classes de variantes
  - DeliveryCheck: useCallback para handler de clique
  - IconButton: useCallback para handler de clique
  - QuantitySelector: useCallback para todos os handlers
  - Tabs: useCallback para handler de seleção
  - ProductGrid: useMemo para classes e useCallback para getCategoryName
  - Páginas: Setup e Reset Password otimizadas
  - Hooks: useCustomerProfile, useMetadata e usePasswordValidation otimizados
  - CartContext: useMemo para cálculos de itemCount, subtotal e total

### Corrigido
- **Sistema de Carrinho**: Correções importantes na lógica do carrinho
  - Carrinho agora é deletado automaticamente quando todos os itens são removidos
  - Implementada verificação e deleção do carrinho vazio no RemoveFromCartUseCase
  - ClearCartUseCase agora deleta o carrinho após limpar os itens
  - Corrigido erro de tipo Decimal no SyncCartUseCase
  - Corrigido uso incorreto de useMemo na página de reset password
  - CustomerId já estava sendo salvo corretamente (não era um bug)

## [0.9.1] - 2025-01-05

### Adicionado
- **CartDrawer Completo**: Drawer lateral do carrinho com todas as funcionalidades
  - Lista visual de produtos com imagens, nomes e preços
  - Controles de quantidade (+/-) funcionais
  - Botão de remover item individual
  - Cálculo de subtotal, frete e total em tempo real
  - Botões "Finalizar Compra" e "Ver Carrinho Completo"
  - Animações suaves com Headless UI Transition
  - Estado vazio quando não há itens
  - Loading state durante operações
  
- **Página de Carrinho Completa** (`/carrinho`): Redesign total com todas as funcionalidades
  - Layout responsivo com grid de 2 colunas (produtos + resumo)
  - Lista detalhada de produtos com imagens grandes
  - Controles de quantidade e remoção por item
  - Botão "Limpar Carrinho" com confirmação
  - Resumo fixo do pedido (sticky)
  - Indicador de frete grátis com progresso
  - Botões de ação proeminentes
  - Estados visuais para carrinho vazio e carregando
  - Totalmente implementado com Styled Components
  
### Melhorado
- **Integração Nuvemshop**: Enriquecimento de dados do carrinho
  - API GET /api/cart agora busca dados completos dos produtos
  - API POST /api/cart salva nome, imagem e preço ao adicionar
  - Imagens reais dos produtos da Nuvemshop
  - Fallback para imagem placeholder quando necessário
  
- **Performance**: Otimizações no CartDrawer
  - useCallback para todos os handlers
  - useMemo para cálculos derivados
  - Previne re-renders desnecessários
  
### Corrigido
- **Erros de Atualização/Remoção**: Correção de tipos no CartDrawer
  - IDs do carrinho agora tratados corretamente como strings
  - Removida conversão desnecessária com parseInt()
  - Logs adicionados para debug nas APIs
  
- **Migração Prisma**: Adicionados campos no CartItem
  - name, image e price agora persistidos no banco
  - Migração com valores default para dados existentes
  - Correção do erro "Unknown argument" do Prisma
  
### Técnico
- Constantes centralizadas para imagens e cookies
- CartDrawer integrado no header (desktop e mobile)
- Padrão Styled Components aplicado consistentemente
- Types TypeScript atualizados para novos campos
- Instruções adicionadas para executar migrações Prisma corretamente
- Criado CartDrawerContext para controle global do drawer
- CartDrawer abre automaticamente ao adicionar produtos ao carrinho

## [0.9.0] - 2025-01-05

### Adicionado
- **Sistema de Carrinho Completo**: Implementação full-stack com arquitetura DDD
  - **Backend DDD**:
    - Repository `PrismaCartRepository` com métodos CRUD completos
    - Use Cases: `GetOrCreateCart`, `AddToCart`, `UpdateCartItem`, `RemoveFromCart`, `ClearCart`, `GetCart`, `SyncCart`
    - Container DI atualizado com todas as dependências do carrinho
    - Entidades Cart e CartItem já existentes no Prisma
  - **API Routes** (`/api/cart/*`):
    - `GET /api/cart` - Busca carrinho (cria automaticamente se não existir)
    - `POST /api/cart` - Adiciona item ao carrinho
    - `PATCH /api/cart/:id` - Atualiza quantidade do item
    - `DELETE /api/cart/:id` - Remove item específico
    - `DELETE /api/cart` - Limpa carrinho completo
    - `POST /api/cart/sync` - Sincroniza carrinho ao fazer login
    - `POST /api/cart/shipping` - Calcula frete com regras de negócio
  - **Frontend**:
    - Context `CartContext` para gerenciamento de estado global
    - Hook `useCart` com interface simplificada para operações
    - Componente `CartButton` no header com badge contador
    - Página `/carrinho` com template básico funcional
  - **Funcionalidades**:
    - Persistência em cookies de sessão (30 dias) para usuários não autenticados
    - Persistência no banco de dados para usuários autenticados
    - Sincronização automática ao fazer login (merge de carrinhos)
    - Cálculo de frete integrado: Grátis (>R$200), R$15 (R$52-166,59), R$20 (outros)
    - Toast notifications para feedback de ações
    - Loading states durante operações
    - Integração completa com `ProductCard` (botão adicionar ao carrinho)

### Melhorado
- **Arquitetura DDD**: Sistema de carrinho seguindo todos os padrões estabelecidos
- **Experiência do Usuário**: Carrinho persistente mesmo sem login
- **Performance**: Estados otimizados e operações assíncronas

### Técnico
- Use Cases implementados com injeção de dependências
- Tratamento de erros padronizado em todas as camadas
- Respostas API seguindo formato padrão com `successResponse`
- Types TypeScript completos para Cart e CartItem

## [0.8.0] - 2025-01-04

### Adicionado
- **Skeleton Loading para ProductGrid**: Componente de carregamento visual durante fetch de produtos
  - `ProductCardSkeleton` com animação shimmer suave
  - Prop `isLoading` no ProductGrid para controlar estado
  - Melhora significativa na experiência do usuário durante carregamento
  - Elimina mensagem "Nenhum produto disponível" durante loading

### Melhorado
- **Performance com React Hooks**: Otimização completa com useCallback e useMemo
  - ProductCard: Funções memoizadas para evitar re-renders desnecessários
  - UserActions & FavoritesButton: Handlers otimizados
  - Páginas Auth & Conta: Formulários e tabs otimizados
  - Header: Navigation items e handlers memoizados
  - HomePage: Função loadData otimizada
  - AuthContext: Todas as funções do contexto otimizadas
  - Redução significativa de re-renders em componentes filhos
  - Performance melhorada especialmente em listas de produtos

- **Atualização em Tempo Real na Página de Conta**: Dados atualizados sem reload
  - Após salvar alterações, executa checkAuth() para sincronizar
  - Formulário atualizado automaticamente com novos dados
  - Elimina necessidade de refresh manual da página

### Corrigido
- **Build do Next.js**: Múltiplos erros de TypeScript resolvidos
  - Tipos NextRequest/Request padronizados nas rotas API
  - Função handleApiError ajustada para receber contexto obrigatório
  - Hooks tipados corretamente para useApiRequest
  - Variáveis não utilizadas removidas
  - Todos os erros de compilação eliminados

## [0.7.0] - 2025-01-04

### Adicionado
- **Sistema de Favoritos Completo**: Funcionalidade para favoritar produtos
  - Context `FavoritesContext` para gerenciamento de estado global
  - Hook `useFavorites` para lógica centralizada
  - Sincronização automática entre cookies (não autenticado) e banco de dados (autenticado)
  - Componente `FavoritesButton` no header com badge contador
  - Página `/conta/favoritos` para visualizar produtos favoritos
  - APIs: `/api/favorites` (GET/POST) e `/api/favorites/sync` (POST)
  - Migração do banco com tabela `favorites`
  - Use cases: `ToggleFavoriteUseCase`, `GetFavoritesUseCase`, `SyncFavoritesUseCase`
  - Repositório `PrismaFavoriteRepository`
  - Componente `FavoritesSyncManager` para sincronização automática
  - Ícone de coração em cada `ProductCard` para favoritar/desfavoritar
  - Persistência de favoritos para usuários não autenticados via cookies

### Melhorado
- **ProductCard**: Adicionado botão de favoritos com feedback visual
  - Coração vazio (cinza) quando não favoritado
  - Coração preenchido (vermelho) quando favoritado
  - Toast de sucesso ao adicionar/remover
- **Header**: Integrado `FavoritesButton` ao lado do carrinho
  - Badge mostra quantidade de favoritos
  - Redireciona para página de favoritos ao clicar
- **Performance**: Favoritos carregados apenas uma vez ao iniciar aplicação

### Corrigido
- **API Response Format**: Padronizado uso de `successResponse` com objetos
  - Corrigido problema de serialização de strings como objetos indexados
  - Mensagens agora são passadas como `{ message: "..." }` no segundo parâmetro
- **Hook useFavorites**: Corrigido problema de estrutura de dados aninhadas
  - Tratamento correto de `response.data.data` da API
  - Estado inicial consistente entre cliente e servidor

### Técnico
- Migração `20250104110736_add_favorites` aplicada
- Container DI atualizado com `FavoriteRepository` e use cases
- Integração completa com sistema de autenticação existente
- Padrão Styled Components + Tailwind mantido em todos os novos componentes

### Removido
- **Arquivos de Backup Não Utilizados**: Limpeza de arquivos antigos
  - `/src/app/conta/page-material-ui.tsx`
  - `/src/app/auth/page-material-ui.tsx` 
  - `/src/app/auth/page-original.tsx`
- **Console.logs em Produção**: Removidos de 5 arquivos
  - verify-email, auth context, home page, header, unauthorized
- **Hook Duplicado**: Removido `useBFF` em favor de `useApiRequest`

### Melhorado
- **Centralização de Requisições HTTP**: Todos os componentes agora usam `useApiRequest`
  - Migrado home page e verify-email page
  - Padronização do tratamento de erros e loading
  - Eliminada duplicação de lógica de requisições

### Corrigido
- **Erro de Runtime**: Ajustado acesso a dados aninhados da API
  - ProductGrid agora recebe arrays corretamente
  - Corrigido formato de resposta (data.data)

## [0.6.0] - 2025-08-04

### Adicionado
- **Login Automático após Verificação de Email**: Usuário é autenticado automaticamente ao verificar email
  - VerifyEmailUseCase agora retorna token JWT e cria sessão
  - Cookie de autenticação configurado automaticamente
  - Redirecionamento direto para conta após verificação

### Corrigido
- **CRÍTICO: Verificação de Email Obrigatória**: Restaurada validação que impede acesso sem email verificado
  - Usuários não verificados veem tela de bloqueio na página de conta
  - Opção de reenviar email de verificação disponível
  - Previne bypass de segurança identificado durante refatoração
- **Grid de Produtos Responsivo**: Ajustado para 3 colunas desktop, 2 tablet, 1 mobile
  - Removida configuração dinâmica que causava problemas com Tailwind
  - Classes CSS fixas para melhor performance

### Refatorado
- **Páginas de Autenticação**: Migração completa para padrão Styled Components + Tailwind
  - `/auth/reset-password`: Removido Material-UI, adicionada barra de força de senha visual
  - `/auth/verify-email`: Removido Material-UI e ícones Material Icons
  - Todos os componentes agora seguem padrão único de estilização
  - Toast notifications para feedback de reenvio de email

### Melhorado
- **Hooks Refatorados para useApiRequest**: Migração de hooks para usar o cliente API centralizado
  - `useCustomerProfile`: Migrado de fetch nativo (122 → 111 linhas)
  - `usePasswordRecovery`: Migrado de useBFF (74 → 64 linhas)
  - Tratamento de erro centralizado e consistente
  - Eliminada duplicação de lógica de estado
  - Padrão único para todas as chamadas API

- **Padronização de Tratamento de Erros em APIs**: Migração de rotas para usar utilitários centralizados
  - 11 rotas padronizadas com `handleApiError`, `successResponse` e `errorResponse`
  - `/api/customer/me`: 71 → 50 linhas (30% redução)
  - `/api/customer/login`: 58 → 31 linhas (47% redução)  
  - `/api/auth/logout`: 11 → 10 linhas
  - `/api/customer/logout`: 50 → 35 linhas
  - `/api/store`: 37 → 24 linhas
  - Respostas 100% consistentes com formato padrão
  - Status HTTP automático baseado em mensagens de erro
  - Suporte nativo para erros Zod

### Adicionado
- **Guia de Padronização de APIs**: Documentação completa em `docs/API_ERROR_HANDLING_GUIDE.md`
  - Exemplos práticos de migração
  - Padrões de resposta documentados
  - Benefícios e boas práticas

### Corrigido
- **AuthContext**: Ajustado para nova estrutura de resposta das APIs padronizadas
  - `checkAuth` agora lê corretamente `data.data.authenticated` e `data.data.customer`
  - Corrige spinner infinito na página `/conta`

## [0.5.0] - 2025-08-04

### Mudanças Significativas (BREAKING CHANGES)
- **Padrão de Estilização**: Migração completa para Styled Components + Tailwind CSS
  - Removido Material-UI de todos os componentes
  - Styled Components agora usado APENAS para estrutura semântica
  - Tailwind CSS para TODOS os estilos visuais
  - Proibido uso de estilos inline e arquivos CSS/SCSS

### Adicionado
- **Nova Cor Primária**: #00e8d4 (ciano/turquesa do logo)
  - Paleta completa de cores primárias (50-900)
  - Paleta de cores escuras para tema dark (100-950)
- **Componentes Typography**: Atoms reutilizáveis para textos
- **Organização Atomic Design**: 
  - TopBar movido para organisms
  - MobileMenu movido para molecules
  - Estrutura clara: atoms → molecules → organisms

### Melhorado
- **Header Refatorado**: 
  - Tema escuro com fundo dark-900
  - Reduzido de 350 para ~130 linhas
  - Extraído em componentes menores (TopBar, MobileMenu)
  - HeaderStyled renomeado para HeaderContainer (padrão)
- **Componentes Refatorados**:
  - DeliveryCheck: Removido Material-UI e estilos inline
  - SearchButton: Migrado para Font Awesome
  - SocialLinks: Ícones Font Awesome
  - Navigation: Submenu com tema escuro
  - UserActions: Adicionado submenu (Minha Conta/Logout)
  - CartButton: Visual atualizado
  - IconButton: Badge ajustado com posicionamento -top-[12px]
- **HomePage**: Cores atualizadas para nova paleta
- **ProtectedRoute**: Removido Material-UI
- **Documentação Atualizada**:
  - README.md: Seção completa de padrões de estilização
  - ARCHITECTURE.md: Atomic Design e regras de estilização
  - DEVELOPMENT_PROMPT.md: Anti-patterns e exemplos práticos

### Removido
- Todas as dependências do Material-UI (@mui/*)
- Estilos inline em todos os componentes
- Arquivos CSS/SCSS desnecessários

### Corrigido
- MobileMenu: Removida prop `showMenu` não utilizada
- Tailwind Config: Removidos patterns de safelist inválidos
- Build: Todos os erros de TypeScript corrigidos

### Melhorado
- **Tratamento de Erros Padronizado**: Refatorado 6 endpoints para usar funções utilitárias
  - `/api/health` - Usa `successResponse` e `errorResponse`
  - `/api/customer/update` - Usa `handleApiError` (57 → 41 linhas)
  - `/api/customer/change-password` - Tratamento centralizado (59 → 43 linhas)
  - `/api/auth/verify-email` - Simplificado (57 → 23 linhas)
  - `/api/auth/reset-password` - Código reduzido (61 → 31 linhas)
  - `/api/auth/request-password-reset` - Mais conciso (42 → 25 linhas)
  - Total: 335 linhas reduzidas para 212 (37% de redução)
  - Determinação automática de status HTTP baseada em mensagem
  - Tratamento consistente de erros Zod
  - Respostas padronizadas com timestamp
- **Validações Centralizadas**: Consolidado schemas Zod em arquivo único
  - Criado `passwordSchema` para validação complexa de senha
  - Criado `simplePasswordSchema` para validação básica
  - Movidos 5 schemas de validação para `/core/infrastructure/validation/schemas.ts`
  - Endpoints refatorados: reset-password (31→17), change-password (42→29), verify-email (23→19), request-password-reset (25→21), update (41→37)
  - Total: 162 linhas reduzidas para 123 (24% de redução)
  - Elimina duplicação de regras de validação
  - Facilita manutenção e consistência

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

[0.10.3]: https://github.com/nutreon/nutreon-br/compare/v0.10.2...v0.10.3
[0.10.2]: https://github.com/nutreon/nutreon-br/compare/v0.10.1...v0.10.2
[0.7.0]: https://github.com/nutreon/nutreon-br/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/nutreon/nutreon-br/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/nutreon/nutreon-br/compare/v0.4.3...v0.5.0
[0.4.3]: https://github.com/nutreon/nutreon-br/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/nutreon/nutreon-br/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/nutreon/nutreon-br/compare/v0.4.0...v0.4.1
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