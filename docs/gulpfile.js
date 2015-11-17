var gulp = require('gulp');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var addsrc = require('gulp-add-src');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  templates: './files/templates/**/*.jade',
  sass: '../source/**/*.scss',
  docsSass: './files/stylesheets/**/*.scss',
  js: './files/javascripts/**/*.js',
  images: './files/images/**/*',
  public: './files/public/**/*',
  dist: './dist/'
};

var env = process.env.ASSET_ENV || '';
var isProduction = env.toLowerCase() === 'production';

jade.filters.code = function(block) {
  return block
    .replace( /&/g, '&amp;'  )
    .replace( /</g, '&lt;'   )
    .replace( />/g, '&gt;'   )
    .replace( /"/g, '&quot;' )
    .replace( /#/g, '&#35;'  )
    .replace( /\\/g, '\\\\'  );
};

// Templates
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  return gulp.src([paths.templates, '!./files/templates/**/_*.jade'])
    .pipe(gulpJade({
      jade: jade,
      pretty: !isProduction
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.dist))
});

// CSS
gulp.task('sass', function() {
  var includePaths = [
    './node_modules/normalize.css'
  ];

  var sassOptions = {
    outputStyle: 'expanded',
    includePaths: includePaths
  };

  if (isProduction) {
    sassOptions.outputStyle = 'compressed';
  }

  return gulp.src(paths.sass)
    .pipe(sass(sassOptions))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.dist));
});

// Docs CSS
gulp.task('docsSass', function() {
  var includeDocPaths = [
    './node_modules/prismjs/themes'
  ];

  var sassOptions = {
    outputStyle: 'expanded',
    includePaths: includeDocPaths
  };

  if (isProduction) {
    sassOptions.outputStyle = 'compressed';
  }

  return gulp.src(paths.docsSass)
    .pipe(sass(sassOptions))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.dist));
});

// JS
gulp.task('js', function () {
  var modules = [
    './files/javascripts/modules/**/*.js',
    './files/javascripts/main.js'
  ];

  var lib = [
    './files/javascripts/baseline-modernizr.js',
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/components/prism-scss.js'
  ];

  return gulp.src(modules)
    .pipe(concat("application.js"))
    .pipe(babel())
    .pipe(addsrc.prepend(lib))
    .pipe(concat("application.js"))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.dist));
});

// Images
gulp.task('images', function() {
  var images = [
    paths.images
  ];

  return gulp.src(images)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: []
    }))
    .pipe(gulp.dest(paths.dist + '/images'));
});

// Public
// Files under the public folder are brought over into dist
// without any processing.
gulp.task('public', function() {
  return gulp.src(paths.public)
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
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.docsSass, ['docsSass']);
  gulp.watch(paths.js, ['js']);
});

// Build
gulp.task('build', ['templates', 'sass', 'docsSass', 'js', 'images', 'public']);

// Default
gulp.task('default', ['watch', 'build', 'server']);
