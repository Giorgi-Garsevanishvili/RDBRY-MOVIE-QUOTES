# Production deployment

## Delivery model

Movie Quotes uses one self-managed production server. The server is prepared and initially deployed by its owner. Every later push to `main` follows this path:

1. GitHub Actions runs the complete `composer ci:check` gate.
2. The `deploy` job connects to the production server over SSH only after CI passes.
3. The server fast-forwards its clean checkout to the exact commit tested by CI.
4. Production dependencies and frontend assets are rebuilt.
5. Laravel migrations, caches, the public storage link, and queue workers are refreshed.
6. GitHub requests Laravel's `/up` health endpoint.

Pull requests never deploy. Deployment credentials live only in the protected GitHub `production` environment.

## Server requirements

Install these production dependencies before the first deployment:

- A Linux web server with its document root set to `<deploy-path>/public`
- PHP 8.5.9 CLI and FPM with BCMath, cURL, EXIF, GD, Mbstring, OpenSSL, PDO SQLite, tokenizer, and XML extensions
- Composer 2
- Node.js 24 and npm 12.0.2
- Git and the SQLite command-line client
- A process monitor such as Supervisor for the queue worker
- TLS for the application endpoint

The deployment user must own the checkout and be able to write `bootstrap/cache`, `storage`, the SQLite database, and `.deploy`. It must also be able to fetch `main` from the GitHub remote. For a private repository, add a read-only repository deploy key to that user instead of storing a personal GitHub token on the server.

The web server must never expose the repository root or `.env`.

## First deployment

Clone the repository into the final deployment path and keep the checkout on `main`. The path must remain a clean deployment checkout; do not edit tracked files on the server.

Create `.env` from `.env.example` and configure at least:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://movie-quotes.example.com

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/persistent/path/database.sqlite

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local
BROADCAST_CONNECTION=pusher

MAIL_MAILER=smtp
MAIL_HOST=mail-provider-host
MAIL_PORT=587
MAIL_USERNAME=mail-provider-user
MAIL_PASSWORD=mail-provider-password
MAIL_FROM_ADDRESS=no-reply@example.com

GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
GOOGLE_REDIRECT_URI=https://movie-quotes.example.com/auth/google/callback

PUSHER_APP_ID=pusher-application-id
PUSHER_APP_KEY=pusher-application-key
PUSHER_APP_SECRET=pusher-application-secret
PUSHER_APP_CLUSTER=pusher-application-cluster

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

Use unique production secrets. Generate `APP_KEY` with `php artisan key:generate`; do not copy a development key. Create the SQLite file at `DB_DATABASE` and make it writable by the PHP and deployment users.

Run the initial installation from the deployment path:

```bash
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
npm ci --ignore-scripts
npm run build
php artisan migrate --force
php artisan storage:link
php artisan optimize
```

Uploaded avatars, posters, and quote images are stored by Spatie Media Library on the local public disk. Preserve `storage/app/public` between deployments and include it in the server's normal backup plan.

## Queue process

Run the database queue worker through the server's process monitor. Replace the example path and user with the real values. Pusher Channels operates the WebSocket service, so the application server does not run or proxy a WebSocket process.

```ini
[program:movie-quotes-queue]
command=/usr/bin/php /absolute/deploy/path/artisan queue:work database --sleep=3 --tries=3 --timeout=90 --max-time=3600
directory=/absolute/deploy/path
user=deployment-user
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
redirect_stderr=true
stdout_logfile=/absolute/deploy/path/storage/logs/queue.log

```

Reload the process monitor after installing the configuration. The deployment script restarts Laravel queue workers after every successful release so they load the new code.

## GitHub production environment

In the GitHub repository, create an environment named `production`. Restrict it to the `main` branch and add protection reviewers if the repository plan supports them.

Add these environment secrets:

| Secret               | Value                                               |
| -------------------- | --------------------------------------------------- |
| `DEPLOY_HOST`        | Server hostname or IP address                       |
| `DEPLOY_USER`        | Restricted deployment account                       |
| `DEPLOY_SSH_KEY`     | Private half of the deployment-only SSH key         |
| `DEPLOY_KNOWN_HOSTS` | Verified SSH host-key entry for the server and port |

Add these environment variables:

| Variable      | Value                                                  |
| ------------- | ------------------------------------------------------ |
| `DEPLOY_PATH` | Absolute path to the clean server checkout             |
| `DEPLOY_PORT` | SSH port; defaults to `22` when empty                  |
| `DEPLOY_URL`  | Public HTTPS application URL, without a trailing slash |

Verify the server's SSH host-key fingerprint through the hosting provider before storing the `known_hosts` entry. Do not obtain and trust the key only through the same unverified connection used for deployment.

## Continuous deployment

After the environment is configured, merge through the stacked pull requests into `main`. A successful main CI run starts deployment automatically. The job refuses to deploy when:

- CI fails;
- the server checkout contains tracked changes;
- the requested commit is not the current remote `main` commit;
- the update is not a fast-forward;
- the production database is not SQLite or cannot be found; or
- dependencies, the frontend build, migrations, cache generation, service reload, or the health check fails.

Production deployments are serialized so two releases cannot modify SQLite concurrently.

## Health and smoke test

GitHub treats the deployment as successful only when `DEPLOY_URL/up` responds successfully. After the first deployment, manually verify the complete production journey:

1. Open the bilingual landing page.
2. Register and receive the activation email.
3. Activate the account and log in.
4. Create a movie and quote with visible images.
5. Like or comment from a second account and confirm the real-time notification.
6. Update the profile and verify that the avatar renders.
7. Sign in with Google using the production callback URL.

Check `storage/logs/laravel.log`, the web-server log, and the process-monitor logs when a step fails.

## Rollback

Before changing code or running migrations, deployment stores the previous commit and an online SQLite snapshot under the ignored `.deploy` directory. This is a release rollback point, not a durable backup policy.

For an immediate failed release, open the GitHub **Actions** tab, select **rollback**, and run the workflow. The protected job restores the previous commit and its SQLite snapshot, rebuilds dependencies and assets, reloads Laravel services, and checks `/up` again.

Rollback restores the database to its pre-deployment state, so writes made after deployment are discarded. Prefer a corrective forward deployment once production has accepted new user data. Back up the SQLite database and `storage/app/public` independently on a schedule appropriate for the server.

After rollback, the checkout intentionally remains detached at the working revision. The next successful deployment switches back to `main` and fast-forwards to the new tested commit.
