// Initialize modules
const {src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// File path variables
const files = {
  scssPath: 'src/css/*.scss',
  imgPath: 'src/image/**/*'
}

// Sass task
function scssTask() {
  return src(files.scssPath)
    .pipe(sass())
    .pipe(postcss([ cssnano() ]))
    .pipe(dest('assets/css'));
}

// Image compression task
function imgTask() {
  return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('assets/images'))
}

// Watch task
function watchTask() {
  watch([files.scssPath, files.imgPath],
    parallel(scssTask, imgTask));
}

// Default task
exports.default = series(
  parallel(scssTask, imgTask),
  watchTask
)