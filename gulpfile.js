var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');

gulp.task('sass', function() {
	gulp.src('./**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(function(f) {
			return f.base;
		}));
});

gulp.task('tsc', function() {
	gulp.src('./**/*.scss')
		.pipe(ts())
		.pipe(gulp.dest(function(f) {
			return f.base;
		}));
});

gulp.task('default', function() {
	gulp.watch('./**/*.scss', ['sass']);
	gulp.watch('./**/*.ts', ['tsc']);
});