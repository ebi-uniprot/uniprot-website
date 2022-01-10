import '@testing-library/jest-dom';

import { resetUuidV1 } from './__mocks__/uuid';

const nodeCrypto = require('crypto');

global.crypto = {
  ...global.crypto,
  getRandomValues(buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
};

// useCustomElement always says that the component is defined for tests
jest.mock('/shared/hooks/useCustomElement', () => ({
  __esModule: true,
  default: (_, name) => ({ defined: true, errored: false, name }),
}));

global.beforeEach(() => {
  resetUuidV1();
});

global.GIT_COMMIT_HASH = '#git_commit_id';

jest.setTimeout(30000);
