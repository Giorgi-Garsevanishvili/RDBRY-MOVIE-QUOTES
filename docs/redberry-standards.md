# Redberry standards adopted by this project

This checklist is derived from the assignment's linked Redberry resources. The source articles remain authoritative.

## Git

- Format: type(scope)!: short description, with an optional body after a blank line.
- Subject is at most 50 characters, present tense, normally lowercase, and has no punctuation.
- Types include fix, feat, style, refactor, chore, docs, test, ci, and wip.
- Breaking commits use an exclamation mark and a BREAKING_CHANGE body.
- Keep commits small and readable.

## PHP

- Install friendsofphp/php-cs-fixer as a project development dependency.
- Use the Redberry PHP-CS-Fixer configuration.
- Format the baseline immediately after setup so later diffs stay focused.
- Provide Composer scripts for formatting and CI checking.

## React components and hooks

- Extract components for readability as well as reuse; never use JSX section comments instead of decomposition.
- Reusable components are controlled by props and avoid route/global assumptions.
- Prefer small building blocks with replaceable composition over an option-heavy component.
- Separate stateful logic from rendering. If a component needs multiple hooks, expose one coordinating custom hook colocated with it.
- Put state-free functions in a colocated helper file.
- Avoid nested ternaries and complex inline JSX expressions.
- Default-export components and preserve native element props in primitives.
- Avoid deep prop drilling; use narrowly scoped context when genuinely shared and do not overuse global context.
- Fully type hooks and state. Use lazy initializers for expensive state and do not use updater-only state.
- Use useEffect only to synchronize with systems outside React, not for ordinary data fetching or derived/initial state.
- Use memoization, transition, and effect variants only for demonstrated needs.

## Files and names

- resources/js is this Inertia project's source root.
- Global components, assets, pages, contexts, hooks, locales, types, helpers, and services use the folders documented in AGENTS.md.
- Page-only pieces are colocated under the page; component-only helpers/hooks/types are colocated under the component.
- Component files/default exports use PascalCase. Hooks begin with use. Helpers, config, services, and type files use camelCase. Media uses kebab-case. Immutable configuration constants use SCREAMING_SNAKE_CASE.
- Use @/ absolute imports. Relative imports are limited to tightly colocated files and barrel internals.
- Export folders through index.ts except when a documented cycle/tree-shaking problem requires direct import.
- The source page says ordinary variables use “pascalCase”, but its examples and normal JavaScript usage use camelCase. This project proposes camelCase pending confirmation.
- Preserve exact Figma SVG data but represent it as a React component rather than committing a raw SVG file.

## TypeScript

- Prefer type aliases unless interface declaration merging or a class contract is needed.
- Avoid enums, application-owned declaration files, any, and one-letter generic names.
- Derive unions/types from immutable configuration where useful.
- Reuse library-exported types instead of recreating or bypassing them.

## Asynchronous state and API

- Do not fetch in useEffect.
- Prefer Inertia server props for page data in the accepted monolith topology.
- If client-managed API state is substantial, use TanStack Query with centralized SCREAMING_SNAKE_CASE query-key constants ending in QUERY_KEY; put dynamic parameters in an object.
- Use useQueries when one component needs several parallel queries.
- Centralize the HTTP client and create typed domain service functions; do not inline endpoint strings or auth headers.
- Pass query parameters through the client's params option and return the complete typed response.

## README, diagrams, and API docs

- README is English and includes table of contents, introduction, prerequisites, tech stack, getting started, development, deployment, and resources.
- Maintain an accessible database relationship diagram.
- Document API routes with Swagger/OpenAPI when the application exposes an API.
- Prefer expressive code over comments; never leave commented-out code.

## CI/CD

- GitHub Actions runs on the agreed main workflow.
- Run install, build, lint, and test gates before deployment.
- Store SSH host, username, and private key in GitHub secrets.
- Deploy by SSH only after checks succeed. The project-specific Laravel deployment must safely handle dependencies, build, migrations, caches, workers, health checks, and rollback.

## Sources

- [Assignment](https://redberry.gitbook.io/assignment-v-movie-quotes-upgraded)
- [React quality criteria](https://redberry.gitbook.io/resources/kodisa-da-proektis-shepasebis-kriteriumebi/reaktis-kodis-khariskhis-kriteriumebi)
- [General quality criteria](https://redberry.gitbook.io/resources/kodisa-da-proektis-shepasebis-kriteriumebi/proektisa-da-kodis-khariskhis-zogadi-kriteriumebi)
- [PHP-CS-Fixer](https://redberry.gitbook.io/resources/laravel/php-is-linteri)
- [Semantic commits](https://redberry.gitbook.io/resources/other/git-is-semantikuri-komitebi)
- [CI/CD](https://redberry.gitbook.io/resources/other/ci-cd-pipeline-is-gamartva)
