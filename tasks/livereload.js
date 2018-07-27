const connect = require('gulp-connect');

gulp.task('server', () => {
	const open = require('gulp-open');
	
	let server = connect.server({
		port: 3000,
		root: dir.build,
		livereload: true
	});

	return gulp.src('./')
		.pipe(open({
			uri: 'http://' + server.host + ':' + server.port
		}))
});

gulp.task('livereload', () => {
	gulp.src(dir.build)
	.pipe(connect.reload());
});