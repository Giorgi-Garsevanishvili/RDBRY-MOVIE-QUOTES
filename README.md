# Movie Quotes

Movie Quotes is a responsive, bilingual social platform where members maintain a personal movie library, publish movie quotes, and interact through likes, comments, and real-time notifications.

## Table of contents

- [Project state](#project-state)
- [Prerequisites](#prerequisites)
- [Technology](#technology)
- [Documentation](#documentation)
- [Getting started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Resources](#resources)

## Project state

Discovery is complete and the foundation is active. The repository contains the official Laravel 13 React starter and the required backend packages. Product work proceeds in the reviewable slices defined in [docs/delivery-plan.md](docs/delivery-plan.md).

## Technology

- Laravel 13.30.1 and SQLite
- React 19, TypeScript, Inertia 3, Wayfinder, and Tailwind CSS 4
- Laravel Sanctum 4.3.3, Pest, Spatie Media Library 11.23.7, and Spatie Laravel Query Builder 7.3.5
- PHP-CS-Fixer, ESLint, and Prettier
- Semantic commits and a GitHub Actions CD pipeline

Composer and npm lockfiles are authoritative for exact transitive versions.

## Prerequisites

- PHP 8.5.9
- Composer 2
- Node.js 24
- npm 12.0.2
- SQLite 3 with the PHP PDO SQLite extension

## Documentation

- [Product specification](docs/product-spec.md)
- [Requirements traceability](docs/requirements-traceability.md)
- [Architecture proposal](docs/architecture.md)
- [Delivery and PR plan](docs/delivery-plan.md)
- [Figma inventory](docs/figma-inventory.md)
- [Redberry code standards](docs/redberry-standards.md)
- [Working agreement](docs/working-agreement.md)
- [Decision log](docs/decisions.md)
- [Open questions](docs/open-questions.md)
- [Current status](docs/status.md)

## Getting started

1. Copy `.env.example` to `.env`.
2. Install PHP dependencies with `composer install`.
3. Generate the application key with `php artisan key:generate`.
4. Create the database with `touch database/database.sqlite`, then run `php artisan migrate`.
5. Install frontend dependencies with npm 12.0.2 using `npm install`.
6. Start the application with `composer dev`.

Run `composer ci:check` for the complete local gate: PHP-CS-Fixer, PHPStan, Pest, ESLint, Prettier, TypeScript, Wayfinder generation, and a production build.

## Development

Development follows one vertical, reviewable PR slice at a time. See the [working agreement](docs/working-agreement.md) and repository instructions in [AGENTS.md](AGENTS.md).

## Deployment

The assignment requires automated deployment after successful checks on main. The server target and secrets are still open decisions. The final runbook will document build, migration, cache, queue, media, health-check, and rollback steps.

## Resources

- [Authoritative Redberry assignment](https://redberry.gitbook.io/assignment-v-movie-quotes-upgraded)
- [Figma design](https://www.figma.com/design/Yt0MACroyqQ5QmGobnG0my/Movie-Quotes-Bootcamp-assignment--Copy-?node-id=0-1)
- [Landing-page reference](https://mustapp.com/2016)
- Database diagram: to be created after the domain decisions are accepted
- API documentation: not applicable while the accepted Inertia architecture has no JSON API
