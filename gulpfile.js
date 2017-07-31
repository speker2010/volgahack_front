var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bs = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if');

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/styles'));
});

gulp.task('styles', ['sass']);

gulp.task('useref', function () {
   gulp.src('src/*.html')
       .pipe(useref())
       .pipe(gulpif('*.js', uglify()))
       .pipe(gulp.dest('dest'));
});

gulp.task('watch', ['styles'], function () {
    gulp.watch('src/scss/*.scss', ['styles']);
});

gulp.task('bs', function () {
    bs.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('watchBs', ['bs', 'styles'], function () {
    gulp.watch('src/scss/*.scss', ['styles']).on('change', bs.reload);
    gulp.watch('src/*.html').on('change', bs.reload);
    gulp.watch('src/js/*.js').on('change', bs.reload);
});

gulp.task('hello', function () {
    console.log('hello world');
});