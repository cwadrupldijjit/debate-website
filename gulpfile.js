// ----------------------------  VARIABLE DECLARATIONS

var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');


// ----------------------------  BEHAVIORIAL DEFINITIONS

function typescriptPublic() {
	gulp.src('public/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			outFile: 'app.js'
		}))
		.pipe(gulp.dest('public/js'));
}

function typescriptServer() {
	gulp.src('server/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			outFile: 'server.js'
		}))
		.pipe(gulp.dest('./server'));
}

function sassCompile() {
	gulp.src('public/css/**/*.scss')
		.pipe(sass({ outFile: 'styles.css' })).on('error', sass.logError)
		.pipe(gulp.dest('./public/css'));
}


// -----------------------------------  GULP TASKS

gulp.task('sass', sassCompile);
gulp.task('tsc-public', typescriptPublic);
gulp.task('tsc-server', typescriptServer);


gulp.task('watch', function() {
	watch('public/**/*.scss', sassCompile);
	watch('public/**/*.ts', typescriptPublic);
	watch('server/**/*.ts', typescriptServer);
});


gulp.task('default', ['sass', 'tsc-public', 'tsc-server', 'watch']);