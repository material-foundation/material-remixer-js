'use strict';

const gulp = require('gulp');

const paths = {
  ts: ['./src/**/*.ts', './src/**/*.tsx'],
  less: './src/**/*.less',
  html: './src/**/*.html'
};

gulp.task('clean:dist', () => {
  const del = require('del');
  return del(['dist']);
});

gulp.task("tslint", () => {
  const tslint = require('gulp-tslint');
  return gulp.src(paths.ts)
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task('watch', () => {
  const watch = require('gulp-watch');
  gulp.watch([paths.ts, paths.less, paths.html], ['webpack']);
});

gulp.task('webpack', ['tslint', 'clean:dist'], () => {
  const webpack = require('webpack');
  const gulpWebpack = require('gulp-webpack');
  return gulp.src('./src/core/remixer.ts')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', ['webpack', 'watch'], () => {
  const webserver = require('gulp-webserver');
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
    }));
});

gulp.task('default', ['webpack']);
