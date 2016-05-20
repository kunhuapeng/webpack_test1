var gulp = require('gulp');
var replace = require('gulp-replace');
//var changed = require('gulp-changed');
var rev = require('gulp-rev');
var htmlmin = require('gulp-htmlmin');
var fs_extra = require('fs-extra');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev'),revCollector = require('gulp-rev-collector');//console.log(revCollector.toString())
var del = require('del');//删除
var vinylPaths = require('vinyl-paths');//--获取 stream 中每个文件的路径

gulp.task('clean', function(){
	fs_extra.removeSync('./dist');
});

gulp.task('js', ['clean'], function(){
	return gulp.src('src/**/*.js')
	// .pipe(uglify())
	.pipe(rev())
	.pipe(gulp.dest('dist/'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('dist/rev/'));
});

gulp.task('js1', ['js'], function(){
	return gulp.src(['dist/**/*.json', 'dist/**/*.js'])
	// .pipe(uglify())
	.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
			}
		}))
	.pipe(gulp.dest('dist/'));
});

gulp.task('css', ['js1'], function(){
	return gulp.src('src/**/*.css')
	.pipe(gulp.dest('dist/'));
});

gulp.task('html-inner', ['css'], function(){
	return gulp.src(['src/app/**/*.html', '!src/app/index.html'])
	.pipe(replace('<html>', ' '))
	.pipe(replace('</html>', ' '))
	.pipe(replace(/<meta.+?\/?>/ig, ''))
	.pipe(replace(/<title.+?<\/title>/ig, ''))
	.pipe(replace(/<head>((.|\s)+?)<\/head>(.|\s)+?<body>/gm, '<body>$1'))
	.pipe(replace('<body>', ' '))
	.pipe(replace('</body>', ' '))
	.pipe(htmlmin({collapseWhitespace: true}))
	//.pipe(rev())
	.pipe(gulp.dest('dist/'));
});

gulp.task('html-rev', ['html-inner'], function(){
	return gulp.src(['dist//**/*.html'])
		.pipe(vinylPaths(del))
		.pipe(rev())
		.pipe(gulp.dest('dist/'));
});

gulp.task('index-html', ['html-rev'], function(){
	return gulp.src(['dist/**/*.json', 'src/app/index.html'])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
			}
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', ['index-html'], function(){

});
