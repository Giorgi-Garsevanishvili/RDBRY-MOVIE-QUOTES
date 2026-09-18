# Movie Quotes

Movie Quotes is a responsive bilingual social platform for discovering and sharing memorable quotes from films. Members can manage a personal movie library, publish quotes with images, interact through likes and comments, and receive real-time notifications.

The application supports English and Georgian throughout its public pages, authentication flows, protected interface, validation messages, and email content.

## Features

- Responsive cinematic landing page
- English and Georgian interface
- Registration with email activation
- Login using a username or email address
- Google authentication
- Password recovery for password-based accounts
- Personal movie library with bilingual information and poster uploads
- Quote creation and management with bilingual text and image uploads
- Newest-first quote feed with progressive pagination
- General, movie-name, and quote-text search
- Likes and comments
- Real-time activity notifications through Pusher Channels
- Profile management with avatar uploads and verified email changes
- Responsive desktop and mobile layouts
- Accessible dialogs, navigation, and form controls

## Technology stack

### Backend

- PHP 8.5
- Laravel 13
- SQLite
- Laravel Fortify and Sanctum
- Laravel Socialite
- Laravel Wayfinder
- Spatie Media Library
- Spatie Query Builder
- Pusher Channels

### Frontend

- React 19
- TypeScript
- Inertia.js 3
- Tailwind CSS 4
- Laravel Echo
- Vite

### Quality and delivery

- Pest
- PHPStan
- PHP-CS-Fixer
- ESLint
- Prettier
- GitHub Actions continuous integration and deployment

Exact dependency versions are recorded in `composer.lock` and `package-lock.json`.

## Requirements

- PHP 8.5.9
- Composer 2
- Node.js 24
- npm 12.0.2
- SQLite 3
- PHP PDO SQLite extension

For complete functionality, configure an SMTP mail provider, a Google OAuth web client, and a Pusher Channels application.

## Installation

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd giorgi-garsevanishvili-movie-quotes
```

Install the application and create its local environment:

```bash
composer setup
```

This command installs backend and frontend dependencies, creates `.env`, generates the application key, creates the SQLite database, runs migrations, creates the public storage link, and builds the frontend assets.

Optionally populate the application with realistic demo content:

```bash
php artisan db:seed
```

Start the local development environment:

```bash
composer dev
```

The application is available at the URL configured by `APP_URL`, which defaults to `http://localhost:8000`.

## Environment configuration

The default `.env.example` is ready for local SQLite development. Configure the following integrations when needed.

### Google authentication

Create a Google OAuth web application and register this callback URL:

```text
APP_URL/auth/google/callback
```

Then configure:

```dotenv
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```

### Real-time notifications

Create a Pusher Channels application and configure both the Laravel server credentials and the public Vite variables:

```dotenv
BROADCAST_CONNECTION=pusher

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

Run a queue worker when testing queued mail or notification delivery independently:

```bash
php artisan queue:work
```

### Email delivery

Local email is written to the application log by default. For real email delivery, replace the `MAIL_*` values with credentials from an SMTP provider.

## Demo data

The development seeder creates:

- 8 verified members
- 10 bilingual genres
- 20 recognizable movies
- Bilingual quotes with local images
- Likes and comments
- Read and unread notifications

All seeded members use the password `password`:

```text
moviefan@example.com
mariam@example.com
davit@example.com
nino@example.com
luka@example.com
ana@example.com
dato@example.com
salome@example.com
```

The seeder can be run repeatedly without duplicating its records.

## Project structure

```text
app/
├── Actions/             Focused application write operations
├── Http/
│   ├── Controllers/     HTTP and Inertia request coordination
│   ├── Middleware/      Request and shared-prop middleware
│   ├── Requests/        Validation and authorization rules
│   └── Resources/       Structured presentation resources
├── Models/              Eloquent models and relationships
├── Notifications/       Database and broadcast notifications
├── Observers/           Model lifecycle handling
├── Policies/            Resource authorization
├── Providers/           Application service configuration
└── Queries/             Non-trivial database read composition

database/
├── factories/           Test model factories
├── migrations/          Executable database schema
└── seeders/             Deterministic demo data and local assets

resources/js/
├── assets/              Images, fonts, and exact visual assets
├── components/          Reusable application components
├── helpers/             Stateless frontend helpers
├── hooks/               Shared React hooks
├── layouts/             Public, authentication, and application layouts
├── locales/             English and Georgian interface copy
├── pages/               Inertia route pages and page-specific components
├── routes/              Generated Wayfinder route functions
└── types/               Shared TypeScript types

routes/
├── web.php              Browser and Inertia routes
├── settings.php         Profile and account routes
└── channels.php         Private broadcast-channel authorization

tests/
├── Feature/             Application behavior and integration tests
└── Unit/                Focused unit tests

.github/workflows/       CI, deployment, and rollback workflows
scripts/                 Production deployment and rollback scripts
```

The application uses a single Laravel and Inertia architecture. Laravel owns routing, authentication, validation, authorization, persistence, and page data; React renders the user interface from typed Inertia props.

## Database

The application uses SQLite with foreign-key constraints and cascade rules for its domain relationships. The schema covers members, movies, genres, quotes, comments, likes, notifications, and polymorphic media records.

View the complete interactive schema in the [Movie Quotes DrawSQL diagram](https://drawsql.app/teams/ggarsevanishvili/diagrams/moviequotes).

Laravel migrations under `database/migrations` are the executable source of truth for the database structure.

## Uploaded files

Avatars, movie posters, and quote images are managed by Spatie Media Library and stored under `storage/app/public`. Make sure the public storage link exists:

```bash
php artisan storage:link
```

## Development commands

| Command                      | Purpose                                                                |
| ---------------------------- | ---------------------------------------------------------------------- |
| `composer dev`               | Start the local application, queue worker, and Vite development server |
| `composer ci:check`          | Run the complete project quality gate                                  |
| `php artisan test`           | Run the Pest test suite                                                |
| `composer lint`              | Format PHP source code                                                 |
| `npm run check`              | Run frontend linting, formatting checks, and TypeScript validation     |
| `npm run check:fix`          | Fix supported frontend linting and formatting issues                   |
| `npm run build`              | Create a production frontend build                                     |
| `php artisan migrate --seed` | Apply migrations and populate demo data                                |

## Testing

Run the complete local verification gate before submitting changes:

```bash
composer ci:check
```

The gate verifies deployment scripts, ESLint, Prettier, TypeScript, Wayfinder generation, the production frontend build, PHP-CS-Fixer, PHPStan, and all Pest tests.

## Deployment

The production workflow deploys from `main` only after the full CI gate succeeds. Deployment connects to a self-managed server over SSH, installs production dependencies, builds frontend assets, runs migrations, refreshes Laravel caches and queue workers, and verifies the application health endpoint.

A production server must provide:

- PHP 8.5.9 with the required Laravel and SQLite extensions
- Composer 2
- Node.js 24 and npm 12.0.2
- A persistent writable SQLite database
- Persistent storage for uploaded media
- A supervised Laravel queue worker
- Configured SMTP, Google OAuth, and Pusher credentials
- HTTPS and a web root pointing to the project's `public` directory
