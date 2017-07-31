// Dependencies have been saved in `package.json`
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var nodemon = require('nodemon');
var browserSync = require('browser-sync');

var paths = {
  'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
  'styles':['./public/styles/*.scss','./public/styles/**/*.less'],
  'templates':['./templates/**/*.hbs']
};

gulp.task('serve', ['nodemon','less'], function() {

    browserSync.init(null, {
      proxy: "http://localhost:3000",
      open: false,
      port: 7000
    });

    gulp.watch(paths.styles, ['less']);
    gulp.watch(paths.templates).on('change', browserSync.reload);
    gulp.watch(paths.src, ['js-watch']);

});

gulp.task('lint', function(){
  gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));

});

gulp.task('js-watch', ['lint'], function (done) {
    browserSync.reload();
    done();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src("public/styles/*.less")
        .pipe(less())
        .pipe(gulp.dest("public/styles"))
        .pipe(browserSync.stream());
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'keystone.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});



gulp.task('default', ['serve']);
