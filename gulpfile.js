var browserify = require('browserify');
var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function(){

	var bundler = browserify({
		entries: ['app.js'],
		transform: [babelify]
	});

	return bundler.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['build']);