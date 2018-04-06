var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./../../server/utils/message');

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

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    let from = 'vincent';
    let latitude = 36.9547168;
    let longitude = -122.03902980000001;
    let message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe('https://www.google.com/maps?q=36.9547168,-122.03902980000001');
    expect(typeof message.createdAt).toBe('number');
  });
});
