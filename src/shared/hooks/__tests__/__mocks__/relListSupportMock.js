jest.mock();

Object.defineProperty(DOMTokenList.prototype, 'supports', {
  value: jest.fn().mockImplementation(() => true),
});
