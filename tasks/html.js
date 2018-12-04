gulp.task('html', () => {
	const pug = require('gulp-pug');

	return gulp.src(dir.dev +'/pug/page/*.pug')
		.pipe(plumber())
		.pipe(pug({
			pretty: true // not minify
		}))
		.pipe(gulp.dest(dir.build));
});

/*gulp.task('html:svg', () => { 
	return gulp.src(dir.build +'/*.html')
		
		dir.build +'/img/sprite.svg'

		.pipe(gulp.dest(dir.build));
});*/

gulp.task('html:min', () => {
	const htmlmin = require('gulp-htmlmin');
	
	return gulp.src(dir.build +'/*.html')
		.pipe(htmlmin({
			decodeEntities: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(dir.build));
});

gulp.task('html:format', () => {
	return gulp.src(dir.build +'/*.html')
		.pipe(prettify({
			"indent_char": "\t",
			"indent_size": 1
		}))
		.pipe(gulp.dest(dir.build));
});

gulp.task('html:list', ['html:listRemove'], () => {
	const index = require('gulp-index');
	
	return gulp.src(dir.build +'/*.html')
		.pipe(index({
			'title-template': (title) =>`<h1 class="index__title">Pages</h1>`, // ${title}
			'section-template': (sectionContent) => `<section class="index__section">${sectionContent}</section>`,
			'item-template': (filepath, filename) => `<li class="index__item"><a class="index__item-link" target="_blank" href="./${filename}">${filename}</a></li>`, // ${filepath}
			'relativePath': './',
			'outputFile': './index.html'
		}))
		.pipe(gulp.dest(dir.build));
});

gulp.task('html:listRemove', (cb) => {
	rimraf(dir.build +'/index.html', cb);
});

gulp.task('html:build', (callback) => {
	return runSequence('html', 'html:list', 'favicon:generate', 'favicon', 'html:format', callback);
});

gulp.task('html:update', (callback) => {
	return runSequence('html', 'html:list', 'favicon', 'html:format', callback);
});