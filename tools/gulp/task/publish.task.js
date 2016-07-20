import path from 'path';
import FileCache from '../../common/file.cache';

module.exports = (gulp, Plugin, config) => {
    let fileCache = new FileCache();
    gulp.task("publish:compile-babel", () => {
        return gulp.src(path.join(config.path.src,'**/*.js'))
            .pipe(fileCache.filter())
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.babel())
            .pipe(Plugin.sourcemaps.write('.'))
            .pipe(fileCache.cache())
            .pipe(gulp.dest(config.path.dist));
    });
 
    gulp.task('publish:jade',()=>{   
        return gulp.src(config.path.srcJade)
            .pipe(gulp.dest(config.path.distView));
    });

    gulp.task('publish', 
        [
            'publish:compile-babel',
            'publish:jade',
            'public:img', 
            'public:css',
            'public:sass', 
            'public:other',        
        ]);
}