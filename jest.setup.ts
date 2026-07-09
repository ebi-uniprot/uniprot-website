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

jest.mock('/shared/workers/jobs/getJobSharedWorker', () => ({
  __esModule: true,
  default: jest.fn(),
  dispatchJobs: jest.fn(),
}));

jest.mock('@nightingale-elements/nightingale-navigation', () => jest.fn());

jest.mock('swagger-ui-react', () => null);

jest.mock(
  '@geneontology/web-components/loader',
  () => ({
    defineCustomElements: jest.fn(),
  }),
  { virtual: true }
);

// GoRibbon side-effect-imports this web-component bundle, which jest can't
// resolve; mock it so the module loads in tests.
jest.mock(
  '@geneontology/web-components/go-annotation-ribbon-strips',
  () => ({}),
  { virtual: true }
);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback([{ target } as ResizeObserverEntry], this);
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  unobserve(target: Element) {
    // Mock implementation
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect() {
    // Mock implementation
  }

  private callback: ResizeObserverCallback;
};

global.ResizeObserver = ResizeObserver;

// jsdom does not implement HTMLCanvasElement.getContext. Nightingale's
// `withCanvas` mixin calls `getContext('2d')` and the canvas tracks draw on the
// returned context. Provide a no-op 2D context stub so canvas-based custom
// elements render in tests without "Not implemented" errors.
const make2dContext = () => {
  const valueReturning: Record<string, () => unknown> = {
    measureText: () => ({ width: 0 }),
    getImageData: () => ({ data: [] }),
    createLinearGradient: () => ({ addColorStop: () => undefined }),
    createRadialGradient: () => ({ addColorStop: () => undefined }),
    createPattern: () => null,
    getLineDash: () => [],
  };
  return new Proxy(
    {},
    {
      // Return purpose-built helpers where a value is expected, otherwise a
      // no-op function so any drawing method (arc, fillRect, …) is callable.
      get: (_target, prop: string) => valueReturning[prop] ?? (() => undefined),
      // Allow setting context properties (fillStyle, lineWidth, …).
      set: () => true,
    }
  );
};

// Guarded: some specs use the `node` test environment, where HTMLCanvasElement
// does not exist.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = jest.fn((contextId: string) =>
    contextId === '2d' ? make2dContext() : null
  ) as typeof HTMLCanvasElement.prototype.getContext;
}

// @nightingale-elements/nightingale-track's ConfigHelper emits a stray
// `console.log(type)` for feature types that have no configured colour. Filter
// only that third-party debug output (identified by its source path); every
// other console.log passes through untouched.
const originalConsoleLog = console.log.bind(console);
console.log = (...args: Parameters<typeof console.log>) => {
  if (
    (new Error().stack ?? '').includes('nightingale-track/src/ConfigHelper')
  ) {
    return;
  }
  originalConsoleLog(...args);
};

/* "Fail on console error" util */
// Uncomment to have jest stop when a console error is shown in order to fix it
// Recommended to use with Jest's "--bail" option
// const { error } = console;
// // eslint-disable-next-line no-console
// console.error = (message, ...rest) => {
//   error.apply(console, [message, ...rest]); // keep default behaviour
//   throw message instanceof Error ? message : new Error(message);
// };

afterAll(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});
