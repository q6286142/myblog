import glob from 'glob';
import path from 'path';
// path   ./aaa/{customName1:**}/*sdf/{customName2:*}.ccc.js;
// transform to 
// glob path paramtter  ./aaa/**/*sdf/*.ccc.js;
// and get match value RegEx ./aaa/((?!\/)(?=.)[^/]*)/(?!\/)(?=.)[^/]*sdf\/((?!\/)(?=.)[^/]*).ccc.js
// next 
// match glob found list 
// last return fileinfo
// format:
// {
//     path:'./aaa/ccc/ssdf/ss.js',
//     match:{
//         customName1:'ccc',
//         customName2:'ss'
//     }
// }
const rMatchRule = /{([\s\S]+?):([\s\S]+?)}/g;
const rMatchFound = '((?!\\/)(?=.)[^/]*)';
const rMatchDirectories = '(?:((?!\\/)(?=.)[^/]*)\\/)*';

export default class GlobExtend {
    constructor(pattern) {
        this.matchRules = this.generateMacthRules(pattern);
        this.globPattern = pattern;
        this.matchFoundRegExStr = this.globPattern.replace(/\//g, '\\/').replace(/\./g, '\\.');
        Object.keys(this.matchRules).forEach((key) => {
            let value = this.matchRules[key];
            let needReplace = '{' + key + ':' + value + '}';
            this.globPattern = this.globPattern.replace(needReplace, value);

            let replaced = rMatchFound;
            if (value.trim() === '**') {
                needReplace += '\\/';
                replaced = rMatchDirectories;
            }
            this.matchFoundRegExStr = this.matchFoundRegExStr.replace(needReplace, replaced)
        })
        this.matchFoundRegEx = new RegExp(this.matchFoundRegExStr, 'g');
    }

    generateFileInfo(files,option) {
        return files.map((item) => {
            let matchInfo = this.matchFoundRegEx.exec(item);
            this.matchFoundRegEx.lastIndex = 0;
            let fileInfo = {
                path: item,
                allPath: path.join(option.cwd,item),
                match:{}
            };
            Object.keys(this.matchRules).forEach((key, index) => {
                fileInfo.match[key] = matchInfo[index+1];
            });
            return fileInfo;
        });
    }

    generateMacthRules(pattern) {
        let ruleObj = {};
        let matchItem = rMatchRule.exec(pattern);
        while (matchItem && matchItem.length == 3 && matchItem[1]) {
            ruleObj[matchItem[1]] = matchItem[2];
            matchItem = rMatchRule.exec(pattern);
        }
        return ruleObj;
    }

    static sync(pattern, option) {
        let globExtend = new GlobExtend(pattern);
        let files = glob.sync(globExtend.globPattern, option);
        return globExtend.generateFileInfo(files,option);
    }

    static async(pattern, option) {
        return new Promise((resolve, reject) => {
            let globExtend = new GlobExtend(pattern);
            glob(globExtend.globPattern, option, (err, files) => {
                let fileInfos = globExtend.generateFileInfo(files,option);
                return err === null ? resolve(fileInfos) : reject(err)
            })
        });
    }
}