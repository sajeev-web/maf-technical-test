var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglifyJs = require("gulp-uglify");
var pump = require("pump");



//-----Convert all scss(res/scss/) to css(res/css/)
gulp.task('sass', function () {
    return gulp.src('res/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('res/css'));
});

//-----Concat all css(res/css/) to bundle.css(dist/css/)
gulp.task('bundle-css', function () {	
	return gulp.src(['res/css/*.css'])
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('dist/css'));
});

//-----Minify/Uglify bundle.css(dist/css/) to bundle.min.css(dist/css/)
gulp.task('minify-css', () => {
    return gulp.src('dist/css/bundle.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

//-----Concat all js(res/js/) to bundle.js(dist/js/)
gulp.task('bundle-js', function () {	
	return gulp.src(['res/js/*.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('dist/js'));
});

//-----Minify/Uglify bundle.js(dist/js/) to bundle.min.js(dist/js/)
gulp.task('minify-js', function(cb) {
        pump([
        gulp.src('dist/js/bundle.js'),
        uglifyJs(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    cb
  );
});


gulp.task('sass:watch', function () {
    gulp.watch('res/scss/*.scss', ['sass']);
    gulp.watch('res/css/*.css', ['bundle-css']);
});

gulp.task('js:watch', function () {
    gulp.watch('res/js/*.js', ['bundle-js']);
});

gulp.task('default', ['sass', 'sass:watch', 'bundle-css', 'bundle-js', 'js:watch']); // Type gulp
gulp.task('release', ['sass', 'bundle-css', 'bundle-js', 'minify-css', 'minify-js']); // Type gulp release
