/**
 * Front-end / web performance optimisation starter kit based on a simple Gulp 4 Starter Kit for modern web development.
 *
 * @package @jr-cologne/create-gulp-starter-kit
 * @author JR Cologne <kontakt@jr-cologne.de>
 * @copyright 2020 JR Cologne
 * @license https://github.com/jr-cologne/gulp-starter-kit/blob/master/LICENSE MIT
 * @version v0.11.0-beta
 * @link https://github.com/jr-cologne/gulp-starter-kit GitHub Repository
 * @link https://www.npmjs.com/package/@jr-cologne/create-gulp-starter-kit npm package site
 *
 * ________________________________________________________________________________
 *
 * gulpfile.js
 *
 * The gulp configuration file.
 *
 */

const gulp                      = require('gulp'),
      del                       = require('del'),
      sourcemaps                = require('gulp-sourcemaps'),
      plumber                   = require('gulp-plumber'),
      sass                      = require('gulp-sass'),
      less                      = require('gulp-less'),
      stylus                    = require('gulp-stylus'),
      autoprefixer              = require('gulp-autoprefixer'),
      minifyCss                 = require('gulp-clean-css'),
      babel                     = require('gulp-babel'),
      webpack                   = require('webpack-stream'),
      uglify                    = require('gulp-uglify'),
      concat                    = require('gulp-concat'),
      imagemin                  = require('gulp-imagemin'),
      browserSync               = require('browser-sync').create(),
      dependents                = require('gulp-dependents'),
      htmlmin                   = require('gulp-htmlmin'),
      swPrecache                = require('sw-precache'),
      path                      = require('path'),
      critical                  = require('critical'),
      purgecss                  = require('gulp-purgecss'),

      src_folder                = './src/',
      src_assets_folder         = src_folder + 'assets/',
      dist_folder               = './dist/',
      dist_assets_folder        = dist_folder + 'assets/';

gulp.task('clear', () => del([ dist_folder ]));

gulp.task('html', () => {
  return gulp.src([ src_folder + '**/*.html' ], {
    base: src_folder,
    since: gulp.lastRun('html')
  })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task('html-minified', () => {
  return gulp.src(src_folder + '*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist_folder))
});

gulp.task('sass', () => {
  return gulp.src([
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'scss/**/*.scss'
  ], { since: gulp.lastRun('sass') })
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(dependents())
      .pipe(sass())
      .pipe(autoprefixer())
      //.pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('less', () => {
  return gulp.src([ src_assets_folder + 'less/**/!(_)*.less'], { since: gulp.lastRun('less') })
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('stylus', () => {
  return gulp.src([ src_assets_folder + 'stylus/**/!(_)*.styl'], { since: gulp.lastRun('stylus') })
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(stylus())
      .pipe(autoprefixer())
      .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('purgecss', () => {
  return gulp.src(dist_assets_folder + 'css/**/*.css')
      .pipe(purgecss({
        content: [dist_folder + '*.html']
      }))
      .pipe(gulp.dest(dist_assets_folder + 'css'))
})

gulp.task('js', () => {
  return gulp.src([ src_assets_folder + 'js/**/*.js', '!' + src_assets_folder + 'js/homework/**/*.js' ], { since: gulp.lastRun('js') })
    .pipe(plumber())
    .pipe(webpack({
      mode: 'production'
    }))
    .pipe(sourcemaps.init())
      .pipe(babel({
        presets: [ '@babel/env' ]
      }))
      .pipe(concat('all.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('js-copy', () => {
  return gulp.src([ src_assets_folder + 'js/homework/**/*' ], { since: gulp.lastRun('js-copy') })
    .pipe(gulp.dest(dist_assets_folder + 'js/homework'))
    .pipe(browserSync.stream());
});

gulp.task('js-minified', () => {
  return gulp.src([ 
    src_assets_folder + 'js/homework/*.js', 
    src_assets_folder + 'js/homework/components/*.js',
    src_assets_folder + 'js/homework/vendor/*.js', 
    src_assets_folder + 'js/homework/vendor/jquery/dist/*.js', 
    src_assets_folder + 'js/homework/vendor/requirejs/*.js', 
  ], { since: gulp.lastRun('js-minified'), base: src_assets_folder + 'js/homework' })
    .pipe(uglify())
    .pipe(gulp.dest(dist_assets_folder + 'js/homework'))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src([ src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)' ], { since: gulp.lastRun('images') })
    .pipe(plumber())
    /*.pipe(imagemin())*/
    .pipe(gulp.dest(dist_assets_folder + 'images'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  return gulp.src([ src_assets_folder + 'fonts/**/*' ], { since: gulp.lastRun('fonts') })
    .pipe(gulp.dest(dist_assets_folder + 'fonts'))
    .pipe(browserSync.stream());
});

gulp.task('videos', () => {
  return gulp.src([ src_assets_folder + 'videos/**/*' ], { since: gulp.lastRun('videos') })
    .pipe(gulp.dest(dist_assets_folder + 'videos'))
    .pipe(browserSync.stream());
});

gulp.task('extra-files', () => {
  return gulp.src([ src_folder + '*.txt', src_folder + '*.json', src_folder + '*.ico' ], { since: gulp.lastRun('extra-files') })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', src_folder + 'sw/runtime-caching.js'])
    .pipe(gulp.dest(dist_folder + 'assets/js/sw'));
});

gulp.task('write-service-worker', (cb) => {
  const filepath = path.join(dist_folder, 'service-worker.js');

  swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: 'optimised-frontend',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      src_folder + 'sw/sw-toolbox.js',
      src_folder + 'sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${dist_folder}assets/js/homework/*.js`,
      `${dist_folder}assets/css/**/*.css`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: dist_folder
  }, cb);
});

gulp.task('generate-service-worker', gulp.series('copy-sw-scripts', 'write-service-worker'));

gulp.task('generate-critical-css', (cb) => {
  critical.generate({
    inline: true,
    base: dist_folder,
    src: 'homework-homepage.html',
    target: {
      html: 'homework-homepage-critical.html',
      css: 'critical.css',
    },
    width: 1300,
    height: 900,
  });
  cb();
});

gulp.task(
  'build', 
  gulp.series(
    'clear', 
    'html', /* replace the 'html' with 'html-minified' if you need minification */ 
    'sass', 
    'less', 
    'stylus', 
    'js', 
    'js-copy', /* replace the 'js-copy' with 'js-minified' if you need minification */
    'fonts', 
    'videos',
    'extra-files', 
    'images', 
    /*'purgecss',*/
    /*'generate-critical-css',*/
    /*'generate-service-worker',*/
  )
);

gulp.task('dev', gulp.series('html', 'sass', 'less', 'fonts', 'videos', 'extra-files', 'stylus', 'js', 'js-copy'));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: [ 'dist' ]
    },
    port: 3000,
    open: false
  });
});

gulp.task('watch', () => {
  const watchImages = [
    src_assets_folder + 'images/**/*.+(png|jpg|jpeg|gif|svg|ico)'
  ];

  const watch = [
    src_folder + '**/*.html',
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'scss/**/*.scss',
    src_assets_folder + 'less/**/*.less',
    src_assets_folder + 'stylus/**/*.styl',
    src_assets_folder + 'js/**/*.js',
    src_assets_folder + 'fonts/**/*',
    src_assets_folder + 'videos/**/*',
    src_folder + '*.txt',
    src_folder + '*.json',
    src_folder + '*.ico'
  ];

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchImages, gulp.series('images')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
