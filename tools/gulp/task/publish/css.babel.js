import path from 'path';
const CSS_DEST = 'dist/public/css';
const SASS_SRC = 'src/public/sass/**/*.sass';
const CSS_SRC = 'src/public/css/**/*.css';
module.exports = (gulp, Plugin, rootDirectory) => {
    let sassSrc = path.join(rootDirectory,SASS_SRC);
    let cssSrc = path.join(rootDirectory,CSS_SRC);
    let cssDest = path.join(rootDirectory,CSS_DEST);
    gulp.task('sass', () => {
        return gulp.src(sassSrc)
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.autoprefixer('last 2 version','safari 5','ie 8','ie 9','opera 12.1','ios 6','android 4'))
            .pipe(Plugin.sourcemaps.write())
            .pipe(gulp.dest(cssDest))
            .pipe(Plugin.rename({
                suffix: '.min'
            }))
            .pipe(Plugin.minifyCss())
            .pipe(gulp.dest(cssDest))
            .pipe(Plugin.livereload())
            .pipe(Plugin.notify({
                message: 'Styles task complete'
            }));
    });

    gulp.task('css', () => {


    })
}