import * as logging from '../../../../shared/utils/logging';
import { registerRichAdapters } from '..';

jest.mock('../../../../shared/utils/logging');

// Mirrors the library registry: each built-in may be overridden exactly once,
// a second attempt throws (protvista-uniprot's RegistryCollisionError).
const makeHost = () => {
  const overridable = new Set([
    'uniprot-proteomics-json',
    'uniprot-proteomics-ptm-json',
  ]);
  const adapters = new Map<string, unknown>();
  return {
    adapters,
    registerAdapter: jest.fn((name: string, fn: unknown) => {
      if (!overridable.has(name)) {
        throw new Error(
          `Cannot register adapter '${name}': an adapter with this name is already registered.`
        );
      }
      overridable.delete(name);
      adapters.set(name, fn);
    }),
  };
};

describe('registerRichAdapters', () => {
  it('replaces both proteomics built-ins', () => {
    const host = makeHost();
    registerRichAdapters(host);

    expect([...host.adapters.keys()].sort()).toEqual([
      'uniprot-proteomics-json',
      'uniprot-proteomics-ptm-json',
    ]);
  });

  // StrictMode re-runs ref callbacks against the same element
  it('is idempotent for the same element, without logging a collision', () => {
    const host = makeHost();
    registerRichAdapters(host);
    registerRichAdapters(host);

    expect(host.registerAdapter).toHaveBeenCalledTimes(2);
    expect(logging.warn).not.toHaveBeenCalled();
  });

  it('registers again on a different element, which has its own registry', () => {
    registerRichAdapters(makeHost());
    const second = makeHost();
    registerRichAdapters(second);

    expect(second.adapters.size).toBe(2);
  });

  it('warns but does not throw if the registry rejects an override', () => {
    const host = {
      registerAdapter: jest.fn(() => {
        throw new Error('already registered');
      }),
    };

    expect(() => registerRichAdapters(host)).not.toThrow();
    expect(logging.warn).toHaveBeenCalled();
  });
});
