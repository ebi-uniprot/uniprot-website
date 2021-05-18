import '@testing-library/jest-dom';

import { resetUuidV1 } from './__mocks__/uuid';

const nodeCrypto = require('crypto');

global.crypto = {
  ...global.crypto,
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
};

// useCustomElement always says that the component is defined for tests
jest.mock('/shared/hooks/useCustomElement', () => ({
  __esModule: true,
  default: () => true,
}));

global.beforeEach(() => {
  resetUuidV1();
});
