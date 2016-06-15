//import add from '../../src/add.js';
import chai from 'chai';

let expect = chai.expect;

describe('加法函数的测试', () => {
  var foo = false;

  before((done) => {
    console.log("before");
    done();
  });

  after((done) => {
    console.log("after");
    done();
  });

  beforeEach((done) => {
    console.log("each before");
    setTimeout(() => {
      foo = true;
      done();
    }, 1000);
  });

  afterEach((done) => {
    console.log("each after");
    done();
  });

  it('1 加 1 应该等于 2', () => {
    expect(1+1).to.be.equal(2);
  });

  it("全局变量异步修改应该成功", () => {
    expect(foo).to.be.equal(true);
  });

  it("deep test", () => {
    foo = { bar: 'baz' };
    expect(foo).to.be.deep.equal({ bar: 'baz' });
  });

  it("数组是否包含", () => {
    //expect(['2','3',',']).to.include(2);
    //expect([2,3,',']).to.include('2');
    expect(['222sss','中',',']).to.include('中');
  });

  it("判断是否为空", () => {
    console.log("array");
    expect([]).to.be.empty;
    console.log("string");
    expect('').to.be.empty;
    console.log("object");
    expect({}).to.be.empty;
  });

  it("正则匹配", () => {
    expect('foobar').to.match(/^foo/);
  });
});
