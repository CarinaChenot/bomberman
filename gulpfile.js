const gulp         = require('gulp')
const plumber      = require('gulp-plumber')
const rename       = require('gulp-rename')
const notify       = require('gulp-notify')
const minify       = require('gulp-minify')
const connect      = require('gulp-connect')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps   = require('gulp-sourcemaps')
const sass         = require('gulp-sass')
const babel        = require('gulp-babel')
const concat       = require('gulp-concat')


const config = {
    'src' : 'src/',
    'dist': 'dist/'
}


// Connect task
gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        livereload: true
    })
})

// Relocate img task
gulp.task('img', () => {
  gulp.src(config.src + 'img/**.*')
      .pipe(gulp.dest(config.dist + 'assets/img'));
});

// CSS task
gulp.task('sass', () => {
    return gulp.src(config.src + 'sass/*.scss')
        .pipe(plumber({errorHandler: notify.onError('SASS Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename(function (path) {
            path.basename += ".min"
        }))
        .pipe(gulp.dest(config.dist + 'assets/css'))
        .pipe(connect.reload())
})


// JS task
gulp.task('es6', () => {
  return gulp.src([config.src + 'js/classes/Map.js',config.src + 'js/classes/Bomb.js', config.src + 'js/classes/Character.js', config.src + 'js/main.js'])
  .pipe(plumber({
    errorHandler: reportError
  }))
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('main.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.dist + 'assets/js'))
})

function reportError (error) {
  notify().write({
    title: 'Gulp: ES6',
    message: 'Error line : ' + error.loc.line + ' in : ' + error.fileName.split('/')[error.fileName.split('/').length - 1]
  })
}

// Wath task
gulp.task('watch', () => {
    gulp.watch(config.src + 'img/**/*.*', ['img'])
    gulp.watch(config.src + 'sass/**/*.scss', ['sass'])
    gulp.watch([config.src + 'js/classes/*.js', config.src + 'js/*.js'], ['es6'])
})

gulp.task('default', ['connect', 'watch'], () => {

})
