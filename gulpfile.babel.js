import gulp from 'gulp';
import gulpMocha from 'gulp-mocha';
import gulpBabel from 'gulp-babel';
import gulpSourcemaps from 'gulp-sourcemaps';
import del from 'del';

gulp.task('publish', ['babel', 'public', 'view']);

gulp.task('test', () => {
    del.sync('./test/mochawesome-reports/**/*');
    return gulp.src('test/**/*.js')
        .pipe(gulpMocha({
            reporter:'mochawesome',
            reporterOptions: {
                reportDir: './test/mochawesome-reports'
            },
            compilers:'js:node_modules/babel-core/register'
        }))
        .on('error', () => {
            gulp.emit('end');
        });
});

gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(gulpSourcemaps.init())
        .pipe(gulpBabel())
        .pipe(gulpSourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
})

gulp.task('public', () => {
    return gulp.src('src/public/**/*')
        .pipe(gulp.dest('dist/public'));
});

gulp.task('view', () => {
    return gulp.src('src/views/**/*.jade')
        .pipe(gulp.dest('dist/views'));
})