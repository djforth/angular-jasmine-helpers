var gulp       = require('gulp');
var requireDir = require('require-dir');
var dir        = requireDir('./gulp_tasks');

gulp.task('build', ["npm_build", 'console_strip_npm'])
gulp.task('main', ["npm_build", "karma"])