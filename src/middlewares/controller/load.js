import globExtend from '../../util/common/glob.extend';
import _ from 'lodash';
import path from 'path';

let defaultControllerGlobFileFormat = '/{name:*}.controller.js';

let constrollers = {};
let useConstrollers = {};
let defultOption = {

}

function setOption(option) {
    return _.defaults(option, defultOption);
}

function getControllerName(fileName) {

}

export default class Load {
    constructor(app, option) {
        this.app = app;
        this.option = setOption(option);
    }

    setFolderDirectory(directory) {
        directory = directory + defaultControllerGlobFileFormat;
        globExtend
            .sync(directory, this.option)
            .forEach((fileInfo) => {
                constrollers[fileInfo.match.name] = fileInfo.allPath;
            });
        return this;
    }

    use(controllerName, customMothed = null) {
        let controllerPath = constrollers[controllerName];
        console.log(controllerName);
        this.app.use('/' + controllerName, require(controllerPath)());
        return this;
    }

    getApp() {
        return this.app;
    }
}