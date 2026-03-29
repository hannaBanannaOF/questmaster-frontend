# QuestMaster Frontend

QuestMaster Frontend is the web client for the QuestMaster RPG management app. It currently focuses on browsing campaigns and characters, with a small dashboard, a shared design system, and data fetching wired through the QuestMaster Gateway.

## What is in the app today

- `/` shows the dashboard welcome screen.
- `/campaigns` lists campaigns from the backend.
- `/characters` lists characters from the backend.
- The UI is loaded with `next-intl` and currently ships `pt-BR` translations.
- Theme state is handled client-side and persisted in `localStorage`.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- styled-components
- TanStack Query
- next-intl
- dayjs

## Prerequisites

Before starting the frontend, make sure you have:

- Node.js installed
- Yarn available on your machine
- The QuestMaster Gateway running on `http://localhost:8081`

The frontend currently uses a hardcoded Gateway base URL in `src/lib/http/http.client.ts`, so the Gateway must be available at that address unless the code is changed.

## Getting started

Install dependencies:

```bash
yarn install
```

Start the development server with the TypeScript watcher:

```bash
yarn dev
```

If you only want the Next.js dev server without the parallel typecheck watcher:

```bash
yarn dev:light
```

Open `http://localhost:3000` in your browser.

## Available scripts

- `yarn dev` runs Next.js and `tsc --watch` together
- `yarn dev:light` runs only the Next.js dev server
- `yarn typecheck` runs TypeScript without emitting files
- `yarn typecheck:watch` runs TypeScript in watch mode
- `yarn lint` runs ESLint
- `yarn lint:watch` reruns ESLint on file changes
- `yarn format` formats the repo with Prettier
- `yarn format:check` checks formatting without changing files

## Project structure

```text
src/
  app/         Next.js routes and root layout
  design/      Design tokens, theme setup, and shared UI components
  i18n/        Locale loading and translation files
  lib/         Shared HTTP and query client setup
  modules/     Feature modules such as campaign, character, and RPG metadata
  proxy.tsx    Request proxy logic for slug resolution
```

## Notes for contributors

- Data fetching is handled through TanStack Query providers in the root layout.
- The app uses `styled-components` with global design tokens under `src/design/styles`.
- The frontend only needs to know about the Gateway. Backend services can run on any ports as long as the Gateway is updated to route requests correctly.
- Authentication is handled by the Gateway through a session cookie. That flow is infrastructure-level behavior, not something most frontend work in this repo needs to worry about.
- Some UI actions are still placeholder-only right now. For example, the "new" buttons do not create records yet, and list cards currently link to `/`.
- There is no environment-based API configuration yet. If you want different Gateway URLs per environment, the next step is to move the base URL out of `src/lib/http/http.client.ts`.

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.
