import '@testing-library/jest-dom';
import 'interaction-viewer';
import 'swagger-ui-react';
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

jest.mock('/shared/custom-elements/NightingaleMSA', () => jest.fn());

jest.mock('swagger-ui-react', () => null);

global.beforeEach(() => {
  resetUuidV1();
});

jest
  .spyOn(Date.prototype, 'toLocaleString')
  .mockReturnValue('99/99/9999, 00:00:00');

jest.setTimeout(30000);

/**
 * React useId mock, to make sure ids are reset between each test and not
 * dependent on order of tests and IDs are stable even when more tests are added
 */
let id = 0;

beforeEach(() => {
  id = 0;
});

// eslint-disable-next-line no-plusplus
const mockedUseId = () => ++id;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: mockedUseId,
}));
