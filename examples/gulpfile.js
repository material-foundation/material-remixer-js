'use strict';

const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('serve', () => {
  gulp.src('./')
    .pipe(webserver({
      open: true,
    }));
});
