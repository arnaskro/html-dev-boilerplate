'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import minifyCSS from 'gulp-csso';
import concat from 'gulp-concat';
const browserSync = require('browser-sync').create();

const SRC_PATH  = "./src";
const DIST_PATH  = "./dist";
const DIST_ASSETS_PATH  = DIST_PATH + "/assets";

gulp.task('pages', function(){
  return gulp.src(SRC_PATH + '/pages/**/*.html')
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('styles', () => {
  return gulp.src(SRC_PATH + '/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', (e) => console.log(e)))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DIST_ASSETS_PATH))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scripts', () => {
  return gulp.src(SRC_PATH + '/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_ASSETS_PATH))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: DIST_PATH
    },
  })
})

gulp.task('watch', ['browserSync', 'default'], function(){
  gulp.watch('./src/styles/**/*.scss', ['styles']); 
  gulp.watch('./src/scripts/**/*.js', ['scripts']); 
  gulp.watch('./src/**/*.html', ['pages']); 
})

gulp.task('default', [ 'pages', 'styles', 'scripts' ]);