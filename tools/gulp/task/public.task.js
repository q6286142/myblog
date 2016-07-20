import path from 'path';
import pngquant from 'imagemin-pngquant';

module.exports = (gulp, Plugin, config) => {

    gulp.task('public:sass', () => {
        return gulp.src(config.path.srcSass)
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(Plugin.sourcemaps.write())
            .pipe(gulp.dest(config.path.distCss))
            .pipe(Plugin.rename({
                suffix: '.min'
            }))
            .pipe(Plugin.minifyCss())
            .pipe(gulp.dest(config.path.distCss))
            .pipe(Plugin.notify({
                message: 'sass task complete'
            }));
    });

    gulp.task('public:css', () => {
        return gulp.src(config.path.srcCss)
            .pipe(Plugin.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest(config.path.distCss))
            .pipe(Plugin.rename({
                suffix: '.min'
            }))
            .pipe(Plugin.minifyCss())
            .pipe(gulp.dest(config.path.distCss))
            .pipe(Plugin.notify({
                message: 'css task complete'
            }));
    });

    gulp.task('public:img', () => {
        return gulp.src(config.path.srcImage)
            .pipe(Plugin.cache(Plugin.imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{ removeViewBox: false }],  //不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant来压缩png图片   
            })))
            .pipe(gulp.dest(config.path.distImage));
    });

    gulp.task('public:other', () => {
        return gulp.src(path.join(config.path.srcPublic, 'common/**/*'))
            .pipe(gulp.dest(path.join(config.path.distPublic, 'common')));
    });

    
}