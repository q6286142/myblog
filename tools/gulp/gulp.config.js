import path from 'path';

export default (rootDirectory) => {
    let directory = {};
    directory.src = path.join(rootDirectory, 'src');
    directory.srcView = path.join(directory.src, 'views');
    directory.srcJade = path.join(directory.srcView, '**/*.jade');

    directory.srcPublic = path.join(directory.src, 'public');
    directory.srcSass = path.join(directory.srcPublic, 'sass/**/*.sass');
    directory.srcCss = path.join(directory.srcPublic, 'css/**/*.css');
    directory.srcImage = path.join(directory.srcPublic, 'image/**/*');

    directory.dist = path.join(rootDirectory, 'dist');
    directory.distView = path.join(directory.dist, 'views');
    directory.distPublic = path.join(directory.dist, 'public');
    directory.distCss = path.join(directory.distPublic, 'css');
    directory.distImage = path.join(directory.distPublic, 'image');

    directory.test = path.join(rootDirectory, 'test/**/*.js');
    directory.testReports = path.join(rootDirectory, 'test/mochawesome-reports');

    return {
        path: directory
    }
}