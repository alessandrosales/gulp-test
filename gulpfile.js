var gulp = require('gulp');
var pug = require('gulp-pug');
var connect = require('gulp-connect');

var paths = {
  pug: ['./src/pug/*.pug'],
  pugDest: './www/',
  pugWatch: ['./src/pug/**/*.pug'],
  sass: ['./src/sass/**/*.sass'],
  sassDest: './www/css/',
  js: ['./src/js/**/*.js'],
  jsDest: './www/js/'
}

gulp.task('pug', function () {
  gulp.src(paths.pug)
      .pipe(pug())
      .pipe(gulp.dest(paths.pugDest))
      .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: ['www']
    , livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.pugWatch, ['pug']);
});

gulp.task('default', ['pug','connect','watch']);