// Site-specific Gulp tasks

var gulp = require('gulp');
var rename = require('gulp-rename');
var mincss = require('gulp-minify-css');
var gzip = require('gulp-gzip');

var basswork = require('gulp-basswork');
var browsersync = require('browser-sync');

// Site development
gulp.task('dev', ['watch', 'serve']);

gulp.task('watch', ['basswork', 'site-basswork', 'themes-basswork', 'sassify', 'render'], function() {
  gulp.watch(
    [
      './docs/templates/**/*.html',
      'docs/partials/**/*',
      'docs/examples/**/*',
      './docs/css/src/**/*',
      './src/**/*.css',
      './docs/themes/bassmap/src/**/*',
      './docs/themes/bassdock/src/**/*'
    ],
    ['basswork', 'site-basswork', 'themes-basswork', 'sassify', 'render', 'reload']
  );
});

gulp.task('reload', function() {
  browsersync.reload();
});

gulp.task('serve', function() {
  browsersync({ server: { baseDir: './' }, open: false, ghostMode: false });
});

// Site stylesheet
gulp.task('site-basswork', function() {
  gulp.src('./docs/css/src/index.css')
    .pipe(basswork())
    .pipe(mincss())
    .pipe(rename('base.min.css'))
    .pipe(gulp.dest('./docs/css'));
});

// Build site
var include = require('./include');
var example = require('./include-example');
var nav = require('./is-active');
var pygmentize = require('./pygmentize');
var glossary = require('./css-glossary');

gulp.task('render', function() {
  gulp.src('./docs/templates/**/*.html')
    .pipe(include())
    .pipe(example())
    .pipe(pygmentize())
    .pipe(nav())
    .pipe(glossary({ css: './basscss.css' }))
    .pipe(gulp.dest('./'));
});

// Themes
gulp.task('themes-basswork', function() {
  gulp.src('./docs/themes/bassmap/src/bassmap.css')
    .pipe(basswork()).pipe(gulp.dest('./docs/themes/bassmap'));
  gulp.src('./docs/themes/bassdock/src/bassdock.css')
    .pipe(basswork()).pipe(gulp.dest('./docs/themes/bassdock'));
});

