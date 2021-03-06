import gulp from 'gulp';
import Plugin from 'gulp-load-plugins';
import glob from 'glob';
import GulpConfig from './tools/gulp/gulp.config';

let gulpConfig = GulpConfig(__dirname);
let list = new glob.GlobSync('./tools/gulp/task/**/*.task.js');
// glob.sync('./tools/gulp/task/**/*.js');

list.found.forEach((fileName)=>{
    require(fileName)(gulp, Plugin(), gulpConfig);
});





// fs.readdir('./tool/gulp/',(file)=>{
//     console.log(file);
//     
// });



//gulpTaskList.fo

// import gulpMocha from 'gulp-mocha';
// import gulpBabel from 'gulp-babel';
// import gulpSourcemaps from 'gulp-sourcemaps';
// import runSequence from 'gulp-run-sequence';  
// import del from 'del';

// gulp.task('publish', ()=>{
//     runSequence('babel', 'public', 'view');
// });

// gulp.task('test', () => {
//     del.sync('./test/mochawesome-reports/**/*');
//     return gulp.src('test/**/*.js')
//         .pipe(gulpMocha({
//             reporter:'mochawesome',
//             reporterOptions: {
//                 reportDir: './test/mochawesome-reports'
//             },
//             compilers:'js:node_modules/babel-core/register'
//         }))
//         .on('error', () => {
//             gulp.emit('end');
//         });
// });

// gulp.task('babel', () => {
//     del.sync('./dist');
//     return gulp.src('src/**/*.js')
//         .pipe(gulpSourcemaps.init())
//         .pipe(gulpBabel())
//         .pipe(gulpSourcemaps.write('.'))
//         .pipe(gulp.dest('dist'));
// })

// gulp.task('public', () => {
//     return gulp.src('src/public/**/*')
//         .pipe(gulp.dest('dist/public'));
// });

// gulp.task('view', () => {
//     return gulp.src('src/views/**/*.jade')
//         .pipe(gulp.dest('dist/views'));
// });

