gulp.task('js', () => {
	const concatJs = require('gulp-concat');
	const uglify = require('gulp-uglify-es').default;

	return gulp.src(includeJs)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concatJs('main.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dir.build +'/js'));
});