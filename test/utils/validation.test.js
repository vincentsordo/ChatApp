var expect = require('expect');
var {isRealString} = require('./../../server/utils/validation');

describe('isRealString', () => {
  it('should return true for real string', () => {
    let str = 'realstring';
    let realStringFlag = isRealString(str);
    expect(realStringFlag).toBe(true);
  });

  it('should return false if a number', () => {
    let str = 2;
    let realStringFlag = isRealString(str);
    expect(realStringFlag).toBe(false);
  });

  it('should return false if a blank string', () => {
    let str = '  ';
    let realStringFlag = isRealString(str);
    expect(realStringFlag).toBe(false);
  });
});
