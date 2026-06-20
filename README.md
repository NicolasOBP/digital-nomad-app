# Nomad — Digital Nomad App

Aplicativo mobile desenvolvido em **React Native** com **Expo** durante a realização do **curso profissional da [CoffStack](https://coffstack.com.br)**. O projeto simula uma plataforma para nômades digitais explorarem cidades ao redor do mundo, com informações detalhadas, filtros, favoritos, mapas e autenticação completa.

---

## Sobre o projeto

O **Nomad** permite que usuários:

- **Explorem cidades** com nome, país, imagem de capa e categorias (aventura, praia, cultura, gastronomia, etc.)
- **Filtrem** a listagem por nome (com debounce) e por categoria
- **Visualizem detalhes** de cada cidade: descrição, pontos turísticos, mapa interativo e cidades relacionadas
- **Marquem cidades como favoritas** e acessem a lista no perfil
- **Autentiquem-se** com login, cadastro, recuperação e atualização de senha e perfil

O app foi construído com foco em **arquitetura limpa**, **testabilidade**, **tipagem forte** e **automação de qualidade** (testes unitários, integração, E2E e CI/CD).

---

## Tecnologias utilizadas

### Core

| Tecnologia                                                | Versão / Uso                        |
| --------------------------------------------------------- | ----------------------------------- |
| [Expo SDK](https://expo.dev)                              | ~54                                 |
| [React Native](https://reactnative.dev)                   | 0.81                                |
| [React](https://react.dev)                                | 19.1                                |
| [TypeScript](https://www.typescriptlang.org)              | ~5.9 (modo `strict`)                |
| [Expo Router](https://docs.expo.dev/router/introduction/) | ~6 — roteamento baseado em arquivos |

### Navegação e UI

| Biblioteca                                            | Finalidade                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| `@react-navigation/native`, `bottom-tabs`, `elements` | Navegação por abas e stacks                                    |
| `@shopify/restyle`                                    | Design system tipado (cores, espaçamentos, variantes de texto) |
| `react-native-reanimated`                             | Animações (transições de lista, fade-in, bottom sheet)         |
| `react-native-gesture-handler`                        | Gestos nativos                                                 |
| `react-native-safe-area-context`                      | Áreas seguras em dispositivos com notch                        |
| `react-native-screens`                                | Otimização de telas nativas                                    |
| `expo-image`                                          | Carregamento otimizado de imagens                              |
| `expo-font`                                           | Fontes customizadas (família **Poppins** + ícones **IcoMoon**) |
| `expo-haptics`                                        | Feedback tátil                                                 |
| `react-native-maps`                                   | Mapas nas telas de detalhes da cidade                          |
| `react-native-toast-message`                          | Notificações toast de feedback ao usuário                      |

### Estado, dados e backend

| Biblioteca                                  | Finalidade                                       |
| ------------------------------------------- | ------------------------------------------------ |
| `@tanstack/react-query`                     | Cache, fetching e mutations assíncronas          |
| `@supabase/supabase-js`                     | Backend-as-a-Service (auth, PostgreSQL, storage) |
| `@react-native-async-storage/async-storage` | Persistência local da sessão do usuário          |
| `expo-sqlite`                               | SQLite local (plugin configurado)                |

### Formulários e validação

| Biblioteca            | Finalidade                   |
| --------------------- | ---------------------------- |
| `react-hook-form`     | Gerenciamento de formulários |
| `@hookform/resolvers` | Integração com validadores   |
| `zod`                 | Schemas de validação tipados |

### Utilitários

| Biblioteca                                           | Finalidade                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `date-fns`                                           | Formatação de datas (ex.: data de criação da conta no perfil) |
| `lodash.clonedeep` / `lodash.merge`                  | Merge profundo de repositórios nos testes                     |
| `expo-constants`, `expo-linking`, `expo-web-browser` | Configuração, deep links e browser in-app                     |
| `expo-updates`                                       | Over-the-air updates via EAS                                  |
| `expo-dev-client`                                    | Development builds customizados                               |

### Qualidade de código e DX

| Ferramenta                                               | Finalidade                          |
| -------------------------------------------------------- | ----------------------------------- |
| `eslint` + `eslint-config-expo` + `eslint-plugin-import` | Lint e ordenação de imports         |
| `jest` + `jest-expo`                                     | Testes automatizados                |
| `@testing-library/react-native`                          | Testes de componentes e integração  |
| `reactotron-react-native`                                | Debug e inspeção em desenvolvimento |

---

## Arquitetura

O projeto segue uma **arquitetura em camadas** inspirada em **Clean Architecture** e **Hexagonal Architecture (Ports & Adapters)**, separando responsabilidades de forma clara:

```
app/          → Telas e rotas (Expo Router)
src/
├── domain/   → Regras de negócio, entidades, interfaces e use cases
├── infra/    → Implementações concretas (Supabase, InMemory, storage, feedback)
├── ui/       → Componentes, containers, tema e templates
├── utils/    → Hooks e utilitários genéricos
└── test-utils/ → Helpers para testes
```

### Camada de domínio (`src/domain/`)

- **Entidades tipadas**: `City`, `CityPreview`, `Category`, `AuthUser`, `TouristAttraction`
- **Interfaces de repositório (ports)**: `IAuthRepo`, `ICityRepo`, `ICategoryRepo`
- **Use cases**: hooks como `useAuthSignIn`, `useCityFindAll`, `useCityToggleFavorite` — cada um encapsula uma operação de negócio
- **Contexto de autenticação**: `AuthContext` gerencia sessão persistida via storage

### Camada de infraestrutura (`src/infra/`)

- **Repository Pattern** com injeção via `RepositoryProvider`
- **Dois adapters de repositório**:
  - `SupabaseRepositories` — produção (auth, cities, categories via Supabase)
  - `InMemoryRepositories` — testes (dados mockados em memória)
- **Adapter pattern** para mapeamento Supabase → domínio (`supabaseAdapter`)
- **Storage abstrato** (`IStorage`) com implementações `AsyncStorageImpl` (app) e `InMemoryStorage` (testes)
- **Feedback Service** (`IFeedbackService`) com adapters: Toast, Alert e Console
- **Wrappers genéricos** sobre React Query: `useAppQuery` e `useAppMutation`

### Camada de UI (`src/ui/`)

Organizada em três níveis:

| Pasta         | Responsabilidade                     | Exemplos                                         |
| ------------- | ------------------------------------ | ------------------------------------------------ |
| `components/` | Componentes reutilizáveis e "burros" | `Button`, `Text`, `Box`, `CityCard`, `Accordion` |
| `containers/` | Componentes com lógica/composição    | `SignUpForm`, `CityFilter`, `ProfileHeader`      |
| `template/`   | Layouts base                         | `Screen` (KeyboardAvoidingView + scroll)         |

---

## Estrutura de telas (`app/`)

O roteamento usa **Expo Router** com grupos de rotas protegidas e abas:

```
app/
├── _layout.tsx                    # Root: providers globais (Query, Auth, Theme, Repositories...)
├── sign-in.tsx                    # Login
├── sign-up.tsx                    # Cadastro
├── reset-password.tsx             # Recuperação de senha
└── (protected)/                   # Rotas autenticadas (redirect se não logado)
    ├── _layout.tsx                # Guard de autenticação
    ├── (tabs)/                    # Navegação por abas
    │   ├── _layout.tsx            # Tab bar (Início, Explorar, Perfil)
    │   ├── index.tsx              # Home — lista de cidades com filtros
    │   ├── explore.tsx            # Explorar — cidades agrupadas por categoria
    │   └── profile.tsx            # Perfil — dados do usuário e favoritos
    ├── city-details/[id].tsx      # Detalhes da cidade (mapa, atrações, relacionadas)
    ├── update-profile.tsx         # Editar perfil
    └── update-password.tsx        # Alterar senha
```

### Fluxo de navegação

1. Usuário não autenticado → redirecionado para `/sign-in`
2. Após login → `router.replace("/")` leva à Home
3. Abas permitem alternar entre **Início**, **Explorar** e **Perfil**
4. Stack interno permite navegar para detalhes da cidade e formulários de perfil

---

## Padrões de código e boas práticas

### Clean Architecture / Separation of Concerns

- Telas em `app/` são **finas**: apenas compõem containers e chamam use cases
- Lógica de negócio fica nos **use cases** do domínio, não nos componentes
- Acesso a dados passa sempre por **interfaces** (`ICityRepo`, etc.), nunca diretamente pelo Supabase nas telas

### Repository Pattern + Dependency Injection

```typescript
// Produção (_layout.tsx)
<RepositoryProvider value={SupabaseRepositories}>

// Testes (renderApp.tsx)
<RepositoryProvider value={InMemoryRepositories}>
```

Repositórios podem ser **parcialmente mockados** nos testes com `lodash.merge`.

### Adapter Pattern

O `supabaseAdapter` converte rows/views do Supabase em entidades de domínio (`toCity`, `toCityPreview`, `toAuthUser`), isolando o formato do banco.

### Custom Hooks como Use Cases

Cada operação expõe um hook dedicado que combina repositório + feedback + side effects:

- `useAuthSignIn` — login + toast + persistência de sessão
- `useCityToggleFavorite` — optimistic update + invalidação de cache
- `useCityFindAll` — query com filtros de nome e categoria

### React Query como camada de cache

- Queries centralizadas via `useAppQuery`
- Mutations via `useAppMutation` com callbacks `onSuccess` / `onError`
- Invalidação de cache após favoritar (`queryClient.invalidateQueries`)

### Validação declarativa com Zod + React Hook Form

Formulários (`SignUpForm`, `UpdateProfileForm`, `UpdatePasswordForm`) usam:

- Schemas Zod tipados (`SignUpSchema`, etc.)
- `zodResolver` para validação integrada
- `Controller` para campos controlados com mensagens de erro inline

### Design System com Restyle

- Tema centralizado em `src/ui/theme/theme.ts`
- Paleta escura (`#1B1B1B` background, `#FF4B4B` primary)
- Variantes de texto tipadas (`title28`, `text14`, etc.)
- Componente `Box` como primitivo de layout
- Hook `useAppTheme()` para acesso tipado ao tema

### Feedback ao usuário desacoplado

Interface `IFeedbackService` permite trocar a implementação (Toast em produção, Console em dev) sem alterar use cases.

### TypeScript strict

- Path alias `@/*` configurado no `tsconfig.json`
- Tipos de domínio explícitos (`CityPreview`, `CategoryCode`, etc.)
- Rotas tipadas (`experiments.typedRoutes: true`)

### ESLint com ordenação de imports

Regras customizadas em `eslint.config.js`:

- Imports externos (React, Expo) primeiro
- Imports internos (`@/src/...`) depois
- Alfabetização e linha em branco entre grupos

### Acessibilidade e testabilidade

- `testID` em elementos interativos (`email-input`, `sign-in-button`, `sign-out-button`)
- Essencial para testes de integração e fluxos Maestro E2E

### Performance e UX

- **Debounce** na busca de cidades (`useDebounce`, 500ms)
- **Animações** com Reanimated (`FadingTransition`, `FadeIn`)
- **`useScrollToTop`** nas listas ao trocar de aba
- **Optimistic UI** ao favoritar cidades
- **React Compiler** habilitado (`experiments.reactCompiler: true`)
- **New Architecture** habilitada (`newArchEnabled: true`)

### Banco de dados (Supabase / PostgreSQL)

Scripts SQL em `src/infra/repositories/adapters/supabase/sql/`:

- Tabelas: `cities`, `tourist_attractions`, `categories`, `city_categories`, `city_cities`
- **PostGIS** para coordenadas geográficas
- **Row Level Security (RLS)** com políticas de leitura pública
- **Views** otimizadas: `cities_with_full_info`, `cities_with_categories`, `related-cities`
- Seeds com dados de cidades reais (Rio de Janeiro, Bangkok, Barcelona, Bali, etc.)

---

## Testes

O projeto possui uma estratégia de testes em **três níveis**:

### 1. Testes unitários de componentes

Localizados em `src/ui/components/__tests__/`:

- `Button.test.tsx` — comportamento de press e disabled
- `CityCard.test.tsx` — renderização do card de cidade
- `Text.test.tsx` — variantes tipográficas

Utilizam `renderComponent` com providers mínimos (Theme + QueryClient).

### 2. Testes unitários de use cases

Exemplo: `src/domain/auth/useCases/__tests__/useAuthSignIn.test.ts`

- Usa `renderHook` do Testing Library
- Mocka repositório, feedback e auth context com `jest.mock`
- Valida chamadas de sucesso e erro

### 3. Testes de integração

Localizados em `src/__tests__/`:

| Arquivo                         | Cenário testado                                              |
| ------------------------------- | ------------------------------------------------------------ |
| `AuthFlow.integration.test.tsx` | Login → Home → Logout → Sign-in                              |
| `Home.integration.test.tsx`     | Listagem, busca, navegação para detalhes, estados vazio/erro |
| `Profile.integration.test.tsx`  | Visualização e edição de perfil                              |
| `SignUpForm.test.tsx`           | Validação do formulário de cadastro                          |

Utilizam `renderApp` (`src/test-utils/renderApp.tsx`), que:

- Monta o router completo com `renderRouter` do Expo Router
- Injeta `InMemoryRepositories` e `inMemoryStorage`
- Permite mock parcial de repositórios e simular usuário autenticado

### Configuração Jest

```json
{
  "preset": "jest-expo",
  "collectCoverageFrom": ["{src,app}/**/*.{ts,tsx}"],
  "setupFiles": ["<rootDir>/setup-jest.tsx"]
}
```

### Scripts de teste

```bash
npm run test           # Jest em modo watch
npm run test:ci        # Jest para CI (sem watch)
npm run test:coverage  # Relatório de cobertura
```

---

## Testes E2E com Maestro

Os testes end-to-end usam **[Maestro](https://maestro.mobile.dev/)**, framework de automação mobile baseado em YAML.

Fluxos em `maestro/`:

| Arquivo            | Descrição                                                         |
| ------------------ | ----------------------------------------------------------------- |
| `sign-in.yml`      | Preenche email/senha e valida login                               |
| `auth.yml`         | Fluxo completo: login → aba Perfil → logout → tela de boas-vindas |
| `edit-profile.yml` | Login → editar nome do perfil → validar toast e nome atualizado   |

### Características dos fluxos

- `launchApp` com `clearState: true` para estado limpo
- Seletores por `testID` (`email-input`, `fullname-input`, `submit-button`)
- Seletores por texto com regex (`.*Perfil.*`, `.*Bem Vindo.*`)
- `runFlow` para reutilizar sub-fluxos (`sign-in.yml`)
- `scrollUntilVisible` para elementos fora da viewport
- `repeat` / `while` para scroll condicional até o botão de logout

### Perfil EAS para Maestro

Em `eas.json`, o profile `maestro` gera builds internos otimizados para E2E (simulator iOS, sem credentials).

---

## CI/CD com Expo e EAS

O projeto utiliza **[EAS Workflows](https://docs.expo.dev/eas/workflows/)** para automação completa. Workflows em `.eas/workflows/`:

### `check-code.yaml` — Quality Gate em PRs

Disparado em **pull requests** para qualquer branch:

1. Checkout do código (`eas/checkout`)
2. Instalação de dependências (`eas/install_node_modules`)
3. **TypeScript** — `npx tsc -noEmit`
4. **Testes** — `npm run test:ci`

### `create-builds.yaml` — Builds de produção

Disparado em **push para `master`**:

- Build Android (`profile: production`)
- Build iOS (`profile: production`)

### `submit-android.yaml` / `submit-ios.yaml` — Publicação nas lojas

Disparado em **push para `main`**:

1. Build de produção (Android ou iOS)
2. Submit automático para **Google Play** ou **App Store**

### `e2e-test-android.yml` / `e2e-test-ios.yml` — E2E completo

Pipeline em duas etapas:

1. **Build** com profile `maestro`
2. **Maestro test** usando o `build_id` gerado
   - Fluxos: `auth.yml` + `edit-profile.yml`

### `e2e-test-android-fast.yml` — E2E rápido

Reutiliza um `build_id` fixo para rodar Maestro sem rebuild (útil para iteração rápida).

### Perfis de build (`eas.json`)

| Profile       | Uso                                                   |
| ------------- | ----------------------------------------------------- |
| `development` | Dev client, distribuição interna, simulator iOS       |
| `preview`     | Builds internos, channel `preview`                    |
| `maestro`     | Builds para testes E2E                                |
| `production`  | Lojas, auto-increment de versão, channel `production` |

### OTA Updates

Configurado em `app.config.ts`:

- `runtimeVersion.policy: "appVersion"`
- URL de updates via EAS (`expo-updates`)

---

## Como executar o projeto

### Pré-requisitos

- Node.js 18+
- Yarn ou npm
- Expo CLI / EAS CLI (para builds)
- Android Studio ou Xcode (para emuladores)
- Conta Supabase (para backend em produção)

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd digital-nomad-app

# Instalar dependências
yarn install
# ou
npm install

# Configurar variáveis de ambiente
cp .env.template .env
# Preencher as chaves do Supabase e Google Maps
```

### Variáveis de ambiente

| Variável                           | Descrição                            |
| ---------------------------------- | ------------------------------------ |
| `EXPO_PUBLIC_SUPABASE_URL`         | URL do projeto Supabase              |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY`    | Chave anônima do Supabase            |
| `EXPO_PUBLIC_SUPABASE_STORAGE_URL` | URL do storage (imagens das cidades) |
| `EXPO_PUBLIC_WEB_URL`              | URL base web                         |
| `GOOGLE_MAPS_API_KEY`              | Chave da API Google Maps (Android)   |

### Executar em desenvolvimento

```bash
npm run start      # Expo Dev Server
npm run android    # Android (dev build)
npm run ios        # iOS (dev build)
npm run web        # Web
npm run lint       # ESLint
```

### Executar testes Maestro localmente

```bash
# Com o app instalado no emulador/dispositivo
maestro test maestro/auth.yml
maestro test maestro/edit-profile.yml
```

---

## Estrutura de pastas (resumo)

```
digital-nomad-app/
├── app/                    # Rotas e telas (Expo Router)
├── assets/                 # Fontes, ícones e imagens
├── maestro/                # Fluxos E2E (Maestro YAML)
├── .eas/workflows/         # Pipelines CI/CD (EAS Workflows)
├── src/
│   ├── domain/             # Entidades, interfaces, use cases, AuthContext
│   ├── infra/              # Supabase, InMemory, storage, feedback, React Query wrappers
│   ├── ui/                 # components, containers, template, theme, navigation
│   ├── utils/              # errorUtils, dateUtils, hooks (useDebounce)
│   ├── test-utils/         # renderApp, renderComponent, queryClientOptions
│   └── __tests__/          # Testes de integração
├── app.config.ts           # Configuração Expo (New Arch, React Compiler, OTA)
├── eas.json                # Perfis de build e submit EAS
├── setup-jest.tsx          # Setup global do Jest
├── ReactotronConfig.js     # Debug em desenvolvimento
└── eslint.config.js        # Regras de lint e ordenação de imports
```

---

## Créditos

Projeto desenvolvido como parte do **curso profissional da CoffStack**, aplicando conceitos modernos de desenvolvimento mobile com React Native, Expo, arquitetura limpa, testes automatizados e pipelines de CI/CD com EAS.
