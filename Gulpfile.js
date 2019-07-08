var gulp = require('gulp');
// var less = require('gulp-less');
//var babel = require('gulp-babel');
//var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
// var del = require('del');
var minify = require('gulp-minify');

var paths = {
  styles: {
    src: 'css/style.css',
    dest: 'css/'
  },
  scripts: {
    src: 'js/script.js',
    dest: 'js/'
  }
};

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
/*
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'assets' ]);
}
*/

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    // .pipe(less())
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    // pass in options to the stream
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, /*{ sourcemaps: true }*/)
    //.pipe(babel())
    .pipe(uglify())
    .pipe(minify(/*{
      ext: {
        min: '.min'
      }
    }*/))
    .pipe(rename({
      basename: 'script',
      suffix: '.min'
    }))
    // .pipe(concat('script.min.js'))
    
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(styles, scripts);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
// exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;