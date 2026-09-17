# PR 07 — protected shell and error pages

## Outcome

Verified members receive the responsive authenticated application shell. Guests and unverified members cannot enter protected application routes, and browser requests render the designed 403 or 404 experience instead of Laravel's default response.

Branch: `codex/feat/protected-shell-errors`

This branch is stacked on PR 06 and targets `codex/feat/google-auth`, keeping the protected-shell diff isolated from Google authentication.

## Included behavior

- Protect feed, movie-list, notification, and settings destinations with authentication and verified-email enforcement.
- Render the designed 403 page for unauthenticated or unverified browser access.
- Render the designed 404 page for unknown browser routes.
- Preserve Laravel's normal JSON 401 and 404 responses.
- Provide desktop header/sidebar navigation and the compact mobile header/drawer.
- Link feed, movie list, notifications, profile, locale, and logout through Wayfinder routes.
- Show active feed, movie-list, and notification destinations.
- Keep English and Georgian shell/error copy in typed locale dictionaries.
- Persist the selected locale in the session and an allow-listed locale cookie so an unmatched route can still render a localized 404 page.
- Keep the feed, movie-list, and notification destinations content-neutral until their dedicated roadmap slices implement domain behavior.

## Structure

- `RequireVerifiedEmail` is a focused route middleware that turns an invalid protected session into a 403 response.
- `ErrorPageResponse` owns the Inertia boundary for 403/404 browser responses.
- `AppLayout` delegates all state, route selection, and handlers to `useAppLayout`.
- `AppHeader` and `AppSidebar` are render-only components with colocated types and typed React icon components.
- Shared shell and error messages live in global locale/type folders; page-only state and types remain beside their pages.

## Design references

- Desktop error pages: Figma `223:15561` and `225:15639`.
- Mobile error pages: Figma `346:43027` and `346:43046`.
- Protected shell reference: Figma `335:23914`, `346:43090`, and `5319:33293`.
- Error artwork uses the exact ghost, Gandalf, and union bitmap assets matched to the supplied Figma frames.
- Shell navigation icons preserve the assignment vector geometry as typed React components; no raw SVG files were added.

The structured Figma context/export endpoint was unavailable because the file reached its Starter-plan request limit. The referenced frames were therefore inspected directly in Figma and compared with the running application at desktop and 360px mobile widths.

## Verification

- Pest covers guest rejection for every protected destination.
- Pest covers verified access to the shell destinations.
- Pest covers unverified-member rejection.
- Pest covers browser 404 rendering, locale propagation, and unchanged JSON responses.
- The running application was reviewed for desktop/mobile navigation, active states, Georgian switching, drawer opening/outside-click closing, and English/Georgian error pages.
- The full `composer ci:check` gate is required before review handoff and must run again immediately before any future commit or push.

## Excluded from this slice

- Feed posts, search, and infinite loading.
- Movie CRUD or list content.
- Notification data, unread counts, and real-time delivery.
- Profile redesign and profile mutations.
- Google provider behavior, which remains isolated in PR 06.
