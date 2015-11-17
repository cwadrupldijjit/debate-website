var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');

gulp.task('sass', function(done) {
	gulp.src('public/css/**/*.scss')
		.pipe(sass({ outFile: 'styles.css' })).on('error', sass.logError)
		.pipe(gulp.dest('./public/css'));
});

//  BELOW TYPESCRIPT TASK DOESN'T WORK

gulp.task('tsc', function() {
	gulp.src('public/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			outFile: 'app.js'
		}))
		.pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
	watch('public/**/*.scss', function() {
		gulp.src('public/css/**/*.scss')
			.pipe(sass({ outFile: 'styles.css' })).on('error', sass.logError)
			.pipe(gulp.dest('./public/css'));
	});
	
	watch('public/**/*.ts', function() {
		gulp.src('public/**/*.ts')
			.pipe(ts({
				noImplicitAny: true,
				outFile: 'app.js'
			}))
			.pipe(gulp.dest('public/js'));
	});
});

gulp.task('default', ['sass', 'tsc', 'watch']);