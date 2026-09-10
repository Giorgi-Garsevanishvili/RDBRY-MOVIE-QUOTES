# PR 08 — Movie backend

## Outcome

Provide the authenticated movie domain boundary used by the later movie UI: persistent movies and genres, owner-only mutations, bilingual validation, poster storage, an owner-scoped query object, and an implemented database diagram.

## Included

- Movie, genre, genre pivot, and Media Library schema.
- Movie/genre models and factories.
- Required bilingual and script-specific validation.
- Release-year, genre, and poster validation from D-022.
- Owner authorization through a movie policy.
- Focused create, update, and hard-delete actions.
- Authenticated web mutation routes for the Inertia application.
- Explicit Spatie Query Builder fields, filters, sorts, and includes.
- Pest coverage for CRUD effects, authorization, uploads, localization, and owner-scoped queries.
- Database relationship diagram and traceability updates.

## Excluded

- Movie list, detail, create, edit, and delete-confirmation UI.
- Quote/comment/like/notification schema; their later migrations must implement D-023.
- A predefined genre catalog, because no authoritative genre vocabulary has been supplied.
- JSON API routes or OpenAPI documentation under D-002.

## Verification

- Focused movie suite: 31 Pest tests and 88 assertions passed.
- Full `composer ci:check`: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 128 Pest tests with 552 assertions passed after stacking on PR 07.
- The representative branch targets `codex/feat/protected-shell-errors`, keeping the PR 08 diff limited to the movie backend.
