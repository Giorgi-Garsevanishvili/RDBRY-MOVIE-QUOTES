#!/usr/bin/env bash

set -Eeuo pipefail

fail() {
    printf 'Rollback failed: %s\n' "$1" >&2
    exit 1
}

: "${DEPLOY_PATH:?DEPLOY_PATH is required}"

cd "$DEPLOY_PATH"

[[ -d .git ]] || fail "DEPLOY_PATH is not a Git checkout"
[[ -f .env ]] || fail "the production .env file is missing"
[[ -f .deploy/rollback-revision ]] || fail "no rollback revision is recorded"
[[ -s .deploy/rollback.sqlite ]] || fail "no rollback database snapshot is available"
[[ -z "$(git status --porcelain --untracked-files=no)" ]] || fail "the server checkout has tracked changes"

rollback_revision="$(<.deploy/rollback-revision)"
git cat-file -e "$rollback_revision^{commit}" || fail "the rollback revision is unavailable"

php artisan config:clear --no-interaction

database_connection="$(php -r '
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
echo config("database.default");
')"

[[ "$database_connection" == "sqlite" ]] || fail "the production database is not SQLite"

database_path="$(php -r '
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
echo config("database.connections.sqlite.database");
')"

[[ -f "$database_path" ]] || fail "the production SQLite database does not exist"
[[ "$database_path" != *"'"* ]] || fail "the SQLite path cannot contain a single quote"
[[ "$DEPLOY_PATH" != *"'"* ]] || fail "DEPLOY_PATH cannot contain a single quote"

maintenance_enabled=false

restore_availability() {
    if [[ "$maintenance_enabled" == true ]]; then
        php artisan up --no-interaction || true
    fi
}

trap restore_availability EXIT

php artisan down --retry=60 --no-interaction
maintenance_enabled=true
php artisan queue:restart --no-interaction

git switch --quiet --detach "$rollback_revision"

composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

npm ci --ignore-scripts
npm run build

sqlite3 "$database_path" ".restore '$DEPLOY_PATH/.deploy/rollback.sqlite'"

php artisan storage:link --no-interaction
php artisan optimize --no-interaction
php artisan queue:restart --no-interaction
php artisan up --no-interaction
maintenance_enabled=false

printf 'Rolled back to %s successfully.\n' "$rollback_revision"
