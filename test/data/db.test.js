import chai from 'chai';
import mongoose from 'mongoose';
import initDB from '../../src/data/db';
import '../../src/data/model/user';
initDB();

let expect = chai.expect;

describe('mongoose test demo', (done) => {
    let mockUser = 'test01' + new Date().getTime() + '@tets.com';
    let User = mongoose.model('User');
    let user;
    before((done) => {
        user = new User({
            nickname: '测试' + new Date().getTime(),
            password: 'test',
            role: 'user',
            status: 1
        });
        done();
    });

    it('create user error', (done) => {
        user.username = '';
        user.save().then((model) => {
            done()
        }).catch((err) => {
            let errs = err.errors;
            for (let key in errs) {
                let value = errs[key];
                console.log(value.message);
            }
            expect(errs).to.be.not.null;
            done();
        });
    });

    it('create user', (done) => {
        user.username = 'admin';
        user.email = mockUser;
        user.save().then((model) => {
            user = model;
            expect(model).to.be.include({ email: mockUser });
            done();
        }).catch((err) => {
            done();
        });
    });

    it('update user ', (done) => {
        user.nickname = 'jorex';
        user.save().then((model) => {
            expect(model).to.be.include({ nickname: 'jorex' });
            console.log(model);
            done();
        }).catch((err) => {
            done();
        });
    });

    it('remove user', (done) => {
        user.remove().then((model) => {
            User.findById(user._id, (model) => {
                expect(model).to.be.equal(null);
                done();
            });
        }).catch((err) => {
            done();
        });
    });

    after((done) => {
        mongoose.disconnect((err) => {
            done();
        });
    })
});
