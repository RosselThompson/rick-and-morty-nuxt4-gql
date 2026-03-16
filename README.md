# Rick and Morty Nuxt 4 GraphQL

Nuxt 4 application for listing Rick and Morty characters with search, pagination, favorites, and theme support.

## Run the Project

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
NUXT_RICK_AND_MORTY_API=https://rickandmortyapi.com/graphql
```

### 3. Start development server

```bash
pnpm dev
```

App runs on `http://localhost:3000`.

### 4. Run tests

```bash
pnpm test
```

### 5. Build production

```bash
pnpm build
pnpm preview
```

## Installed Libraries

### Dependencies

- `@nuxt/icon`: `2.2.1`
- `@nuxt/image`: `2.0.0`
- `@nuxtjs/color-mode`: `4.0.0`
- `@pinia/nuxt`: `^0.11.3`
- `@tailwindcss/vite`: `^4.2.1`
- `nuxt`: `^4.4.2`
- `pinia`: `^3.0.4`
- `tailwindcss`: `^4.2.1`
- `vue`: `^3.5.30`
- `vue-router`: `^5.0.3`

### Dev Dependencies

- `@vitejs/plugin-vue`: `^6.0.5`
- `@vue/test-utils`: `^2.4.6`
- `jsdom`: `^29.0.0`
- `vitest`: `^4.1.0`

## Architecture Approach

- **Frontend (Nuxt pages/components, SSR-first)**: Server-side renders initial views for faster first paint and SEO, then hydrates on client for interactions (search, pagination, favorites, theme).
- **Server layer (Nuxt server/api)**: Exposes internal endpoints (`/api/characters`, `/api/characters/:id`), validates inputs, maps response contracts.
- **External GraphQL API (Rick and Morty)**: Queried from server services using centralized GraphQL queries.

Flow: **Frontend -> Nuxt Server API -> Rick and Morty GraphQL API**.

## AI

AI support and tools used in this project:

- **Codex in terminal** was used to analyze and structure the project.
- **Codex in terminal** was used to review the implementation and identify bad practices and anti-patterns.
- **Codex in terminal** was used to generate the README.md file and unit tests.
- Several code changes were requested through **Antigravity + Gemini** during development, especially styling updates.
- **Antigravity** was used as IDE and as code autocompleter.
- **Stich (Google)** was used to generate design inspiration for card and table design.

## Live Demo

[Live Demo](https://rick-and-morty-nuxt4-dygrg6sf8-rosselthompsons-projects.vercel.app/)
