/* jshint node: true */

const
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    annotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    flatten = require('gulp-flatten'),
    processors = [autoprefixer()];

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('css', function() {
    return gulp.src(mainBowerFiles('**/*.css').concat(['./src/**/*.css']))
        .pipe(flatten())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(postcss(processors))
        .pipe(concat('css.min.css'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true, match: '**/*.css'}));
});

gulp.task('js', function() {
    return gulp.src(mainBowerFiles('**/*.js').concat(['./src/**/*.js']))
        .pipe(flatten())
        .pipe(sourcemaps.init())
        .pipe(annotate())
        .pipe(uglify())
        .pipe(concat('js.min.js'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./js'));
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.css', ['css']);
    gulp.watch('./src/**/*.js', ['js']).on("change", reload);
    gulp.watch('./src/**/*.html', ['html']).on("change", reload);
});

gulp.task('default', ['css', 'js', 'watch', 'server', 'html']);