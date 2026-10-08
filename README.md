# QuestMaster Frontend

QuestMaster Frontend is the web client for the QuestMaster RPG management app. It is a server-rendered Next.js app (React Server Components + Server Actions) that talks to the backend exclusively through the QuestMaster Gateway.

## What is in the app today

- `/` shows the dashboard welcome screen.
- `/campaigns` lists campaigns and creates new ones in a modal.
- `/campaigns/[slug]` shows a campaign: status lifecycle, invite link, players, deletion.
- `/characters` lists characters and creates new ones in a modal.
- `/characters/[slug]` shows a character sheet with an HP control and deletion.
- `/join/[hash]` lets a player accept a campaign invite with one of their characters.
- The UI is translated with `next-intl` and currently ships `pt-BR` translations.
- Theme (light/dark) follows the system preference or `localStorage`, applied before hydration.

## Tech stack

- Next.js 16 (App Router, Server Components, Server Actions)
- React 19 (`useActionState`, `useFormStatus`, transitions)
- TypeScript
- CSS Modules + CSS custom properties (design tokens)
- next-intl
- yup (server-side validation of Server Action input)
- Vitest + Testing Library (unit and component tests)

## Prerequisites

- Node.js and Yarn
- The QuestMaster Gateway running (default `http://localhost:8081`)

Configure the environment (e.g. in `.env.local`):

| Variable              | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `CORE_API_URL`        | Base URL of the **Gateway** (not the core service directly)    |
| `SESSION_COOKIE_NAME` | Session cookie set by the Gateway (e.g. `QUESTMASTER_SESSION`) |

## Getting started

```bash
yarn install
yarn dev        # Next.js + tsc --watch
yarn dev:light  # Next.js only
```

Open `http://localhost:3000`.

## Available scripts

- `yarn dev` runs Next.js and `tsc --watch` together
- `yarn dev:light` runs only the Next.js dev server
- `yarn build` / `yarn start` build and serve the production app
- `yarn typecheck` / `yarn typecheck:watch` run TypeScript without emitting files
- `yarn lint` / `yarn lint:watch` run ESLint (including the architecture boundary rules)
- `yarn format` / `yarn format:check` run Prettier
- `yarn test` / `yarn test:watch` run the Vitest suite

## Architecture

### Rendering and data flow

```text
Browser ──► Next.js server ──► Gateway ──► services
             │  RSC pages read data on the server (no client fetching)
             │  Server Actions handle every mutation
             └─ only the session cookie is forwarded; tokens never reach the browser
```

- **Reads**: route pages render module _views_ (async Server Components) that call _loaders_. Loaders wrap use cases in React `cache()` so `generateMetadata` and the page share one request.
- **Writes**: forms post to Server Actions (`useActionState`), which validate input with yup, call a use case and `revalidatePath()`. Actions that leave the page (delete, accept invite) end with `redirect()`.
- **Feedback after redirects**: actions call `setFlash()`; `<FlashToaster>` shows the toast on the next page.
- **Loading / errors**: `loading.tsx` skeletons, `Suspense` streaming (user greeting, invite characters), `error.tsx`, and per-module `not-found.tsx` (API 404 → `notFound()`).
- **Modals**: create forms and delete confirmations open in a native `<dialog>` (`DialogButton` / `ConfirmDeleteButton`); on success the action revalidates the list and the form closes the dialog.
- **Client Components** are limited to interactive islands: forms, dialogs, toasts, HP stepper, status buttons, copy-to-clipboard, active nav link.

### Feature modules (Clean Architecture)

Each module in `src/modules/<feature>` follows the same layers, with dependencies pointing inwards:

```text
<feature>/
  domain/          entities, value types and business rules (pure TS)
  application/     repository ports + use cases (no framework, no I/O)
  infra/           DTOs, mappers and the HTTP repository (implements the port)
  presentation/    loaders, Server Actions, schemas, components and views
  <feature>.container.ts   composition root wiring use cases to infra (server-only)
  index.ts         public API for routes (server only)
```

Shared code lives in `src/lib` (HTTP client, errors, action helpers, flash) and `src/modules/shared` (cross-module UI such as confirm dialogs and skeletons). ESLint enforces the boundaries: `domain` and `application` cannot import React/Next or outer layers.

> Client components must import specific files from other modules, never a module's `index.ts` (it re-exports server-only loaders).

### Design system (Atomic Design)

`src/design` is business-agnostic (ESLint forbids importing modules or `lib`):

```text
design/
  foundations/  tokens (CSS variables), global styles, fonts, theme script
  atoms/        button, text, title, input, select, badge, card, stack, skeleton…
  molecules/    field, breadcrumb, brand, empty-state, loader, nav, copy-field…
  organisms/    header, dialog (native <dialog>), toaster
  templates/    app-shell, list-page, detail-page
```

The Atomic Design _pages_ are the routes in `src/app`. Components are Server Components unless they need interactivity (`'use client'` is the exception, not the rule).

## Project structure

```text
src/
  app/         Routes, layouts and loading/error/not-found boundaries
  design/      Design system (Atomic Design)
  i18n/        Locale loading and translation files
  lib/         HTTP client, shared errors, Server Action helpers, flash messages
  modules/     Feature modules (campaign, character, invite, user, rpg, shared)
```

## Notes for contributors

- The frontend only needs to know about the Gateway; authentication is handled there through the session cookie. A `401` from the Gateway carries a `redirectUrl` and the HTTP client redirects to login.
- Server Actions are public endpoints: validate every argument, and bind ids on the server (`action.bind(null, id)`) instead of trusting form fields.
- Domain errors carry translation keys as messages; API errors are shown as-is.
- Tests live next to the code (`*.test.ts(x)`). Unit-test domain rules, use cases (with fake repositories), mappers and schemas; component-test only client components with behavior, rendered with `renderWithProviders` from `src/test/render.tsx`. Async Server Components are left to E2E.

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.
