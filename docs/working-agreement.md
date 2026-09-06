# Working agreement

## Source-of-truth order

1. The user's latest explicit rule.
2. The Redberry assignment for product and evaluation requirements.
3. Accepted entries in docs/decisions.md.
4. Exact Figma node context for visual and interaction intent.
5. Proposals in architecture and delivery documents.

Conflicts are surfaced and resolved explicitly; they are never silently reinterpreted.

## Cadence

- Ask decisions in small batches, highest-impact first.
- Record accepted answers before dependent implementation.
- Work one PR-sized slice at a time and keep it visible in docs/status.md.
- At completion report changed files, behavior, checks, Figma nodes, risks, and semantic commits.

## Definition of ready

A slice has a clear outcome and exclusions, accepted blocking decisions, exact design nodes, known data and authorization rules, stated acceptance tests, and safe local/CI substitutes for external services.

## Definition of done

- Complete happy, invalid, forbidden, empty, and relevant failure behavior.
- Server validation and authorization.
- Meaningful tests.
- Formatting, lint, type check, tests, and build pass.
- Desktop/mobile Figma comparison and accessibility basics pass.
- Documentation, traceability, and status reflect reality.
- No unrelated changes.

## Git and external actions

Branch proposal: feat/<scope>, fix/<scope>, and chore/<scope>. Commits follow docs/redberry-standards.md. Do not rewrite user history, force-push, merge, publish, or deploy without appropriate authority.
