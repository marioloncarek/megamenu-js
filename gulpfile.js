// PLUGIN NAME - must match scss name and js name - check src/js/pluginname.js and src/scss/project/pluginname.scss
var pluginName = 'megamenu';

// UTILITIES
var gulp = require('gulp');
var rename = require("gulp-rename");
var order = require("gulp-order");
var del = require('del');
var vinylPaths = require('vinyl-paths');
var cache = require('gulp-cached');
// CSS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var cssbeautify = require('gulp-cssbeautify');
// HTML
var htmlmin = require('gulp-htmlmin');
var w3cjs = require('gulp-w3cjs');
var sitemap = require('gulp-sitemap');
// JS
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
// IMAGES
var imagemin = require('gulp-imagemin');
// SERVER
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*
 DEVELOPMENT
 - create svg sprites, compile scss, validate js and html and start server with BrowserSync
 */

//scss - compile SCSS, uncss it, autoprefix it, comb beautify it and create sourcemaps
gulp.task('scss', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'IE 9']
        }))
        .pipe(csscomb())
        .pipe(cssbeautify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('src/css/'))
        .pipe(reload({stream: true}));
});

//html - validate HTML with w3cjs
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(cache('html-validation'))
        .pipe(w3cjs())
        .pipe(reload({stream: true}));
});

//jshint - validate JS with jshint
gulp.task('jshint', function () {
    return gulp.src('src/js/' + pluginName + '.js')
        .pipe(cache('js-hint'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(reload({stream: true}));
});

//DEFAULT - run task with: gulp, open server, watch for changes
gulp.task('default', ['scss', 'html', 'jshint'], function () {
    browserSync({
        server: {
            baseDir: './'
        },
        // Will not attempt to determine your network status, assumes you're ONLINE
        online: true
    });

    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('*.html', ['html']);
    gulp.watch('src/js/**/*.js', ['jshint']);
});

/*
 END DEVELOPMENT
 */

/*
 BUILD PROCESS
 - builds the project in /dist folder
 */

//delete dist files in the stream
gulp.task('clear:dist', function () {
    return gulp.src('dist/*', {dot: true})
        .pipe(vinylPaths(del));
});

//dist css
gulp.task('dist:css', ['clear:dist'], function () {
    return gulp.src('src/scss/project/' + pluginName + '.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'IE 9']
        }))
        .pipe(cleanCSS())
        .pipe(rename(pluginName + '.min.css'))
        .pipe(gulp.dest('dist/'))
});

//dev css
gulp.task('dev:css', ['clear:dist'], function () {
    return gulp.src('src/scss/project/' + pluginName + '.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'IE 9']
        }))
        .pipe(cssbeautify())
        .pipe(gulp.dest('dist/'))
});

//dist js
gulp.task('dist:js', ['clear:dist'], function () {
    return gulp.src(['src/js/' + pluginName + '.js'])
        .pipe(uglify())
        .pipe(rename(pluginName + '.min.js'))
        .pipe(gulp.dest('dist/'));
});

//dev js
gulp.task('dev:js', ['clear:dist'], function () {
    return gulp.src(['src/js/' + pluginName + '.js'])
        .pipe(gulp.dest('dist/'));
});

//compress:images - optimize images [after clearing dist]
gulp.task('compress:images', ['clear:dist'], function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/images/'));
});

//copy jquery
gulp.task('copy:jquery', ['dev:css', 'dist:css', 'dev:js', 'dist:js', 'compress:images'], function () {
    return gulp
        .src('src/js/jquery.min.js')
        .pipe(gulp.dest('dist/'));
});

//copy scss
gulp.task('copy:scss', ['dev:css', 'dist:css', 'dev:js', 'dist:js', 'compress:images'], function () {
    return gulp
        .src('src/scss/project/' + pluginName + '.scss')
        .pipe(gulp.dest('dist/'));
});

//BUILD - run task with: gulp build
gulp.task('build', ['clear:dist', 'dist:css', 'dev:css', 'dist:js', 'dev:js', 'compress:images', 'copy:jquery', 'copy:scss'], function () {
});

/*
 END THE BUILD PROCESS
 */