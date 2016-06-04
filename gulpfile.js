'use strict';
var gulp  = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', ['build']);
gulp.task('build', shell.task('npm run build'));
gulp.task('watch', shell.task('npm run watch'));
gulp.task('test' , shell.task('npm test'));
gulp.task('run'  , shell.task('npm start'));
