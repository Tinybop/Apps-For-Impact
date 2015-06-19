'use strict';

// ============================================================================
// Config
// ============================================================================

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  cssmin = require('gulp-cssmin'),
  del = require('del'),
  notify = require('gulp-notify'),
  reload = browserSync.reload,
  rename = require('gulp-rename'),
  rev = require('gulp-rev'),
  sass = require('gulp-sass');


// ============================================================================
// Tasks
// ============================================================================

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'appsforimpact.dev',
    notify: false,
    logLevel: 'info',
    logConnections: false,
    logFileChanges: true
  });
});

gulp.task('styles', function () {

  del(['css/*.css']);

  return gulp.src('source/sass/*.scss')
    .pipe(sass({
      errLogToConsole: false,
      onError: function(err) {
        return notify().write(err);
      }
    }))
    .pipe(autoprefixer('last 1 version', 'ie 9', 'ie 10', 'ios 6'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
  gulp.watch('source/sass/*.scss', ['styles', reload]);
  gulp.watch('*.html', reload);
});

gulp.task('default', ['styles','watch','browser-sync']);
