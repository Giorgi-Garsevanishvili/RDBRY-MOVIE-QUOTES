# Open questions

Answer by ID; short answers, rules, examples, and links are welcome.

## Resolved foundation questions

1. **Q-001 — resolved:** Laravel 13, PHP 8.5.9, and latest stable compatible packages.
2. **Q-002 — resolved:** One Laravel/Inertia application using web routes and session authentication; no separate JSON API.
3. **Q-003 — partially resolved:** Git is initialized on main in the requested Desktop project. The remote, push, and PR details will be supplied later.
4. **Q-004 — resolved:** Node 24 and npm 12.0.2.
5. **Q-005 — resolved:** Use the best-fit Laravel adaptation: resources/js, camelCase variables, and pragmatic barrels.
6. **Q-016 — resolved:** Pest is the accepted automated test runner. No separate frontend or browser runner is included without an explicit requirement.
7. **Q-017 — resolved:** Review Chromium, Firefox, mobile WebKit, WCAG 2.2 AA, and the 320px minimum manually until a frontend runner is explicitly accepted.
8. **Q-007 — resolved:** Silently link a matching password account, keep its password, and make only Google-created accounts passwordless.

## P1 — domain rules needed before their slices

9. **Q-006 — activation access:** May an unverified email/password account log in, or is feed access blocked until activation?
10. **Q-008 — movie validation:** What are the exact required, minimum, maximum, script, year, genre, poster type, and size rules for movie create/edit?
11. **Q-009 — quote image:** Is an image mandatory? What file types, dimensions, and maximum size apply?
12. **Q-010 — deletion:** Hard or soft delete? When a movie is deleted, cascade-delete its quotes, comments, likes, media, and notifications, or block deletion until quotes are removed?
13. **Q-011 — comments:** Can authors edit/delete comments? Can quote owners remove other users' comments?
14. **Q-012 — plain search:** Should an unprefixed query search both movie names and quote text, and in the active locale only or both locales?
15. **Q-013 — notifications:** Suppress self-like/self-comment notifications? Does opening a notification mark only it read and navigate to the quote?
16. **Q-014 — profile security:** Require current-password confirmation for username, email, and password changes? Can Google users change username?
17. **Q-015 — seed data:** Must demo seeders reproduce Figma users, movies, quotes, comments, and images with licensed/local assets?

## P2 — operations

18. **Q-018 — server:** What provider, operating system, path, domain, and deployment user will be used?
19. **Q-019 — services:** What persistent production SQLite path and backup policy, S3/local media, mail provider, queue driver, and Reverb/Pusher/Ably choice should be used?
20. **Q-020 — environments:** Production only or staging plus production; which branches deploy?
21. **Q-021 — observability:** What health checks, logging/error tracking, uptime alerts, and backup requirements apply?
22. **Q-022 — deployment authority:** Prepare the workflow only, or configure secrets/server and execute deployment when credentials are supplied?
