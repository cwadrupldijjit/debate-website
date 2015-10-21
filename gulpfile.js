var gulp = require('gulp');
var sass = require('gulp-sass');
// var ts = require('gulp-typescript');

gulp.task('sass', function(done) {
	gulp.src('public/styles/**/*.scss')
		.pipe(sass({
			file: './public/css/styles.css'
		}))
		.pipe(gulp.dest('./'))
		.on('end', done);
});

//  BELOW TYPESCRIPT TASK DOESN'T WORK

// gulp.task('tsc', function() {
// 	gulp.src('public/**/*.scss')
// 		.pipe(ts({
// 			noImplicitAny: true,
// 			outFile: 'app.js'
// 		}))
// 		.pipe(gulp.dest('public/js'));
// });

gulp.task('watch', function() {
	gulp.watch('public/**/*.scss', ['sass']);
	// gulp.watch('public/**/*.ts', ['tsc']);
});

gulp.task('default', ['sass', 'watch']);