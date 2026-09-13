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

9. **Q-006 — resolved:** Email/password accounts cannot log in or enter the feed until their email is verified; Google accounts are verified on callback.
10. **Q-008 — resolved:** All bilingual movie fields are required. Names/directors are at most 255 characters; descriptions are at most 2,000; English/Georgian inputs use their respective scripts; year is 1888 through the current year; at least one existing genre is required; and a JPEG/PNG/WebP poster up to 10 MB is required on create and optional on update.
11. **Q-009 — resolved:** A quote image is required on create and optional on update. Accept JPEG, PNG, or WebP up to 10 MB, with no dimension restriction.
12. **Q-010 — resolved:** Hard-delete movies and cascade their genre links, quotes, comments, likes, media, and related notifications.
13. **Q-011 — resolved:** Comments are create-only. Comment authors cannot edit/delete them, and quote owners cannot remove other members' comments.
14. **Q-012 — resolved:** Unprefixed search checks movie names and quote text across both English and Georgian fields.
15. **Q-013 — resolved:** Suppress self-like/self-comment notifications. Opening one marks only it read and navigates to its quote. Mark-all stays on the current page; its control is visible only while unread notifications exist and reappears on new real-time activity.
16. **Q-014 — profile security:** Require current-password confirmation for username, email, and password changes? Can Google users change username?
17. **Q-015 — seed data:** Must demo seeders reproduce Figma users, movies, quotes, comments, and images with licensed/local assets?

## P2 — operations

18. **Q-018 — server:** What provider, operating system, path, domain, and deployment user will be used?
19. **Q-019 — services:** Reverb is accepted for real-time delivery. What persistent production SQLite path and backup policy, S3/local media, mail provider, and production queue driver should be used?
20. **Q-020 — environments:** Production only or staging plus production; which branches deploy?
21. **Q-021 — observability:** What health checks, logging/error tracking, uptime alerts, and backup requirements apply?
22. **Q-022 — deployment authority:** Prepare the workflow only, or configure secrets/server and execute deployment when credentials are supplied?
