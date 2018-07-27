gulp.task('pug', () => {
	const pug = require('gulp-pug');

	return gulp.src(dir.dev +'/index.pug')
		.pipe(plumber())
		.pipe(pug({
			pretty: true // not minify
		}))
		.pipe(gulp.dest(dir.build));
});

gulp.task('html-min', () => {
	const htmlmin = require('gulp-htmlmin');
	
	return gulp.src(dir.build +'/*.html')
		.pipe(htmlmin({
			decodeEntities: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(dir.build));
});

gulp.task('html-build-full', (callback) => {
	return runSequence('pug', 'seo', 'generate-favicon', 'favicon', 'html-min', callback);
});

gulp.task('html-rebuild', (callback) => {
	return runSequence('pug', 'seo', 'favicon', 'html-min', callback);
});