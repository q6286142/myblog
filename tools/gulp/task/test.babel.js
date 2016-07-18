import path from 'path';
import del from 'del';
const TEST_SRC_FILE = 'test/**/*.js';
const MOCHAWESOME_REPORTS = 'test/mochawesome-reports';
module.exports = (gulp, Plugin, rootDirectory) => {
    let mochawesomeReportsPath = path.join(rootDirectory, MOCHAWESOME_REPORTS);

    gulp.task('clean-reports', () => {
        return gulp.src(mochawesomeReportsPath)
            .pipe(Plugin.clean());
    });

    gulp.task('test-config', () => {
        return gulp.src(path.join(rootDirectory, TEST_SRC_FILE))
            .pipe(Plugin.mocha({
                reporter: 'mochawesome',
                reporterOptions: {
                    reportDir: mochawesomeReportsPath
                },
                compilers: 'js:node_modules/babel-core/register'
            }))
            .on('error', () => {
                gulp.emit('end');
            });
    });

    gulp.task('test', (cb) => {
        Plugin.runSequence('clean-reports', 'test-config', cb)
    });
} 