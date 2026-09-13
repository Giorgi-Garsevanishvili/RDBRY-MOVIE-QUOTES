# PR 17 — account profile

## Outcome

Deliver the required account profile in the existing Laravel/Inertia application without retaining unrelated starter settings.

## Included behavior

- Show the authenticated member's username, verified email, and current avatar.
- Upload or replace one JPEG, PNG, or WebP avatar up to 10 MB through Spatie Media Library.
- Let password-account members change username, request a verified email change, and change password after confirming their current password.
- Keep the current email active until a 60-minute signed link sent to the pending address is opened.
- Let Google-created passwordless members change username without a password while keeping email read-only and password controls absent.
- Present English and Georgian copy and server-side validation feedback.

## Structure

- Thin settings controllers delegate writes to focused profile actions.
- Form Requests own validation, authorization, normalization, and localized messages.
- `User` owns the named single-file avatar collection and typed presentation attributes.
- The Inertia page uses one coordinating `useProfile` hook; colocated components contain structure and conditional rendering only.
- Wayfinder provides every profile mutation URL.

## Design evidence

The connected Figma context was quota-blocked, so the supplied local `.fig` export was decoded read-only. Desktop nodes `3196:32274`, `4728:32419`, and `17283:30206` established the 998px card, 528px fields, and 188px avatar. Mobile node `5131:32427` established the exact 428×926 viewport, card at 150px, avatar at 174px, and responsive field layout.

## Verification

- Focused Pest coverage: 38 profile/security tests with 133 assertions covering profile presentation, avatar boundary/replacement, username security and validation, pending-email delivery/activation/expiry, password validation, localization, Google restrictions, guest access, and unverified access.
- Frontend checks: ESLint, Prettier, TypeScript, generated Wayfinder routes, and production build.
- Backend checks: PHP-CS-Fixer, PHPStan, and the complete Pest suite.
- Manual checks: desktop/mobile Figma geometry, edit state, Georgian copy, passwordless Google state, and end-to-end Spatie avatar rendering.
- Complete gate: 222 Pest tests with 1,179 assertions plus every frontend and backend check above.

## Excluded

- Account deletion, appearance settings, two-factor authentication, passkeys, multiple email aliases, and password creation for Google-created accounts are not assignment requirements.
