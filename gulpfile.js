const gulp         = require('gulp')
const plumber      = require('gulp-plumber')
const rename       = require('gulp-rename')
const notify       = require('gulp-notify')
const connect      = require('gulp-connect')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps   = require('gulp-sourcemaps')
const sass         = require('gulp-sass')
const babel        = require('gulp-babel')
const concat       = require('gulp-concat')
const eslint       = require('gulp-eslint')

const config = {
  'src': 'src/',
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
    .pipe(gulp.dest(config.dist + 'assets/img'))
})

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
    .pipe(rename(function(path) {
      path.basename += '.min'
    }))
    .pipe(gulp.dest(config.dist + 'assets/css'))
    .pipe(connect.reload())
})

// JS task
gulp.task('es6', () => {
  return gulp.src([config.src + 'js/classes/Cell.js', config.src + 'js/classes/Map.js', config.src + 'js/classes/Settings.js', config.src + 'js/classes/Bomb.js', config.src + 'js/classes/Character.js', config.src + 'js/classes/IA.js', config.src + 'js/main.js'])
  .pipe(plumber({
    errorHandler: notify.onError('ES6 Error: <%= error.message %>')
  }))
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('main.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.dist + 'assets/js'))
})

// Lint task
gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError())
})

// run eslint --fix src/** to fix all

// Wath task
gulp.task('watch', () => {
  gulp.watch(config.src + 'img/**/*.*', ['img'])
  gulp.watch(config.src + 'sass/**/*.scss', ['sass'])
  gulp.watch([config.src + 'js/classes/*.js', config.src + 'js/*.js'], ['es6'])
})

gulp.task('default', ['connect', 'img', 'sass', 'es6', 'watch', 'lint'], () => {

})
