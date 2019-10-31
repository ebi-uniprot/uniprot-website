let value = -1;
module.exports = {
  v1: jest.fn(() => {
    value += 1;
    return value;
  }),
  // This is used to reset value between successive tests
  // which rely upon uuid. Doing this allows test order
  // to be changed and the stored snapshot key value will
  // not be effected
  resetUuidV1: () => {
    value = -1;
  },
};
