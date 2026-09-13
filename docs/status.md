# Project status

Last updated: 2026-09-13

- Phase: Social interactions
- Active slice: PR 16 — social UI
- State: Complete and full-gate verified; awaiting commit and push confirmation
- Dependency: PR 16 is stacked on pushed branch `codex/feat/notifications-backend` at `f28e5fc`
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
- Added the owner-scoped movie-list Inertia boundary with newest-first ordering, localized names, poster URLs, and quote-count placeholders for the future quote domain.
- Added bilingual movie-name search, typed page props, controlled list components, and a coordinating `useMovieList` hook using generated Wayfinder routes.
- Added focused Pest coverage for ownership, ordering, localized data, poster presentation, query filtering, and preserved search state.
- Passed the complete PR 09 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 135 Pest tests with 617 assertions.
- Decoded the supplied local Figma file and inspected the exact desktop/mobile add, edit, movie-detail, and action-menu frames for PR 10.
- Added owner-authorized movie-detail delivery with complete bilingual fields, localized genres, poster URL, quote-count placeholder, and edit-form options.
- Added responsive create/edit movie dialogs with exact supplied vector artwork, localized fields, multi-genre selection, poster drag/drop or file selection, server validation feedback, and outside-click dismissal.
- Added the responsive movie-detail experience with localized metadata, bilingual descriptions, edit/delete actions, and navigation from movie cards.
- Preserved PR 11/12 boundaries by leaving quote creation and quote-list behavior out of the movie-management slice.
- Added focused Pest coverage for detail ownership, bilingual detail data, form genre options, and deletion redirect behavior.
- Live-verified desktop/mobile list, detail, create/edit dialog, edit submission, locale switching, and outside-click dismissal without browser errors.
- Added the required Laravel public-storage link to project setup so Spatie Media Library poster URLs resolve in the browser.
- Passed the complete PR 10 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 138 Pest tests with 668 assertions.
- Accepted required quote images using the movie upload boundary: JPEG, PNG, or WebP up to 10 MB on create, optional replacement on edit, and no dimension restriction.
- Added quote ownership and movie relationships with cascading database constraints and a named single-file Spatie Media Library image collection.
- Added thin quote mutation routes backed by Form Requests, focused actions, and creator-only update/delete policy checks.
- Enforced required bilingual script-safe quote text and restricted movie selection to movies owned by the authenticated quote creator.
- Preserved movie hard-delete cleanup by deleting quote models through their Media Library lifecycle before deleting the movie.
- Added localized English/Georgian validation and focused Pest coverage for CRUD mutations, ownership, scripts, uploads, protection, and cascade effects.
- Passed the complete PR 11 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 158 Pest tests with 734 assertions.
- Pushed PR 11 on `codex/feat/quote-backend` with focused mutation and test commits.
- Added a typed feed boundary that supplies only the signed-in member's movies to the quote composer.
- Added responsive quote creation from the feed and movie details, including bilingual fields, required drag-and-drop image input, and fixed movie context when launched from a movie.
- Replaced movie quote-count placeholders with real counts and added newest-first quote cards to movie details.
- Added a verified-member quote view with movie context, both translations, image, social-count placeholders, and creator-only edit/delete controls.
- Added responsive quote editing with optional image replacement and preserved creator/movie ownership enforcement from PR 11.
- Added focused Pest coverage for feed movie ownership, quote presentation, real quote counts, ordering, media URLs, creator controls, and unverified access.
- Live-verified the mobile feed composer, bilingual fields, localized movie selector, movie-fixed composer, and responsive movie details against the supplied local Figma source.
- Live-verified localized required-field feedback and red error states in the quote composer.
- Passed the complete PR 12 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 164 Pest tests with 839 assertions.
- Committed PR 12 as three reviewable commits covering its reusable form, read surfaces, and management view.
- Pushed the verified PR 12 stack on `codex/feat/quote-ui`.
- Added an all-member quote feed with deterministic newest-first cursor pagination and a supporting composite order index.
- Added eager-loaded feed presentation through a dedicated resource with a verified four-query page budget.
- Added responsive desktop/mobile feed and search structures from the exact connected desktop frame and supplied local Figma export.
- Added bilingual `@` movie-name and `#` quote-text search across both language fields with explicit Spatie Query Builder filtering.
- Added unprefixed general search across movie names and quote text in both languages under accepted decision D-026.
- Passed focused PR 13 Pest coverage for feed presentation, stable duplicate-free cursors, query count, prefixed search, and rejected filters.
- Passed the complete PR 13 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 172 Pest tests with 898 assertions.
- Committed PR 13 as two reviewable commits covering searchable feed delivery and responsive UI.
- Pushed the verified PR 13 stack on `codex/feat/feed-search`.
- Accepted create-only comments: no edit/delete behavior for comment authors or quote owners.
- Added comment and like tables with cascade constraints plus a unique member/quote like invariant.
- Added policy-authorized comment creation and idempotent like/unlike actions through thin controllers and generated Wayfinder routes.
- Replaced quote interaction-count placeholders with real counts on feed, quote, and movie pages.
- Passed focused PR 14 coverage for bilingual comment content, localized validation, authorization, like idempotency, database uniqueness, cascade cleanup, and presentation counts.
- Passed the complete PR 14 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 183 Pest tests with 967 assertions.
- Committed and pushed the verified PR 14 stack on `codex/feat/likes-comments`.
- Resolved notification behavior: suppress self-actions, read only the opened item before quote navigation, and keep mark-all on the current page with unread-driven visibility.
- Added persistent quote interaction notifications with recipient, actor, quote, unread, and hard-delete cascade constraints.
- Added stable like/comment payloads through Laravel database and private broadcast notification channels without selecting the still-open production provider.
- Added owner-authorized read-one and mark-all mutations through Form Requests, a policy, thin controller methods, and focused actions.
- Shared newest-first notification items and unread counts across verified-member Inertia pages for the PR 16 notification interface.
- Added focused Pest coverage for recipients, database/broadcast payloads, self and duplicate suppression, owner isolation, one/all read behavior, current-page redirects, unread transitions, and cascade cleanup.
- Passed the complete PR 15 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 192 Pest tests with 1,045 assertions.
- Committed and pushed the verified PR 15 stack on `codex/feat/notifications-backend`.
- Added ordered comment presentation and viewer-specific like state to feed and quote Inertia props without introducing a separate API.
- Added one shared, typed quote-interaction component for feed cards and quote details, with comment submission and idempotent like toggling isolated in its coordinating hook.
- Added the responsive English/Georgian notification panel with unread badge, actor/action/time/read state, outside-click dismissal, current-page mark-all behavior, and read-one navigation.
- Live-verified the desktop/mobile feed interactions and notification layouts against Figma nodes `335:23914`, `635:30899`, `346:43090`, `660:30796`, `660:31720`, and `5319:33607` using an isolated temporary SQLite database.
- Live-verified that mark-all keeps the panel open and hides at zero unread, individual opening closes the panel before quote navigation, and Georgian notification actions and relative times remain fully localized.
- Passed the provider-independent PR 16 checkpoint gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 192 Pest tests with 1,083 assertions.
- Accepted Laravel Reverb as the framework-native real-time transport and installed the compatible Reverb, Echo React, Laravel Echo, and Pusher-protocol client packages.
- Connected the notification panel to the verified member's authorized private broadcast channel and reload only the canonical shared notification prop when like or comment activity arrives.
- Added Pest coverage proving that only a verified member can authorize their own private notification channel.
- Live-verified Reverb, the database queue worker, and Echo end to end: new likes/comments arrived without refresh, mark-all stayed on the current page, and new activity restored the unread control without browser errors.
- Passed the complete PR 16 gate: ESLint, Prettier, TypeScript, Wayfinder, production build, PHP-CS-Fixer, PHPStan, and 193 Pest tests with 1,086 assertions.

## Next

1. Commit/push PR 16 only after explicit confirmation.
2. Start PR 17 only after the PR 16 review and stack are ready.
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
- The connected Figma Starter-plan limit blocks structured context for the remaining movie and quote nodes; PR 10 and PR 12 use the exact supplied local `.fig` frames instead.
