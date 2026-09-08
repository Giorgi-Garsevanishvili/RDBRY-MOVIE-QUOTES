# PR 04 — Registration and login plan

Status: Backend and auth UI implemented; exact login/mobile Figma comparison pending. Nothing is committed or pushed.

## Outcome

- Register a member with a unique username, email, password, and password confirmation.
- Authenticate with either username + password or email + password.
- Render localized English and Georgian registration/login forms using the accepted PR 03 locale and design tokens after PR 04 is rebased onto PR 03.
- Match Figma nodes `369:30758` and `369:30882` on desktop and `346:42858` and `346:42938` on mobile, including field error states.
- Preserve Laravel session authentication, CSRF protection, Fortify throttling, and Wayfinder route generation.

## Exclusions

- Email delivery, signed activation links, activation success/expiry screens, and password recovery belong to PR 05.
- Google authentication and account collision behavior belong to PR 06.
- The authenticated navigation shell, feed destination, and designed 403/404 pages belong to PR 07.
- No JSON API or token-authentication flow is introduced.

## Proposed data change

- Add a migration that renames `users.name` to `users.username` so existing installations have an upgrade path.
- Keep the database uniqueness constraint on email and add one for username; login by username cannot be deterministic without uniqueness.
- Update the `User` model, factory, and shared user types from `name` to `username` without adding an alias that would preserve two competing domain terms.

## Proposed backend boundaries

- A registration Form Request owns username, email, password, and confirmation validation.
- A focused registration Action creates the user and emits Laravel's registered-user event.
- A dedicated login Form Request extends Fortify's request contract to enforce the required identity and password rules.
- A focused authentication Action resolves the login identity as email or username and verifies the password.
- Fortify's login rate limiter keys on the normalized login identity and client IP.
- Every validation message is translated in English and Georgian.

## Validation contract

| Field                 | Rules                                                                               |
| --------------------- | ----------------------------------------------------------------------------------- |
| Username              | required; 3–15 characters; lowercase Latin letters and digits only; proposed unique |
| Email                 | required; valid email format; unique                                                |
| Password              | required; 8–15 characters; lowercase Latin letters and digits only                  |
| Password confirmation | required; must match password                                                       |
| Login identity        | required; minimum 3 characters; accepts an email or username                        |
| Login password        | required                                                                            |

Database constraints remain authoritative for uniqueness even when request validation already reports a friendly error.

## Test contract

- Registration page renders with typed Inertia props in both supported locales.
- Valid registration persists the normalized user and hashes the password.
- Username required/minimum/maximum/character-set/duplicate cases fail with localized field errors.
- Email required/format/duplicate cases fail with localized field errors.
- Password required/minimum/maximum/character-set/confirmation cases fail with localized field errors.
- Login succeeds with either username or email and the correct password.
- Invalid identity/password, missing/minimum identity, and throttling cases fail without authenticating.
- A successful login regenerates the session and redirects to the current authenticated placeholder until PR 07 supplies the feed.
- Registration/login navigation, password visibility, remember-me behavior, responsive overflow, and keyboard focus pass manual desktop/mobile review.
- Clicking the dimmed desktop backdrop outside the auth modal returns to the landing page without interfering with controls inside the modal.

## Accepted authentication decisions

- Usernames are unique because username login must identify exactly one account.
- An email/password member cannot authenticate until the email is verified. Authentication uses the same generic failure for wrong credentials and unverified accounts, so account state is not disclosed.
- A Google-authenticated account will be marked verified automatically in PR 06.
- Passkey and two-factor functionality is removed because neither appears in the assignment or Figma.

## Current design evidence

- Exact desktop registration context was fetched from Figma node `369:30758`.
- The Figma Starter-plan MCP limit was reached before desktop login and mobile registration/login contexts could be fetched. Pixel-accurate work on those views remains paused until exact context is available; no screen will be inferred from an incomplete reference.
- The fetched registration context is implemented as a 601px desktop modal with a 360px content column, `#222030` surface, exact PR 03 fonts/tokens, and field-level error styling.
- Desktop login and mobile auth currently reuse the proven registration structure with responsive behavior and are explicitly provisional pending their exact contexts.
- Google controls remain excluded from this slice because redirect/callback behavior belongs to PR 06; PR 04 does not render a non-functional placeholder.
- The auth shell closes to the landing page when its desktop backdrop is activated and exposes a localized accessible close target.
