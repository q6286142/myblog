import chai from 'chai';
import glob from 'glob';
import GlobExtend from '../../src/util/common/glob.extend';

let expect = chai.expect;
let globExtendPattern = './test/tool/glob.extend/{custom1:**}/{custom2:*}.{custom3:*}.js';
describe('test glob extend', () => {
    let globExtend = new GlobExtend(globExtendPattern);
    let foundFiles;
    it('get glob pattern', () => {
        expect(globExtend.globPattern).to.be
            .equal('./test/tool/glob.extend/**/*.*.js');
    });

    it('get match rules', () => {
        expect(globExtend.matchRules).to.deep.equal({
            custom1: '**',
            custom2: '*',
            custom3: '*'
        });
    });

    it('get match glob founds RegEx', () => {
        expect(globExtend.matchFoundRegExStr).to.be
            .equal(`\\.\\/test\\/tool\\/glob\\.extend\\/(?:((?!\\/)(?=.)[^/]*)\\/)*((?!\\/)(?=.)[^/]*)\\.((?!\\/)(?=.)[^/]*)\\.js`);
    });

    it('use globExtend.globPattern found glob', () => {
        foundFiles = glob.sync(globExtend.globPattern);
        expect(foundFiles).to.have.length.is(4);
    });

    it('get fileInfo from found files', () => {
        let fileInfos = globExtend.generateFileInfo(foundFiles);
        checkFileInfoStrut(fileInfos);
    });

    it('use static sync mothed',()=>{
       let fileInfos = GlobExtend.sync(globExtendPattern);
       checkFileInfoStrut(fileInfos);
    });

    it('use static async mothed',(done)=>{
        GlobExtend.async(globExtendPattern)
            .then((fileInfos)=>{               
                checkFileInfoStrut(fileInfos);
                done();
            });
    });
    
    function checkFileInfoStrut(fileInfos){
        fileInfos.forEach((value) => {
            expect(value).to.have.all.keys('path','match');
            expect(value.match).to.have.all.keys('custom1','custom2','custom3');
        });
    }
});


