const nodeCrypto = require('crypto');

global.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
};

// mock
jest.mock('/shared/hooks/useCustomElement', () => ({
  __esModule: true,
  default: () => true,
}));
