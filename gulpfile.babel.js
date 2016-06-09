import gulp from 'gulp';


gulp.task('copy',['public','view']);

gulp.task('public',()=>{
    gulp.src('src/public/**/*')
        .pipe(gulp.dest('dist/public')); 
});

gulp.task('view',()=>{
    gulp.src('src/views/**/*.jade')
        .pipe(gulp.dest('dist/views'));   
})