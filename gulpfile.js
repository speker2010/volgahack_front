var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var htmllint = require('gulp-htmllint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var gutil = require('gulp-util');
var stylelint = require('gulp-stylelint');


// functions
function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}

// styles
gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/styles'));
});

gulp.task('styles', ['sass']);

// html
gulp.task('useref', function () {
    gulp.src('src/*.html')
       .pipe(useref())
       .pipe(gulpif('*.js', uglify()))
       .pipe(gulp.dest('dest'));
});

gulp.task('htmllint', function () {
    gulp.src('src/*.html')
        .pipe(htmllint(), htmllintReporter);
});

gulp.task('html', ['htmllint'], function () {
});

// scripts
gulp.task('jslint', function () {
    gulp.src(['src/js/**/*.js', 'gulpfile.js'])
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['jslint'], function () {

});

// watchers
gulp.task('watch', ['styles'], function () {
    gulp.watch('src/scss/*.scss', ['styles']);
});

gulp.task('bs', function () {
    bs.init({
        server: {
            baseDir: './src/'
        }
    });
});

gulp.task('watchBs', ['bs', 'styles'], function () {
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/styles/*.css').on('change', bs.reload);
    gulp.watch('src/*.html', ['html']).on('change', bs.reload);
    gulp.watch('src/js/*.js', ['scripts']).on('change', bs.reload);
});

// other
gulp.task('hello', function () {
    console.log('hello world');
});

