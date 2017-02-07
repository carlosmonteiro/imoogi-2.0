var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');

gulp.task('scripts', function() {
    gulp.src(['sources/scripts/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build'));
})

gulp.task('styles', function() {
    gulp.src(['sources/sass/main.scss'])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('build'));
})

gulp.task('webserver', ['image'], function() {
  gulp.src('./')
    //.pipe(wait(5500))
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('image', function () {
  gulp.src('./images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['scripts', 'styles', 'webserver'], function() {

    gulp.watch('sources/scripts/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('sources/sass/**', function(event) {
        gulp.run('styles');
    })
})

gulp.task('compile', ['scripts', 'styles'], function() {
        gulp.run('scripts', 'styles');
})
