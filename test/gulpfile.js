var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var addsrc = require('gulp-add-src');

var paths = {
  sass: './source/stylesheets/**/*.scss',
  js: './source/javascripts/**/*.js',
  dist: './dist/'
};

// CSS
gulp.task('sass', function() {
  var includePaths = [
    './bower_components/bourbon/app/assets/stylesheets',
    './bower_components/normalize-scss'
  ];

  var sassOptions = {
    outputStyle: 'expanded',
    includePaths: includePaths
  };

  return gulp.src(paths.sass)
    .pipe(sass(sassOptions))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.dist));
});

// JS
gulp.task('js', function () {
  var modules = [
    './source/javascripts/modules/**/*.js',
    './source/javascripts/main.js'
  ];

  var lib = [
    './bower_components/baseline-modernizr/baseline-modernizr.js'
  ];

  return gulp.src(modules)
    .pipe(concat("application.js"))
    .pipe(babel())
    .pipe(addsrc.prepend(lib))
    .pipe(concat("application.js"))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.dist));
});

// Server
gulp.task('server', function() {
  connect.server({
    root: paths.dist,
    livereload: true
  });
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

// Build
gulp.task('build', ['sass', 'js']);

// Default
gulp.task('default', ['watch', 'build', 'server']);
