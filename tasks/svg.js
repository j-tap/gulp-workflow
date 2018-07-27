gulp.task('svg', () => {
	const svgSprite = require('gulp-svg-sprite');
	const svgmin = require('gulp-svgmin');
	const cheerio = require('gulp-cheerio');

	return gulp.src(dir.dev +'/img/svg/**/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		/*.pipe(cheerio({
			run: function ($) {
				$('[fill^="#"], [fill^="rgba"]').removeAttr('fill');
				$('[stroke^="#"], [stroke^="rgba"]').removeAttr('stroke');
				$('[style]').removeAttr('style');
				$('style').remove();
			},
			parserOptions: {xmlMode: true}
		}))*/
		.pipe(svgSprite({
			shape: {
				id: { // SVG shape ID related options
					separator: '-', // Separator for directory name traversal
					generator: 'i-svg-%s', // SVG shape ID generator callback
					pseudo: '~', // File name separator for shape states (e.g. ':hover')
					whitespace: '-' // Whitespace replacement for shape IDs
				},
				dimension: {
					maxWidth: 2000,
					maxHeight: 2000,
					attributes: false
				},
				spacing: {
					padding: 0
				}
				//dest: 'intermediate-svg' // Keep the intermediate files
			}, 
			mode: {
				symbol: {
					sprite: '../../../build/img/sprite.svg',
					//render: {scss: {dest: '../../scss/svg-sprite.scss'}}
				}
			}
		}))
		.pipe(gulp.dest(dir.dev +'/img'));
});
