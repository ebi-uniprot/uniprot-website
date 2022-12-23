import '@testing-library/jest-dom';
import 'interaction-viewer';

import { resetUuidV1 } from './__mocks__/uuid';

global.gtag = () => {
  /* google tag manager */
};
global.hj = () => {
  /* hotjar */
};

// useCustomElement always says that the component is defined for tests
jest.mock('/shared/hooks/useCustomElement', () => ({
  __esModule: true,
  default: (_, name) => ({ defined: true, errored: false, name }),
}));

// Mock lit elements
// returning null otherwise the mock doesn't work 🤷‍♂️
jest.mock('interaction-viewer', () => null);

global.beforeEach(() => {
  resetUuidV1();
});

jest.setTimeout(30000);
