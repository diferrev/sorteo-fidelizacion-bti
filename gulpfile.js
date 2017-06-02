var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload');

var source = {
  jsPath : './src/js',
  sassPath : './src/sass',
  nodePath : './node_modules'
}
var build = {
  jsPath : './build/js',
  cssPath : './build/css'
}

// Servidor web entorno de producción
gulp.task('server-dist', function() {
	gulp.src( './' )
		.pipe(webserver({
			host		: "localhost",
			port		: 8080,
			livereload	: true,
			fallback	: 'index.html'
		}));
});

/* Tarea: concatenar y minificar los archivo js */
gulp.task('css', function(){
  return gulp.src([
    source.sassPath + '/style.scss'
  ])
  .pipe( concat('app.css') )
  .pipe( gulp.dest( build.cssPath ) )
  .pipe( livereload() );
});

/* Tarea: concatenar y minificar los archivo js */
gulp.task('js', function(){
  return gulp.src([
    source.jsPath + '/main.js'
  ])
  .pipe( uglify() )
  .pipe( concat('app.js') )
  .pipe( gulp.dest( build.jsPath ) )
  .pipe( livereload() );
});

/* Tarea: vigilar cambios en los archivos con extensión .js */
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch( source.jsPath + '/*.js', ['js']);
  gulp.watch( source.sassPath + '/*.scss', ['css']);
});

/* Tarea global */
gulp.task('default', ['js','css','watch']);