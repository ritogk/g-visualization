# setup
./setup.sh

# アプリケーション起動
php artisan serve --host 0.0.0.0:8000

# ts build
npm run prod
※npm run watchを使い所だけど、センサー周りのAPIが何故か動かないのでprodでビルドする事