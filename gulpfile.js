dir = {
	tasks: './tasks',
	dev: './src',
	build: './build',
}
includeJs = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/bootstrap/dist/js/bootstrap.js',
	'node_modules/slick-carousel/slick/slick.min.js',
	dir.dev +'/js/*.js'
]

gulp = require('gulp');
sourcemaps = require('gulp-sourcemaps');
rename = require('gulp-rename');
plumber = require('gulp-plumber');
rimraf = require('rimraf');
requireDir = require('require-dir');
runSequence = require('run-sequence');

let tasks = requireDir(dir.tasks);


gulp.task('clean', (cb) => {
	rimraf(dir.build +'/*', cb);
});

gulp.task('default', ['clean'], () => {
	return runSequence('svg', ['font', 'img', 'imgUpload', 'html-build-full', 'scss', 'js'], 'watch', 'server');
});
