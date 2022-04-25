cp .env.base .env
composer install
php artisan key:generate
chmod -R 777 storage
chmod -R 777 bootstrap/cache
php artisan storage:link
cargo install watchexec-cli