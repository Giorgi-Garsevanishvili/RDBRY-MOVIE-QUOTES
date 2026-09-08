# Project status

Last updated: 2026-09-08

- Phase: Authentication
- Active slice: PR 04 — registration and login
- State: Backend and responsive auth UI implemented; exact remaining Figma comparison pending
- Blocker: The Figma plan limit currently blocks exact login/mobile design context

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
- Created the isolated `codex/feat/registration-login` worktree without committing or pushing.
- Added unique usernames, exact registration validation, username/email login, localized validation messages, and guest registration that leaves the account unverified.
- Prevented every password login for unverified accounts, whether the member submits an email or username, while preserving a generic authentication failure.
- Recorded that Google-authenticated accounts become verified automatically in PR 06 and that 2FA/passkeys are outside the product UI.
- Stacked PR 04 on the committed PR 03 fonts, design tokens, localization foundation, and landing backdrop.
- Implemented the fetched desktop registration geometry with a 601px auth surface, 360px content column, `#222030` modal surface, responsive full-height mobile fallback, and supplied Helvetica font files.
- Localized registration/login copy and password visibility labels in English and Georgian while preserving server-localized validation feedback.
- Added an accessible auth-dialog shell whose dimmed backdrop returns to the landing page when clicked outside the modal.
- Moved auth UI types into dedicated global/component type files and isolated form and visibility behavior in matching hooks.
- Live-verified the desktop registration, validation-error, login, Georgian locale, password-toggle, navigation, and outside-click flows in the in-app browser.
- Live-verified that successful registration remains unauthenticated, shows the localized pending-verification status, and rejects subsequent username/password login until verification.
- Standardized the retained PHP suite on native Pest syntax and removed the unrequired frontend/browser test runner layer.
- Removed starter-only two-factor authentication, passkeys, Chisel, and Pao while retaining required verification, recovery, profile, and password-change behavior.
- Passed the complete PR 04 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 61 Pest tests with 194 assertions.

## Next

1. Fetch exact Figma contexts for desktop login and both mobile auth screens when the plan limit allows it.
2. Compare and refine those provisional layouts manually.

## Known risks

- The workstation runs PHP 8.5.0 while the project target is PHP 8.5.9; CI and production must use the exact target patch.
- Production SQLite requires a persistent writable path, serialized migration deployment, and a tested backup/restore policy.
- The generic Redberry CD sample is frontend-only and incomplete for a safe Laravel production deployment without adaptation.
- Several Figma names and labels contain typos or review metadata and cannot alone define product behavior.
- The login and mobile auth layouts are responsible responsive derivations, not claimed pixel matches, until their exact Figma contexts are available.
