gulp.task('fontGenerate', () => {
	const fontmin = require('gulp-fontmin');

	return gulp.src(dir.dev +'/font/**/*')
		.pipe(fontmin())
		.pipe(gulp.dest(dir.build +'/font'))
});

gulp.task('fontRemoveStyle', (cb) => {
	rimraf(dir.build +'/font/**/*.{css,svg}', cb);
});

gulp.task('font', () => {
	return runSequence('fontGenerate', 'fontRemoveStyle');
});