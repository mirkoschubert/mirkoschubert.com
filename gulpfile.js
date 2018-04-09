'use strict';

const gulp = require('gulp');
const prettify = require('gulp-prettify');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
//const changed = require('gulp-changed')
//const imagemin = require('gulp-imagemin')
//const browserSync = require('browser-sync')
//const watch = require('gulp-watch')
const runSequence = require('run-sequence');

// HTML
gulp.task('tools:html', () => {
  return gulp
    .src('public/**/*.html')
    .pipe(
      prettify({
        indent_size: 2
      })
    )
    .pipe(gulp.dest('public/'));
});

// CSS
gulp.task('tools:sass', () => {
  return gulp
    .src('src/sass/**/*.sass')
    .pipe(sass({ errLogToConsole: true, style: 'expanded' }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(
      cleancss({
        advanced: false
        //format: 'beautify'
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('static/assets/css/'));
});

// JavaScript
gulp.task('tools:js', () => {
  return (
    gulp
      .src('public/assets/js/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError)
      .pipe(uglify())
      //.pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('public/assets/js/'))
  );
});

// Run all one after another
gulp.task('tools:all', cb => {
  runSequence(['tools:html', 'tools:sass', 'tools:js'], cb);
});
