var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rigger = require('gulp-rigger');
var sourcemaps = require('gulp-sourcemaps');
var groupMedia = require('gulp-group-css-media-queries');
var minifyCSS = require('gulp-minify-css');
var del = require('del');

gulp.task('clean', function () {
  return del('theme/assets/gulp-*.*');
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(groupMedia())
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    // .pipe(rename('styles.scss.liquid'))
    .pipe(rename({
      prefix: 'gulp-',
      extname: '.css.liquid'
    }))
    .pipe(replace('"{{', '{{'))
    .pipe(replace('}}"', '}}'))
    .pipe(gulp.dest('./assets/'));
});

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    // .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      prefix: 'gulp-',
      extname: '.js'
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/'))
});

gulp.task('watching', function () {
  gulp.watch(['./src/sass/**/*.scss'], gulp.series('sass'));
  gulp.watch(['./src/js/**/*.js'], gulp.series('js'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('sass', 'js')));
// gulp.task('default', gulp.series('sass', 'js'));