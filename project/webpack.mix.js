const mix = require('laravel-mix');

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

 mix.ts('resources/ts/main.ts', 'public/js/app.js')
 .vue()
 .sass('resources/scss/main.scss', 'public/css/app.css');

 
 // ESLintに関する設定（この部分を丸ごと追記するイメージです）
if (!mix.inProduction()) { // 本番環境ではESLintは使用しない
    mix.webpackConfig({
      module: {
        rules: [
          {
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader',
            test: /\.(js|vue)?$/,
          },
        ],
      },
    })
  }