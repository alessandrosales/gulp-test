var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var browserSync = require('browser-sync').create();

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
      .pipe(gulp.dest(paths.pugDest));
});

gulp.task('sass', function (){
  gulp.src(paths.sass)
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest(paths.sassDest));
});

gulp.task('coffee', function (){
  gulp.src(paths.coffee)
      .pipe(coffee({bare: true}))
      .pipe(gulp.dest(paths.coffeeDest));
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'www'
    }
  })
});

gulp.task('watch', function(){
  gulp.watch(paths.pugWatch, ['pug']).on('change', browserSync.reload);
  gulp.watch(paths.sassWatch, ['sass']).on('change', browserSync.reload);
  gulp.watch(paths.coffee, ['coffee']).on('change', browserSync.reload);
});

gulp.task('default', ['server','pug','sass','coffee','watch']);