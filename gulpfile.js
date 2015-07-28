(function(){
  'use strict';

  // Config
  // ==========================================================================

  var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    notify = require('gulp-notify'),
    rev = require('gulp-rev'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin');


  // Tasks
  // ==========================================================================

  gulp.task('serve', ['styles'], function() {
    browserSync({
      proxy: 'appsforimpact.dev',
      notify: false,
      logLevel: 'info',
      logConnections: true,
      logFileChanges: true,
      online: true,
    });

    gulp.watch('src/**/*', ['styles']);
    gulp.watch('dist/**/*').on('change', browserSync.reload);
  });

  gulp.task('styles', function () {

    del(['dist/css/*.css']);

    return gulp.src('src/*.html')
      .pipe(usemin({
        css: [
          sass({
            errLogToConsole: false,
            onError: function (err) {
              return notify().write(err);
            }
          }),
          autoprefixer('last 1 version', 'ie 9', 'ie 10', 'ios 6'),
          minifyCss(),
          'concat',
          rev()
        ],
        html: [
          minifyHtml({
            empty: true
          })
        ],
        js: [uglify(), rev()],
        inlinejs: [uglify()],
        inlinecss: [minifyCss(), 'concat']
      }))
      .pipe(gulp.dest('dist/'));
  });


  gulp.task('default', ['serve']);

})();
