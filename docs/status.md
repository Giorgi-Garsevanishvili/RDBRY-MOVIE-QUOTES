# Project status

Last updated: 2026-09-10

- Phase: Movie domain
- Active slice: PR 08 — movie backend
- State: Implemented, fully verified, committed, and published for review
- Dependency: PR 08 targets `codex/feat/protected-shell-errors`

## Completed

- Audited the empty workspace and local PHP, Composer, and Node availability.
- Read the complete Redberry Movie Quotes assignment export and its linked PHP, CI/CD, semantic commit, general quality, and React quality guidance.
- Inspected the Figma hierarchy and exact contexts for the main landing, auth, feed, search, notification, movie, quote, and profile screens.
- Recorded the specification, traceability matrix, architecture proposal, PR roadmap, visual inventory, standards, decisions, and questions.
- Accepted Laravel 13, PHP 8.5.9, the single-app Inertia topology, npm 12.0.2, and the Laravel-adapted React structure.
- Created the Laravel 13 React starter with TypeScript, Inertia 3, Tailwind 4, and Wayfinder.
- Installed and locked Sanctum, Spatie Media Library, and Spatie Query Builder.
- Initialized Git on main and relocated the active project to the requested Desktop directory.
- Verified Composer metadata, the production frontend build, direct TypeScript checking, and all 39 starter Pest tests.
- Replaced the starter's PHP formatter with the required modernized Redberry PHP-CS-Fixer ruleset.
- Added ESLint, Prettier, self-contained Wayfinder generation, and a PHP 8.5.9/SQLite GitHub Actions test workflow.
- Switched development, test, CI, and deployment database policy from MySQL to SQLite by explicit user decision.
- Passed the complete local `composer ci:check` gate.
- Reproduced the remote ESLint failure from a clean checkout without generated Wayfinder modules.
- Made lint and lint-fix generate Wayfinder modules before type-aware ESLint resolves their imports.
- Verified `npm run check` from a temporary clean checkout.
- Recorded the mandatory full `composer ci:check` gate before every commit and every push.
- Created the isolated `codex/feat/registration-login` worktree.
- Added unique usernames, exact registration validation, username/email login, localized validation messages, and guest registration that leaves the account unverified.
- Prevented every password login for unverified accounts, whether the member submits an email or username, while preserving a generic authentication failure.
- Recorded that Google-authenticated accounts become verified automatically in PR 06 and that 2FA/passkeys are outside the product UI.
- Stacked PR 04 on PR 03's fonts, design tokens, localization foundation, and landing backdrop.
- Implemented the fetched desktop registration geometry with a 601px auth surface, 360px content column, `#222030` modal surface, responsive full-height mobile fallback, and supplied Helvetica font files.
- Localized registration/login copy and password visibility labels in English and Georgian while preserving server-localized validation feedback.
- Added an accessible auth-dialog shell whose dimmed backdrop returns to the landing page when clicked outside the modal.
- Live-verified the desktop registration, validation-error, login, Georgian locale, password-toggle, navigation, and outside-click flows in the in-app browser.
- Live-verified that successful registration remains unauthenticated, shows the localized pending-verification status, and rejects subsequent username/password login until verification.
- Standardized the retained PHP suite on native Pest syntax and removed the unrequired frontend/browser test runner layer.
- Removed starter-only two-factor authentication, passkeys, Chisel, and Pao while retaining required verification, recovery, profile, and password-change behavior.
- Passed the complete PR 04 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 61 Pest tests with 194 assertions.
- Created the isolated `codex/feat/activation-recovery` worktree and stacked it on PR 04.
- Added guest-safe temporary signed activation links, account activation without implicit login, and dedicated pending/success screens.
- Recorded that activation remains unauthenticated and the success-state action directs the member to login.
- Added registered-email recovery validation, separate check-email/success states, valid-link inspection, invalid/expired-link handling, and exact 8–15 lowercase Latin/digit password rules.
- Added English and Georgian activation/recovery copy and reused the accepted PR 04 auth shell and form primitives.
- Moved activation/recovery types into dedicated files and isolated every page form/state flow in its matching hook.
- Added focused Pest coverage for mail dispatch, signed links, activation expiry, reset-token expiry, invalid tokens, localized validation, and database effects.
- Added guest-safe activation resend bound to the registration session, with localized feedback, silent verified/missing-account handling, and a six-request-per-minute limit.
- Passed the complete automated PR 05 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 84 Pest tests with 326 assertions; visual verification remains pending.
- Installed Laravel Socialite 5.31.0 with the current Laravel 13-compatible dependency set.
- Added stateful Google redirect/callback authentication, passwordless Google-created users, immediate verification, and silent same-email linking that preserves an existing password.
- Added unique Google username generation, provider-identity collision protection, bilingual controls/failure feedback, environment configuration, and official Google logo artwork.
- Added focused Pest coverage for creation, repeat login, linking, password preservation, collisions, invalid callbacks, cancellation, and username generation.
- Live-verified the desktop English and Georgian Google controls, localized cancellation feedback, and outside-click dismissal in the in-app browser.
- Passed the complete PR 06 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 93 Pest tests with 371 assertions.
- Created the isolated `codex/feat/protected-shell-errors` worktree without changing the uncommitted PR 06 worktree.
- Added verified-member protection for feed, movie-list, notification, and settings routes while rendering product 403 pages for guest or unverified browser access.
- Added designed English/Georgian 403 and 404 pages with exact matched artwork and preserved normal JSON 401/404 responses.
- Added the responsive authenticated header/sidebar and mobile drawer with Wayfinder navigation, active states, profile access, locale selection, and logout.
- Moved the shared locale selector out of the landing page and colocated shell components, hooks, types, and exact vector icons according to the React structure contract.
- Added a non-sensitive locale cookie alongside the existing session locale so unmatched routes retain the user's language on the 404 response.
- Live-verified desktop and 360px mobile shell/navigation, Georgian switching, drawer outside-click closing, and English/Georgian error experiences.
- Added focused Pest coverage for guest, verified, unverified, localized error, and JSON response behavior.
- Passed the complete PR 07 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 103 Pest tests with 501 assertions.
- Recorded the exact movie validation and hard-delete cascade decisions supplied by the user.
- Added movie, genre, pivot, and Media Library tables with owner and cascade constraints.
- Added owner-only movie mutations through Form Requests, a policy, thin controller, and focused actions.
- Added a named single-file poster collection accepting JPEG, PNG, and WebP images up to 10 MB through validated uploads.
- Added an owner-scoped Spatie Query Builder boundary with explicit fields, filters, sorts, and includes.
- Added the implemented database relationship diagram and focused movie Pest coverage.
- Passed the complete stacked PR 08 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 134 Pest tests with 589 assertions.

## Next

1. Review PR 08 against `codex/feat/protected-shell-errors`.
2. Start PR 09 movie-list UI only after the backend boundary is accepted.
3. Configure temporary Google OAuth credentials for a real-provider callback check when credentials are available.

## Known risks

- The workstation runs PHP 8.5.0 while the project target is PHP 8.5.9; CI and production must use the exact target patch.
- Production SQLite requires a persistent writable path, serialized migration deployment, and a tested backup/restore policy.
- The generic Redberry CD sample is frontend-only and incomplete for a safe Laravel production deployment without adaptation.
- Several Figma names and labels contain typos or review metadata and cannot alone define product behavior.
- The login and mobile auth layouts are responsible responsive derivations, not claimed pixel matches, until their exact Figma contexts are available.
- PR 05 activation/recovery screens reuse the accepted auth system but are not claimed as exact Figma matches until the remaining nodes can be fetched.
- PR 06 Google controls reuse the established auth geometry and official Google artwork but still require exact Figma comparison when tool access returns.
- Structured PR 07 Figma context/export remained blocked by the Starter-plan request limit; supplied frames were inspected directly and compared with the running desktop/mobile implementation.
