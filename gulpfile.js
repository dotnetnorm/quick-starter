var browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    babel = require("gulp-babel"),
    plumber = require('gulp-plumber'),
    babelify = require('babelify'),
    livereload = require('gulp-livereload');

gulp
  // performs magic
  .task('browserify', function(){
    gulp.src('src/js/main.js')
      .pipe(plumber())
      .pipe(
        browserify({
            transform: 'babelify',
          debug: false //!gulp.env.production
        })
      )
      .pipe(concat('main.js'))
      .pipe(plumber.stop())
      .pipe(gulp.dest('dist/js'))
      .pipe(livereload());
  })

  // moves source files to dist
  .task('copy', function(){
    gulp
      .src('src/index.html')
      .pipe(gulp.dest('dist'));

     gulp
      .src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));

     gulp
      .src('src/img/**/*.*')
      .pipe(gulp.dest('dist/img'));


    })

  // local development server
  .task('connect', function(){
    connect.server({
      root: ['dist'],
        port: '8081',
      base: 'http://localhost',

       fallback: "dist/index.html",
      livereload: true
    });
  })

    //opens the application in chrome
  .task('open', function(){
    gulp
      .src('dist/index.html')
      .pipe(
        open('', {app: 'google chrome',url: 'http://localhost:8080/'})
      );
  })


  // build the application
  .task('default', ['browserify', 'copy', 'connect', 'open'])
  .task('default2', ['browserify', 'copy'])
    .task('watch2', ['default2'], function () {

        gulp.watch('src/**/*.*', ['default2']);
    })
  // watch for source changes
  .task('watch', ['default'], function(){
    livereload.listen();
    gulp.watch('src/**/*.*', ['default2']);
  });
