# Project status

Last updated: 2026-09-08

- Phase: Public experience
- Active slice: PR 03 — Design system + landing
- State: Verified locally; ready for review
- Blocker: None

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
- Pushed the focused hotfix to `origin/codex/fix/wayfinder-ci-order` after a second full gate.
- Kept the published PR 01 bootstrap and PR 02 quality-gate work combined by explicit user decision.
- Created `codex/feat/design-system-landing` from synchronized `origin/main`.
- Inspected exact Figma landing nodes `337:29589` (desktop) and `346:43181` (mobile).
- Recorded the accepted landing copy, mobile localization, supplied-font, browser, accessibility, and minimum-width decisions.
- Added the exact three Figma stills and the supplied Helvetica Georgian/Latin font files as local assets.
- Added bilingual design tokens, natural English/Georgian landing content, session-persisted locale handling, and typed Inertia props.
- Implemented the public header, hero, three cinematic quote sections, footer, and Wayfinder registration/login navigation.
- Standardized the retained PHP suite on native Pest syntax and removed the unrequired frontend/browser test runner layer.
- Removed starter-only two-factor authentication, passkeys, Chisel, and Pao while retaining required verification, recovery, profile, and password-change behavior.
- Verified the live page in the connected browser at 1920px, 428px, and 320px; dimensions, fonts, locale persistence, and horizontal overflow match the accepted contract.
- Inspected the Must Awards 2016 source and live behavior, then added its desktop fixed-backdrop and 1.2× exit-parallax motion with mobile and reduced-motion fallbacks.
- Moved landing types into dedicated global/component type files and isolated stateful page/component behavior in matching `useLanding`, `useLocaleMenu`, and `useQuoteSection` hooks.
- Reviewed the settled responsive page for accessibility, route targets, locale persistence, document language, and horizontal overflow.
- Passed the complete PR 03 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 38 Pest tests with 128 assertions.

## Next

1. Review PR 03.
2. Continue with the stacked PR 04 authentication slice.

## Known risks

- The workstation runs PHP 8.5.0 while the project target is PHP 8.5.9; CI and production must use the exact target patch.
- Production SQLite requires a persistent writable path, serialized migration deployment, and a tested backup/restore policy.
- The generic Redberry CD sample is frontend-only and incomplete for a safe Laravel production deployment without adaptation.
- Several Figma names and labels contain typos or review metadata and cannot alone define product behavior.
