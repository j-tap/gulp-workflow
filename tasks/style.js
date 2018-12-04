gulp.task('scss', () => {
	const sass = require('gulp-sass');
	const autoprefixer = require('gulp-autoprefixer');
	const sassGlob = require('gulp-sass-glob');
	
	return gulp.src(dir.dev +'/scss/main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass({
			//outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dir.build +'/css'));
});