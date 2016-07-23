import path from 'path';
import del from 'del';

module.exports = (gulp, Plugin, config) => {
    gulp.task('test:clean-reports', () => {
        return gulp.src(config.path.testReports)
            .pipe(Plugin.clean());
    });

    gulp.task('test:config', () => {
        return gulp.src(config.path.test)
            .pipe(Plugin.mocha({
                reporter: 'mochawesome',
                reporterOptions: {
                    reportDir: config.path.testReports
                },
                compilers: 'js:node_modules/babel-core/register'
            }))
            .on('error', () => {
                gulp.emit('end');
            });
    });

    gulp.task('test', (cb) => {
        Plugin.runSequence('test:clean-reports', 'test:config', cb)
    });
} 