/* jshint node: true */

const
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    inlinesource = require('gulp-inline-source'),
    autoprefixer = require('autoprefixer'),
    order = require("gulp-order"),
    print = require('gulp-print'),
    htmlmin = require('gulp-htmlmin')
browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    flatten = require('gulp-flatten'),
    doiuse = require('doiuse'),
    processors = [autoprefixer(), doiuse({
        browsers: [
            '> 5% in US'
        ],
        ignore: ['flexbox', 'viewport-units'],
        ignoreFiles: ['**/*/normalize.css']
    })],
    historyApiFallback = require('connect-history-api-fallback');

gulp.task('server', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./",
            middleware: [historyApiFallback()]
        }
    });
});

gulp.task('css', function(done) {
    return gulp.src(mainBowerFiles('**/*.css').concat(['./src/styles.css']))
        .pipe(order([
            '**/normalize.css', '**/.css'
        ]))
        .pipe(cleanCSS())
        .pipe(postcss(processors))
        .pipe(concat('css.css'))
        .pipe(gulp.dest('./src/css'))
        done();
});

gulp.task('projectCss', function(done) {
    return gulp.src('./src/projects.css')
        .pipe(cleanCSS())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/css'))
        done();
});

gulp.task('js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(order([
            "**/jquery3.js", "**/app.js", "**/*.js"
        ]))
        .pipe(flatten())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('js.min.js'))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./dist/js'))
        .on('end', reload);
});

gulp.task('html', ['css', 'projectCss'], function() {
    return gulp.src('./src/**/*.html')
        .pipe(flatten())
        .pipe(inlinesource())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('./'))
        .on('end', reload);
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch(['./src/**/*.html', './src/**/*.css'], ['html']);
});

gulp.task('default', ['watch', 'html', 'js', 'server', 'projectCss']);