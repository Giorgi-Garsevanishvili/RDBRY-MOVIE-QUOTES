# PR 05 — Activation and password recovery

## Outcome

A password-based member receives a signed activation link after registration, activates the account without being implicitly signed in, and can then log in. A member who forgets a password can request a reset link, set a valid replacement password, and receive clear success or expired-link states.

## Included

- Registration redirects to the activation check-email screen and dispatches Laravel's verification notification.
- Activation links are temporary, signed, hash-bound to the account email, rate-limited, and usable without an existing session.
- Valid activation records `email_verified_at`, emits Laravel's `Verified` event, and redirects to the activated screen.
- Recovery accepts only a required, valid, registered email address and normalizes surrounding whitespace and case.
- Valid recovery requests send Laravel's reset notification and redirect to a separate check-email screen.
- Reset links are inspected before rendering the form; invalid and expired tokens render the expired-link state.
- New passwords use the assignment rule: required, 8–15 characters, lowercase Latin letters and digits only, with required matching confirmation.
- Successful resets update the stored password, consume the token through Laravel's broker, and redirect to a success screen.
- All UI copy and validation messages are available in English and Georgian.

## Excluded

- Google authentication, which belongs to PR 06.
- Protected navigation and designed 403/404 pages, which belong to PR 07.
- Profile email-change verification, which belongs to PR 16.
- A separate JSON API or frontend/browser test runner.
- Automatic login from the activation link unless the user explicitly confirms that behavior.

## Required proof

- Pest tests for registration notification delivery, signed-link validation, expiry, repeated activation, and database effects.
- Pest tests for recovery validation, localization, notification delivery, valid/invalid/expired tokens, password rules, and success redirects.
- ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and the complete Pest suite.
- Manual desktop/mobile comparison with Figma nodes `369:31166`, `2943:31973`, `2943:31604`, `2943:31809`, `17043:30119`, `346:43068`, `2968:32184`, `2968:32353`, `2968:32304`, `2968:32449`, `17043:31053`, and `17043:30961`.

## Current visual limitation

Figma returned the email-verification context for node `369:31166`, then blocked the remaining requests at the Starter-plan MCP limit. The functional screens therefore reuse PR 04's accepted auth shell and components but are not marked as visually verified yet.
