# Delivery and pull-request plan

Status: Provisional roadmap.

## PR size rules

- Aim for 150–500 meaningful changed lines, excluding lockfiles, generated Wayfinder types, and exact assets.
- One primary user outcome and one main reason to change per PR.
- Split when review requires understanding multiple new domain boundaries.
- Do not bundle unrelated cleanup.

## Roadmap

|  PR | Slice                        | Outcome                                                                                                                               | Required proof                                                                            |
| --: | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
|  00 | Discovery contract           | Requirements, traceability, decisions, Figma map, standards, workflow, project skill                                                  | Linked docs and validated skill                                                           |
|  01 | Bootstrap + quality baseline | Compatible Laravel/Inertia/React/TS/Tailwind/Wayfinder project with PHP-CS-Fixer, ESLint, Prettier, Pest, and GitHub Actions + SQLite | Composer validation, static analysis, format/lint/type checks, Pest, and production build |
|  02 | Reserved                     | Folded into PR 01 at the user's request; do not create a separate PR                                                                  | Not applicable                                                                            |
|  03 | Design system + landing      | Tokens, exact assets/fonts, public shell, locale, responsive landing                                                                  | Desktop/mobile Figma and accessibility check                                              |
|  04 | Registration + login         | Exact validation, login by username/email, logout, Sanctum role                                                                       | Pest happy/error/duplicate/throttle cases                                                 |
|  05 | Activation + recovery        | Account activation and complete reset/expiry flows                                                                                    | Pest signed-link, expiry, invalid-token, mail cases                                       |
|  06 | Google auth                  | Redirect/callback, account creation/linking, Google profile rules                                                                     | Mocked provider and collision tests                                                       |
|  07 | Protected shell + errors     | Desktop/mobile nav, authorization, designed 403/404                                                                                   | Guest/member tests and Figma check                                                        |
|  08 | Movie backend                | Schema, bilingual validation, policies, poster, queries, and ERD                                                                      | Pest CRUD/owner/upload/query cases                                                        |
|  09 | Movie UI                     | List/search, create/edit, details, deletion                                                                                           | Interaction tests and Figma check                                                         |
|  10 | Quote backend                | Schema, script validation, policy, image, and movie ownership                                                                         | Pest CRUD/owner/language/upload/delete cases                                              |
|  11 | Quote UI                     | Create from feed/movie, preselection, view/edit/delete                                                                                | Interaction tests and Figma check                                                         |
|  12 | Feed + search                | Newest feed, stable infinite loading, plain/@/# search                                                                                | Query tests, no duplicates, query count                                                   |
|  13 | Likes + comments             | Idempotent likes and comment rules                                                                                                    | Pest authorization/idempotency/concurrency                                                |
|  14 | Notification backend         | Broadcast/database notifications, unread/read/all-read                                                                                | Pest recipient/payload/read/broadcast                                                     |
|  15 | Social UI                    | Feed likes/comments and real-time notifications                                                                                       | Interaction/failure tests and Figma check                                                 |
|  16 | Profile                      | Avatar, username, verified email change, password, Google restrictions                                                                | Pest re-auth/validation/media/OAuth cases                                                 |
|  17 | Hardening                    | A11y, responsive edges, localization, performance, security, states                                                                   | Full suite and no P0/P1 defects                                                           |
|  18 | CD + deployment              | Production services, deployment, and runbook                                                                                          | Green deploy, smoke test, health/rollback                                                 |

## Slice lifecycle

1. Confirm unresolved decisions and exact Figma nodes.
2. Record accepted decisions.
3. Define acceptance tests and exclusions.
4. Implement the smallest complete vertical slice.
5. Run focused checks, then the full applicable gate.
6. Compare affected desktop/mobile UI with Figma.
7. Update status and traceability.
8. Use small semantic commits matching the slice.

The project is done only when every required traceability row is verified, CI passes from a clean checkout, and the production deployment passes its key-journey smoke test.
