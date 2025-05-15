const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Taak om Sass te compileren
function compileSass() {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'));
}

// Taak om op wijzigingen te letten en Sass te compileren
function watchSass() {
    gulp.watch('./src/sass/**/*.scss', compileSass);
}

// Default taak die watchSass aanroept
exports.watch = watchSass;