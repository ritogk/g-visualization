const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .ts('resources/ts/main.ts', 'public/js/app.js')
  .vue()
  .sass('resources/scss/main.scss', 'public/css/app.css')
  .version()

const path = require('path')

mix.webpackConfig({
  // ビルド後に静的チェックを実行するための設定
  module: {
    rules: [
      {
        enforce: 'pre', // preを指定することで、付いてないローダーより先に実行できる。
        test: /\.(ts|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true, // Lint実行時に自動整形を行うかどうか。（prettierのルールで自動整形してくれる）
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('./resources/ts'),
    },
  },
})
