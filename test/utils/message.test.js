var expect = require('expect');
var {generateMessage} = require('./../../server/utils/message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'vincent';
    let text = 'My name is Vincent';
    let message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
  });
});
