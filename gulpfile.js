var gulp = require('gulp');
var sass = require('gulp-sass');
var sync = require('browser-sync').create();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');


//delete old files
gulp.task('delete-old-css', function() {
    return del('dist/css');
});

//compile sass to css
gulp.task('sass', function() {
    return gulp.src([
        'sass/main.scss'
    ])
        .pipe(sourcemaps.init())
        // .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

//minify css
gulp.task('minify-css', ['sass', 'delete-old-css'], function() {
    return gulp.src([
        'src/css/vendor/*.css',
        'dist/css/*.css'
    ])
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/css'))
        // .pipe(rename('bundle.min.css'))
        // .pipe(clean({compatibility: 'ie8'}))
        // .pipe(gulp.dest('dist/css'))
        .pipe(sync.reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/vendor/jquery-1.11.2.min.js',
        'src/js/vendor/bootstrap.min.js',
        'src/js/vendor/jquery.slimscroll.min.js',
        'src/js/vendor/bootstrap-datepicker.js',
        'src/js/vendor/material.min.js',
        'src/js/vendor/material-kit.js',
        'src/js/vendor/nouislider.min.js',
        'src/js/main.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.reload({
            stream: true
        }));
});

//clean svg icon sprite map
gulp.task('clean:svg', function() {
    return del([
        'dist/images/icons/icons.svg'
    ]);
});

//svg sprites
gulp.task('sprites', ['clean:svg'], function() {
    return gulp.src('dist/images/icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('dist/images/icons'));
});


//watch task
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('sass/**/*.scss', ['minify-css']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('*.html').on('change', sync.reload);
});

//browser sync
gulp.task('browserSync', function() {
    sync.init({
        server: {
            baseDir: ''
        }
    });
});

// gulp.task('default', ['sass', 'scripts', 'watch']);
gulp.task('default', [
    'delete-old-css',
    'minify-css',
    'scripts',
    'sprites',
    'watch'
]);










































