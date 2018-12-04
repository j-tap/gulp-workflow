gulp.task('watch', () => {

	gulp.watch([dir.dev +'/pug/', dir.dev +'/**/*.pug'], () => {
		runSequence('html:update', 'livereload');
	});

	gulp.watch([dir.dev +'/scss/', dir.dev +'/scss/**/*.scss'], () => {
		runSequence('scss', 'livereload');
	});

	gulp.watch([dir.dev +'/js/', dir.dev +'/js/**/*.js'], () => {
		runSequence('js', 'livereload');
	});

	gulp.watch([dir.dev +'/img/', dir.dev +'/img/**/*.{png,gif,jpg}'], () => {
		runSequence('img', 'livereload');
	});

	gulp.watch([dir.dev +'/img/favicon'], () => {
		runSequence('html:update', 'livereload');
	});

	gulp.watch([dir.dev +'/img/svg/', dir.dev +'/img/**/*.svg'], () => {
		runSequence('svg', 'scss', 'img', 'livereload');
	});

	gulp.watch([dir.dev +'/upload/', dir.dev +'/upload/**/*.{png,gif,jpg}'], () => {
		runSequence('img:upload', 'livereload');
	});

	gulp.watch([dir.dev +'/font/', dir.dev +'/font/**/*'], () => {
		runSequence('font', 'livereload');
	});

});