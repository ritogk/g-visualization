const mix = require("laravel-mix")

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css")
  .version()

mix.scripts(["resources/js/analytics.js"], "public/js/analytics.js").version()

mix.sass("resources/sass/video.scss", "public/css").version()

mix.scripts(["resources/js/home.js"], "public/js/home.js").version()
mix
  .scripts(
    ["resources/js/zyairo.js"],
    "public/js/zyairo.js"
  )
  .version()
mix
  .scripts(
    ["resources/js/youlocalControl.js", "resources/js/youLocalVideo.js"],
    "public/js/youLocal.js"
  )
  .version()
mix
  .scripts(
    ["resources/js/localLocalControl.js", "resources/js/localLocalVideo.js"],
    "public/js/localLocal.js"
  )
  .version()
