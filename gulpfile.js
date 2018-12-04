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

// HTML (after Hugo generation)
gulp.task('html', () => {
  return gulp
    .src('public/**/*.html')
    .pipe(
      prettify({
        indent_size: 2
      })
    )
    .pipe(gulp.dest('public/'));
});

// SASS -> CSS
gulp.task('sass', () => {
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
    .pipe(gulp.dest('themes/oldterm/static/assets/css/'));
});

// JS minify files
gulp.task('jsmin', () => {
  return gulp
    .src(['src/js/**/*.js', '!src/js/**/*.min.js'])
    //.pipe(eslint())
    //.pipe(eslint.format())
    //.pipe(eslint.failAfterError)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('themes/oldterm/static/assets/js/'));
});
    
// JS copy already minified files
gulp.task('jscp', () => {
  return gulp
    .src('src/js/**/*.min.js')
    .pipe(gulp.dest('themes/oldterm/static/assets/js/'));
});

// All JS tasks
gulp.task('js', cb => {
  runSequence(['jsmin', 'jscp'], cb);
})

// All tasks BEFORE Hugo generation
gulp.task('before', cb => {
  runSequence(['sass', 'js'], cb);
});

// All tasks AFTER Hugo generation
gulp.task('after', cb => {
  runSequence(['html'], cb);
});

