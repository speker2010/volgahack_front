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
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var stylelint = require('gulp-stylelint');
var distDir = '';


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
        .pipe(gulp.dest('src/css'));
});

gulp.task('styles', ['sass']);


gulp.task('sass:build', function () {
    gulp.src('src/scss/*.scss')
        .pipe(stylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(distDir + 'css'));
});

gulp.task('build:styles', ['sass:build'], function () {
});

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

gulp.task('build:html', ['htmllint'], function () {
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

gulp.task('scripts:copy', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(gulp.dest(distDir + 'js'));
});

gulp.task('build:scripts', ['scripts:copy', 'jslint'], function () {
});

// images
gulp.task('build:img', function () {
    gulp.src(['src/img/*'])
        .pipe(imagemin())
        .pipe(gulp.dest(distDir + 'img'));
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
    gulp.watch('src/css/*.css').on('change', bs.reload);
    gulp.watch('src/*.html', ['html']).on('change', bs.reload);
    gulp.watch('src/js/*.js', ['scripts']).on('change', bs.reload);
});

// build
gulp.task('build', ['build:styles', 'build:html', 'build:scripts', 'build:img'], function () {
});

// other
gulp.task('clean', function () {
    gulp.src(['css', 'js', 'img'], { read:false })
        .pipe(clean({ force: true }));
});

gulp.task('hello', function () {
    console.log('hello world');
});

