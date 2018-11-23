var gulp = require('gulp');

var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');

gulp.task('useref', function(){
  return gulp.src('app/**/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    },
  });
});

gulp.task('views', function buildHTML() {
  return gulp.src('app/views/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('app'))
});

gulp.task('useref', function(){
  return gulp.src('app/**/*.html')
    .pipe(useref())
    //.pipe(gulpIf('app/js/**/*.js', uglify()))
    // Minifies only if it's a CSS file
    //.pipe(gulpIf('app/css/**/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'))
});

gulp.task('minify-js', function() {
  return gulp.src('app/js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'minify-css', 'minify-js', 'images', 'fonts'],
    callback
  )
});

gulp.task('watch', ['views', 'browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/views/**/*.pug', ['views']);
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})