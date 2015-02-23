var gulp   = require("gulp");
var coffee = require("gulp-coffee");
var gutil  = require('gulp-util');

gulp.task("npm_build", function () {
  return gulp.src("lib/*.coffee")
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest("./dist"));
});