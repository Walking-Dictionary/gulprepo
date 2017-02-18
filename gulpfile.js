// Gulpfile

//*** LOADING PLUG-INS HERE
var gulp = require('gulp'); //Tells gulp where to find its code.
var gutil = require('gulp-util'); //--for log
var sass = require('gulp-sass');  // for converting sass
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var connect = require('gulp-connect');


// test task to output text to the console
gulp.task('myfirstBigGulp', function() {
     console.log("my first big gulp, yeah!") // place code for the default task here
});


// a copy task
gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('assets'))
});


//a log task
gulp.task('log', function() {
  gutil.log('== My Log Task ==')// using log method of gutil
});


//sass preprocessing
gulp.task('tocss', function() {
  gulp.src('styles/main.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('assets'))
  .pipe(connect.reload())
});


// processing coffee script
gulp.task('coffeed', function() {
  gulp.src('scripts/*.coffee')
  .pipe(coffee({bare: true})
    .on('error', gutil.log))
  .pipe(gulp.dest('scripts'))
});


// to minify and merge JS filez
gulp.task('minikat', function() {
  gulp.src('sripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
  .pipe(connect.reload())
});

// automatically accomplish tasks
gulp.task('watch', function() {
  gulp.watch('scripts/hello.coffee', ['coffeed']);
  gulp.watch('scripts/*.js', ['minikat']);
  gulp.watch('styles/main.scss', ['tocss']);
});


// creating a server for live reload without manual reload.
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

// automatically reload when html is edited
gulp.task('html', function() {
  gulp.src('*.html')
  .pipe(connect.reload())
});



// set default for the nor arg $ gulp
gulp.task('default', ['html', 'coffeed', 'minikat', 'tocss', 'connect', 'watch']);


/* we can also define our sources and wont need to use file paths or quotes in passing to code

var coffeeSources = ['scripts/hello.coffee'],
    jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['*.html'],
    outputDir = 'assets';
*/


