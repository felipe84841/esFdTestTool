'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var xpiName = 'esFdTestTool.xpi';

gulp.task('default', function () {
  console.log(xpiName);
  gulp.src('src/**')
    .pipe(zip(xpiName))
    .pipe(gulp.dest('./build'));
});