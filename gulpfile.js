var gulp       = require('gulp'),
    browserify = require('browserify'),
    babel      = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename');
    // webserver = require('gulp-webserver'),
    // tscConfg = require('./tsconfig.json');

var appSrc = 'dist/',
    tsSrc  = 'src/';

// gulp.task('html', function() {
//   gulp.src(appSrc + '**/*.html');
// });

// gulp.task('css', function() {
//   gulp.src(appSrc + '**/*.css');
// });

gulp.task('browserify', function() {
  return browserify({entries: './src/browserify/index.js'})
  .transform('babelify', { presets: ["es2015"] })
  .bundle()
  .pipe(source('browserify.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(appSrc));
});

gulp.task('babel', function() {
  return gulp.src('src/std/**/*.js')
  .pipe(babel())
  .pipe(rename(function (path) {
    path.extname = '.js';
  }))
  .pipe(gulp.dest(appSrc + '.'));
});

// gulp.task('watch', function() {
//   gulp.watch(tsSrc + '**/*.ts', ['typescript']);
//   gulp.watch(appSrc + 'css/*.css', ['css']);
//   gulp.watch(appSrc + '**/*.html', ['html']);
// });

// gulp.task('webserver', function() {
//   gulp.src(appSrc)
//     .pipe(webserver({
//       livereload: true,
//       open: true
//     }));
// });

// gulp.task('default', ['typescript', 'watch', 'webserver']);
// gulp.task('default', ['ts-babel', 'babel']);
// gulp.task('default', ['babel']);
// gulp.task('default', ['browserify']);
gulp.task('default', ['browserify', 'babel']);