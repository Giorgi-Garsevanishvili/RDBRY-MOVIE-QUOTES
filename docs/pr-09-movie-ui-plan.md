# PR 09 — Movie list UI

## Outcome

Provide the authenticated member's owner-only movie list and bilingual name search on top of PR 08.

## Included

- Render the current member's movies newest first with localized names, year, poster, and quote count.
- Filter the member's list by English or Georgian movie name without exposing another member's records.
- Preserve the active search value in typed Inertia page props.
- Keep page behavior in the `useMovieList` coordinating hook and colocate page/component types.
- Use generated Wayfinder routes for movie navigation and filtering.
- Cover the server-rendered page boundary, ownership, ordering, poster URL, localization data, and query state with Pest.

## Exact Figma nodes

- Desktop movie list: `1267:31302`.
- Mobile movie list: `5319:33337`.

## Excluded

- Movie create/edit, details, and deletion UI, which move to PR 10 so this pull request remains reviewable.
- Quote creation and persistence, which move to PR 11 and PR 12.
- Feed, social interactions, and notifications.
- A new frontend/browser test runner under D-019.
- JSON API routes or OpenAPI documentation under D-002.

## Required proof

- Pest tests for owner scoping, newest-first ordering, localized data, poster URL, and bilingual search.
- ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and the complete Pest suite.
- Desktop comparison with Figma node `1267:31302`.

## Known visual limitation

The desktop list context was fetched before implementation. Figma's Starter-plan request limit blocks node `5319:33337`, so exact mobile comparison remains pending; the user explicitly requested that this bounded list slice be committed and published without waiting for that limit to reset.
