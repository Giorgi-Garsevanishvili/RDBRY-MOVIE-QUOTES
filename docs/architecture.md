# Architecture proposal

Status: Accepted baseline.

## Recommended topology

Use one Laravel application with React + TypeScript rendered through Inertia. Wayfinder generates typed route functions from Laravel routes. Browser authentication uses Laravel's session guard and first-party web routes. There is no separate JSON API, duplicated client data layer, or Swagger document in the accepted baseline. Sanctum remains installed for the required stack and may be configured later only when a concrete token-protected use case exists.

## Backend boundaries

- app/Actions/{Auth,Movies,Profile,Quotes,Social}: write use cases and transaction boundaries.
- app/Http/Controllers: HTTP translation only, grouped by domain as the application grows.
- app/Http/Requests: validation and request-local authorization.
- app/Models: Eloquent models and relationships.
- app/Notifications: database and broadcast notification payloads.
- app/Policies: resource authorization.
- app/Queries: non-trivial reads and explicit Spatie Query Builder allow-lists.

Eloquent relations and database constraints are preferred over a generic repository abstraction.

## Frontend boundaries

resources/js is the Inertia equivalent of the Redberry src root:

- assets
- components
- contexts
- helpers
- hooks
- locales
- pages
- services
- types

Page-only components, hooks, helpers, and types are colocated below their page or component. Reusable files live in the global folders. The @/ alias points to resources/js. Barrel exports are used unless they produce a demonstrated bundle/cycle issue.

Inertia props remain the default server-state mechanism. TanStack Query is not part of the baseline and must not be added merely to duplicate Inertia-owned data.

## Initial data model

- users: username, primary email, password/Google identity, email verification, locale.
- pending email-change workflow: new email and verification lifecycle.
- movies: owner, bilingual name/director/description, year.
- genres and movie/genre pivot.
- quotes: author, movie, bilingual text.
- comments: author, quote, body.
- likes: unique user/quote pair.
- Laravel database notifications: payload and read time.
- Spatie media: avatar, movie poster, and quote image collections.

Constraints enforce unique usernames/emails/likes and explicit foreign-key deletion rules. Index feed order, ownership, prefixed search, and unread notification queries after exact shapes are fixed.

## Real-time and queues

Laravel broadcasting delivers like/comment notifications through Pusher Channels and Laravel Echo. Broadcast notifications and mail use the configured queue; tests use safe synchronous or fake drivers.

## Security

- Session/token invalidation, email-verification middleware, throttling, policies, and signed URLs are explicit.
- Protected Inertia routes require both an authenticated session and a verified email. Invalid browser access renders the product 403 page, while JSON requests keep Laravel's standard status payloads.
- Browser 403/404 responses use one typed Inertia boundary. The selected locale is mirrored to an allow-listed, non-sensitive cookie so unmatched routes can still render localized errors before route middleware runs.
- Search/filter input is allow-listed and never becomes raw SQL identifiers.
- Uploads validate MIME, actual image content, size, and collection ownership.
- Google OAuth uses state validation, silently links a normalized matching email, and rejects a conflicting Google identity.
- Secrets never enter Git; .env.example contains names and placeholders only.

## CI/CD shape

GitHub Actions runs locked installs, Composer validation, PHP-CS-Fixer dry run, Pest on SQLite, ESLint, Prettier check, TypeScript check, frontend tests, and a production build. Deployment from main occurs only after success and uses GitHub secrets for SSH access.

The Laravel deployment script must add maintenance/rollback safety, migrations, caches, storage handling, queue reloads, and a health check beyond the generic Redberry example.
