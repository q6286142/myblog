import path from 'path';
import gulpConfig from '../gulp.config.js';

module.exports = (gulp, Plugin, config) => {

    gulp.task('develop:nodemon', ['publish'], () => {
        return Plugin.nodemon({
            script: path.join(config.path.dist,'start.js'),
            watch: config.path.src,
            ext: 'js',
            ignore: [
                "public/**",
                "views/**"
            ],
            tasks: ['publish:compile-babel'],
            env: {
                "NODE_ENV": "development"
            }
        });
    });

    gulp.task("develop:liveraload", () => {
        Plugin.livereload.listen();
        var server = Plugin.livereload();
        gulp.watch(config.path.srcCss, ['public:css'], (event) => {
            server.changed(event.path);
        });

        gulp.watch(config.path.srcSass, ['public:sass'], (event) => {
            server.changed(event.path);
        });

        gulp.watch(config.path.srcImage, ['public:img'], (event) => {
            server.changed(event.path);
        });

        gulp.watch(config.path.srcJade, ['publish:jade'], (event) => {
            server.changed(event.path);
        })
    })

    gulp.task('develop', ['develop:nodemon', 'develop:liveraload']);
}