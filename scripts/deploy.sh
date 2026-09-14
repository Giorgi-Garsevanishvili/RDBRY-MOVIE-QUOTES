#!/usr/bin/env bash

set -Eeuo pipefail

fail() {
    printf 'Deployment failed: %s\n' "$1" >&2
    exit 1
}

: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
: "${DEPLOY_SHA:?DEPLOY_SHA is required}"

cd "$DEPLOY_PATH"

[[ -d .git ]] || fail "DEPLOY_PATH is not a Git checkout"
[[ -f .env ]] || fail "the production .env file is missing"
[[ -z "$(git status --porcelain --untracked-files=no)" ]] || fail "the server checkout has tracked changes"

git fetch --quiet origin main:refs/remotes/origin/main

remote_main="$(git rev-parse origin/main)"
[[ "$remote_main" == "$DEPLOY_SHA" ]] || fail "the tested commit is no longer the current main commit"

current_revision="$(git rev-parse HEAD)"
git merge-base --is-ancestor "$current_revision" "$DEPLOY_SHA" || fail "deployment is not a fast-forward update"

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

if [[ "$current_revision" != "$DEPLOY_SHA" ]]; then
    mkdir -p .deploy

    rollback_database="$DEPLOY_PATH/.deploy/rollback.sqlite"
    rollback_database_pending="$rollback_database.pending"

    [[ "$rollback_database_pending" != *"'"* ]] || fail "DEPLOY_PATH cannot contain a single quote"

    rm -f "$rollback_database_pending"
    sqlite3 "$database_path" ".backup '$rollback_database_pending'"
    [[ -s "$rollback_database_pending" ]] || fail "the rollback database snapshot is empty"

    mv "$rollback_database_pending" "$rollback_database"
    printf '%s\n' "$current_revision" > .deploy/rollback-revision
fi

maintenance_enabled=false

restore_availability() {
    if [[ "$maintenance_enabled" == true ]]; then
        php artisan up --no-interaction || true
    fi
}

trap restore_availability EXIT

php artisan down --retry=60 --no-interaction
maintenance_enabled=true

git switch --quiet main
git merge --ff-only "$DEPLOY_SHA"

composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

npm ci --ignore-scripts
npm run build

php artisan migrate --force --no-interaction
php artisan storage:link --no-interaction
php artisan optimize --no-interaction
php artisan queue:restart --no-interaction
php artisan up --no-interaction
maintenance_enabled=false

printf 'Deployed %s successfully.\n' "$DEPLOY_SHA"
