# PR 06 — Google authentication

## Outcome

Members can register or sign in through Google from the existing registration and login dialogs. A successful callback creates or resolves one local user, starts the normal Laravel session, and redirects to the protected dashboard.

## Account rules

- A Google-created account is verified immediately and has no password.
- A matching password account is linked silently by normalized email, marked verified, and keeps its existing password. It can then use either login method.
- An email already linked to a different Google identity is rejected without changing either account.
- Returning Google members are resolved by the stable Google identifier before email.
- A unique 3–15 character lowercase Latin/digit username is derived from the Google nickname, name, or email. A numeric suffix resolves local collisions.
- OAuth access and refresh tokens are not stored because the product only needs authentication.

## Implementation boundaries

- Laravel Socialite owns the stateful Google redirect and callback exchange.
- The controller owns redirects and session regeneration; `AuthenticateGoogleUser` owns normalization, linking, and creation inside a database transaction.
- `users.google_id` is nullable and unique. `users.password` becomes nullable for Google-created accounts.
- Google client ID, secret, and callback URL remain environment values and never enter Git.
- Registration and login reuse one controlled Google button component and Wayfinder-generated URLs.
- English and Georgian labels and callback failure feedback are included.

## Verification

Pest covers provider redirect, new passwordless account creation, verification, returning login, silent password-account linking, password preservation, conflicting provider identities, invalid provider data, cancellation, username collision handling, and refusal of password login for passwordless accounts.

The complete project gate passes ESLint, Prettier, TypeScript, Wayfinder generation, the production build, PHP-CS-Fixer, PHPStan, and 87 Pest tests with 334 assertions. Desktop English and Georgian controls, localized cancellation feedback, and outside-click dismissal were also checked in the running application. Real-provider and mobile visual checks remain pending.

## Exclusions

- Profile editing remains PR 16. That slice will hide password controls and make email read-only for passwordless Google accounts.
- Provider tokens, additional Google scopes, Google API access, and a separate JSON API are not required.
- Real Google credentials are required only for manual end-to-end provider verification outside automated tests.

## Design status

The Google controls extend the established PR 04 auth dialogs and use Google's official current logo asset. Exact Figma context requests for desktop registration node `369:30758` remain blocked by the Figma Starter-plan tool limit, so final pixel comparison remains a review gate.
