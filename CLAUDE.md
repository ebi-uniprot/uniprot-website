# CLAUDE.md — uniprot-website

## Project Overview

UniProt website is a React 19 + TypeScript single-page application for the UniProt biological database. It provides search, browsing, and analysis across multiple namespaces: UniProtKB, UniRef, UniParc, Proteomes, and supporting data (taxonomy, keywords, citations, diseases, etc.). Built with Webpack 5, it produces dual modern/legacy bundles for broad browser support.

## Commands

```bash
# Dev server (production API)
yarn start

# Dev server (dev API)
yarn start:dev

# Run all checks (lint + types + unit tests)
yarn test

# Individual checks
yarn test:lint          # ESLint
yarn test:types         # TypeScript type checking
yarn test:unit          # Jest with coverage

# Build
yarn build:prod         # Production build

# Format
yarn lint-fix           # Auto-fix ESLint issues
yarn prettier           # Prettier formatting
```

## Tech Stack

- **Framework**: React 19 with React Router v5
- **Language**: TypeScript (strict mode, ESNext target)
- **Bundler**: Webpack 5 with Babel 7
- **Styling**: Sass/SCSS with CSS Modules (`.module.scss`)
- **Design system**: franklin-sites (EBI component library)
- **HTTP**: Axios
- **Testing**: Jest 30 + @testing-library/react
- **Linting**: ESLint 9 (flat config) + Prettier, Airbnb style
- **Package manager**: Yarn

## Architecture

### Directory Layout

Each namespace follows the same structure:

```
src/<namespace>/
  adapters/      # API response → UI model converters
  components/    # React components (entry/, results/, landing-page/)
  config/        # Column definitions, URLs, feature configs
  types/         # TypeScript type definitions
  utils/         # Helper functions
  __mocks__/     # Test mock data
```

Major namespaces: `uniprotkb/`, `uniref/`, `uniparc/`, `proteomes/`, `supporting-data/`, `automatic-annotations/`, `jobs/`, `help/`, `contact/`, `query-builder/`.

Shared code lives in `src/shared/` with the same subdirectory convention plus `hooks/`, `contexts/`, `custom-elements/`, `workers/`, and `styles/`.

### Key Patterns

**Data fetching** uses the `useDataApi` custom hook (`src/shared/hooks/useDataApi.ts`), which wraps Axios with loading/error states, progress tracking, cancellation, and service worker cache integration.

**State management** uses React Context + useReducer (not Redux). Global contexts are nested in `src/shared/contexts/Global.tsx`. The messages system (`src/messages/state/`) follows a Redux-like actions/reducer pattern using typesafe-actions.

**Routing** is React Router v5. Routes are defined in `src/app/components/App.tsx` with lazy-loaded chunks. The `LocationToPath` enum in `src/app/config/urls.ts` maps logical locations to URL patterns. URL query parameters are the source of truth for search state — use `stringifyUrl` and `splitUrl` from `src/shared/utils/url.ts`.

**API URLs** are built through helpers in `src/shared/config/apiUrls/`. The API prefix is injected by Webpack at build time (`API_PREFIX` constant).

**Adapter pattern**: each namespace has `adapters/` that convert raw API responses into UI-friendly models. Follow this pattern when adding new data transformations.

**Web components** from @nightingale-elements are wrapped using `@lit/react`'s `createComponent` in `src/shared/custom-elements/`.

**Styling**: use CSS Modules with SCSS. Import as `import styles from './Component.module.scss'` and apply with `className={styles.container}`. Use franklin-sites design tokens and components where possible.

### Key Files

- `src/index.tsx` — entry point, service worker registration
- `src/app/components/App.tsx` — route definitions, Sentry init
- `src/app/config/urls.ts` — `LocationToPath` enum for all routes
- `src/shared/hooks/useDataApi.ts` — core data fetching hook
- `src/shared/utils/url.ts` — URL/query string utilities
- `src/shared/contexts/Global.tsx` — context provider tree
- `src/shared/config/apiUrls/` — API endpoint builders
- `webpack.config.js` — build configuration

## Code Conventions

- Functional components only, with TypeScript type annotations
- Airbnb style guide enforced via ESLint
- No `console.log` in production code
- camelCase for variables/functions, PascalCase for components/types
- Prefer `type` imports with inline syntax
- No non-null assertions (`!`)
- CSS class names are scoped via CSS Modules — never use global class names in component styles

## Testing

Tests live in `__tests__/` directories alongside source files, named `ComponentName.spec.tsx`. Mock data goes in `__mocks__/` directories.

Use `customRender()` from test helpers to wrap components with required context providers. The `useDataApi` hook and web components are commonly mocked in tests.

Coverage thresholds: ~78% lines, ~75% functions, ~66% branches. Run `yarn jest-coverage-ratchet` to enforce.

Jest runs in jsdom with UTC timezone forced. Timeout is 30 seconds.

## Build & Deployment

Webpack produces two bundles: modern (ESNext) and legacy (IE11-compatible). Code is split by route (lazy loading) and by library (react, nightingale, molstar). The service worker uses Workbox for precaching and runtime API response caching.

Webpack injects these constants: `API_PREFIX`, `BASE_URL`, `MODERN_BUNDLE`, `GIT_COMMIT_HASH`, `GIT_BRANCH`, `LMIC`.

Deploys to Netlify with SPA redirect (all routes → `/index.html`).

## Architecture Decision Records

See `doc/architecture/decisions/` for rationale on React+TypeScript, franklin-sites design system, testing strategy, and coding style choices.
