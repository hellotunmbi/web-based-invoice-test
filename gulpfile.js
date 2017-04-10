var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');


gulp.task('default', ['build-less', 'jshint', 'connect' , 'watch']);


gulp.task('jshint', function() {
    return gulp.src('src/javascript/*.js')
    
    .pipe(jshint())

    .pipe(jshint.reporter('jshint-stylish'));

});


gulp.task('build-less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css'));
});


gulp.task('build-css', function() {
    return gulp.src('src/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'));
});


gulp.task('build-js', function() {
    return gulp.src('src/javascript/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(gutil.env.type == 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('html', function() {
  gulp.src('**/*.html')
  .pipe(connect.reload())
});


gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('watch', function() {
    gulp.watch('src/javascript/*.js', ['jshint']);
    gulp.watch('src/less/*.less', ['build-less'])
    gulp.watch('**/*.html', ['html']);
});