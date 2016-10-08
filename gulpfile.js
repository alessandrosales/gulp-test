var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var connect = require('gulp-connect');

var paths = {
  pug: ['./src/pug/*.pug']
  , pugDest: './www/'
  , pugWatch: ['./src/pug/**/*.pug']
  , sass: ['./src/sass/*.sass']
  , sassWatch: ['./src/sass/**/*.sass']
  , sassDest: './www/css/'
  , coffee: ['./src/coffee/**/*.coffee']
  , coffeeDest: './www/js/'
}

gulp.task('pug', function () {
  gulp.src(paths.pug)
      .pipe(pug())
      .pipe(gulp.dest(paths.pugDest))
      .pipe(connect.reload());
});

gulp.task('sass', function (){
  gulp.src(paths.sass)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest(paths.sassDest))
      .pipe(connect.reload());
});

gulp.task('coffee', function (){
  gulp.src(paths.coffee)
      .pipe(coffee({bare: true}))
      .pipe(gulp.dest(paths.coffeeDest))
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
  gulp.watch(paths.sassWatch, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
});

gulp.task('default', ['pug','sass','coffee','connect','watch']);