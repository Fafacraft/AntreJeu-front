# AntreJeu Frontend

The AntreJeu frontend is a React application built with Vite and TypeScript.

It provides the client-side interface for discovering board games, venues, players, and gaming sessions. The frontend is maintained independently from the backend and deployment repositories.

## Tech stack

- **React** — component-based user interface.
- **TypeScript** — static typing.
- **Vite** — development server and production build.
- **ESLint** — code-quality and linting rules.
- **Prettier** — consistent code formatting.
- **Vitest** — unit and component test runner.
- **React Testing Library** — testing React components through their user-facing behavior.
- **Husky** — Git hooks for running checks before commits.
- **lint-staged** — runs configured checks against staged files.
- **Sentry** — frontend error monitoring.

## Prerequisites

Install a compatible Node.js version and npm. The production Dockerfile currently uses Node.js 24.

Check your local installation:

```bash
node --version
npm --version
```

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Fafacraft/AntreJeu-front.git
cd AntreJeu-front
npm ci
```

`npm ci` installs the versions recorded in `package-lock.json`. Use it for reproducible local setup and CI builds.

## Development server

Start Vite's development server:

```bash
npm run dev
```

Use the local URL printed by Vite in the terminal.

## Code quality and tests

The project includes multiple quality checks. Each has a separate responsibility.

### ESLint

ESLint checks the source code for common errors, problematic patterns, and violations of the project's configured rules.

```bash
npm run lint
```

The configuration includes the recommended ESLint and TypeScript ESLint rules, React rules, and React Hooks rules.

When linting fails, fix the reported errors rather than suppressing them without justification.

### Prettier

Prettier enforces consistent formatting across the codebase.

Check formatting without changing files:

```bash
npm run format:check
```

Run the followin to apply formatting:

```bash
npm run format
```

Prettier is responsible for formatting; ESLint is responsible for linting. Keeping these responsibilities separate makes the checks easier to understand.

### Tests with Vitest

Run the test suite:

```bash
npm run test:run
```

Tests should verify component behavior and important application logic. React Testing Library should generally be used to test what users can observe and interact with, rather than relying on implementation details.

When adding a feature, add or update tests for its expected behavior.

For a full coverage test, run :

```bash
npm run test:coverage
```

### Production build

Build the application:

```bash
npm run build
```

Vite produces the production files in `dist/`. The Docker image copies these files into an Nginx image for serving.

A successful development server does not guarantee a successful production build, so the build check remains part of the validation workflow.

### Run all checks

The `check` script combines the main quality gates:

```bash
npm run check
```

It runs the following commands in order:

1. `npm run lint`
2. `npm run format:check`
3. `npm run test:run`
4. `npm run build`

Because the commands are chained with `&&`, the process stops when a command fails. Fix the first failing check and rerun the script.

## Git hooks: Husky and lint-staged

Husky manages Git hooks, and lint-staged runs configured checks against files staged for commit.

This helps catch issues before they enter the repository's history.

Typical workflow:

```bash
git add src/
git commit -m "Implement feature"
```

If a configured pre-commit check fails, the commit may be rejected. Follow the reported errors, fix the files, stage the changes again, and retry the commit.

The pre-commit hook is a convenience, not a replacement for running the full test suite and build. Some checks may only run in CI.

Avoid bypassing hooks unless there is a justified exceptional reason.

## Sentry

Sentry is used to collect frontend error reports.

The frontend reads its public DSN from the Vite environment:

```typescript
import.meta.env.VITE_SENTRY_DSN;
```

The actual initialization is implemented in the project's Sentry setup code.

For local development, configure the appropriate Vite environment variable in a local environment file. Do not commit real environment files containing local settings.

## Docker

The frontend Dockerfile uses a multi-stage build:

1. A Node.js stage installs dependencies and builds the Vite application.
2. An Nginx stage serves the generated static files.

This keeps Node.js and the build dependencies out of the final runtime image.

The deployment repository owns the Compose configuration and the Nginx configuration files. The frontend repository owns the frontend source and Dockerfile.

To build the frontend image through the deployment repository, run the Compose commands from that repository:

```bash
docker compose build frontend
docker compose up -d frontend
```

The frontend container is intended to be accessed through the deployment repository's reverse proxy, rather than exposing its own port publicly.

## Branching and contributions

The project uses the following branch flow:

- `feature/*` — individual changes.
- `staging` — integrated changes ready for validation.
- `main` — production-ready code.

Create a feature branch from `staging`:

```bash
git switch staging
git pull origin staging
git switch -c feature/my-feature
```

Make your changes, run the quality checks, and commit:

```bash
npm run check
git add .
git commit -m "Implement my feature"
git push -u origin feature/my-feature
```

Open a pull request into `staging`.

Once the integrated application has been validated, changes are promoted from `staging` to `main` through a pull request.

The deployment repository separately records the exact frontend commit used in each deployed version. Merging code into the frontend's `main` branch does not automatically update the deployment repository's submodule reference.

## Before opening a pull request

- [ ] The application runs locally.
- [ ] ESLint passes.
- [ ] Prettier formatting check passes.
- [ ] Tests pass.
- [ ] The production build succeeds.
- [ ] Relevant tests have been added or updated.
- [ ] No private credentials or local `.env` files are committed.
- [ ] The change is pushed to the correct feature branch.
