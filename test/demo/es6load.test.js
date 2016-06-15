//import add from '../../src/add.js';
import chai from 'chai';
import path from 'path';
import fs from 'fs';
let expect = chai.expect;

describe('check loader module', () => {
    it('check content', () => {
        let modulePath = path.join(__dirname, 'testFile');
        fs.readdirSync(modulePath).forEach((file) => {
            let filePath = path.join(modulePath, file);
            let content = require(filePath);
            console.log(content.test + ' : ' + content.test1);
            expect(content.test).to.be.equal('3');
            expect(content.test1).to.be.equal('2');
        });
    });
})