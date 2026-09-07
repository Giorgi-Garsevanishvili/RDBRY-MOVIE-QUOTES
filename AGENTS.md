# Movie Quotes agent instructions

These instructions apply to all work in this repository.

## Start with the active contract

1. Read docs/status.md, docs/decisions.md, and the active slice in docs/delivery-plan.md.
2. Read relevant requirements in docs/product-spec.md, docs/requirements-traceability.md, and docs/redberry-standards.md.
3. For UI work, read the relevant nodes in docs/figma-inventory.md and fetch exact Figma design context before coding.
4. Inspect the worktree, preserve user changes, and keep edits inside the active PR scope.
5. If a required decision is still Open, ask instead of silently choosing architecture, ownership, security, or deployment behavior.

## Non-negotiable stack and delivery rules

- Laravel, SQLite, Sanctum, Pest, Spatie Media Library, Spatie Query Builder, and PHP-CS-Fixer.
- React, TypeScript, Inertia, Wayfinder, Tailwind CSS, ESLint, and Prettier.
- English and Georgian UI/content, Google authentication, verified registration/email change, and real-time notifications.
- Semantic commits, automated CI/CD, server deployment, database diagram, and an English README. Swagger/OpenAPI is required only if JSON API routes are later introduced.

Do not change the accepted stack or topology independently; record any superseding decision in docs/decisions.md.

## Backend structure

- Keep controllers thin.
- Put validation in Form Requests, authorization in policies, write use cases in focused Actions, and non-trivial read composition in query objects.
- Use Eloquent relationships and database constraints by default. Do not add a generic repository layer without a demonstrated need.
- Use API Resources at JSON boundaries and typed Inertia props at page boundaries.
- Explicitly allow every Spatie Query Builder filter, sort, field, and include.
- Use named Media Library collections/conversions instead of ad-hoc upload paths.
- Enforce authorization server-side on every mutation and resource route.

## React structure and standards

- Treat resources/js as the React source root in the Laravel/Inertia application.
- Use resources/js/components for global components, pages for routes, hooks for global hooks, contexts for contexts, helpers for helpers, locales for translations, services for API calls, types for global types, and assets for media.
- Colocate page-only components under their page and component-only hooks, helpers, and types under their component.
- Use the @/ absolute-import alias. Use relative imports only for tightly colocated files and local barrel exports.
- Export folders through index.ts where this does not create a measured tree-shaking or cycle problem.
- Component filenames and default component exports use PascalCase; hooks begin with use; helpers/config/services/types use camelCase; immutable configuration constants use SCREAMING_SNAKE_CASE; media files use kebab-case.
- Keep reusable components controlled by props and free of route/global assumptions. Prefer composable building blocks over configuration-heavy monoliths.
- Separate rendering from stateful behavior. A component should call at most one coordinating custom hook when it otherwise needs multiple hooks.
- Keep complex conditions and expressions out of JSX.
- Type all props, hook state, service inputs, and service outputs. Avoid any, TypeScript enums, and application-owned declaration files.
- Use Wayfinder route functions instead of handwritten backend URLs. JSON API calls, when needed, live in typed domain service files using one configured HTTP client.
- Do not fetch data manually in useEffect. Inertia page props are the default source; use TanStack Query only for accepted client-managed asynchronous flows.

## Figma rule

Load the Figma design-to-code guidance and request the exact desktop/mobile node before implementing a screen. Treat returned code as reference, map it to project tokens/components, and preserve exact exported artwork. Figma asset URLs are temporary. Convert exact exported SVG data to typed React components where Redberry's no-raw-SVG-file convention applies; do not redraw icons. Green/yellow Figma status frames are design-review metadata, not product UI.

## Quality and completion

- Pest feature tests cover happy paths, validation, authorization, localization, uploads, notifications, and database effects.
- Add focused frontend interaction tests once the runner is accepted; avoid snapshot-only proof.
- Run focused checks while iterating and the full applicable PR gate before completion.
- Before every commit and again immediately before every push, run the full `composer ci:check` gate. Never commit or push while any check is failing.
- Keep comments rare and explanatory; never leave commented-out code.
- Update docs/status.md and traceability for every completed slice.
- A slice is complete only when behavior, tests, formatting, linting, type checks, build, relevant Figma checks, and documentation pass.

Semantic commit format is type(scope): present-tense description, lowercase except proper names/protocols, no terminal punctuation, and at most 50 characters in the subject. Breaking changes include an exclamation mark and a BREAKING_CHANGE body.
Use concise bullet points in the commit body whenever the change needs explanation, including its outcome and verification evidence.
