const imagemin = require('gulp-imagemin');

gulp.task('img', () => {
	return gulp.src(dir.dev +'/img/*.{png,gif,jpg,svg}')
		.pipe(imagemin([
			imagemin.svgo({plugins: [
				{removeViewBox: false},
				{removeUselessDefs: false},
				{removeDimensions: true},
				{cleanupIDs: false}
			]})
		], {
			verbose: true
		}))
		.pipe(gulp.dest(dir.build +'/img'))
});

gulp.task('imgUpload', () => {
	return gulp.src(dir.dev +'/upload/*.{png,gif,jpg}')
		.pipe(imagemin())
		.pipe(gulp.dest(dir.build +'/upload'))
});