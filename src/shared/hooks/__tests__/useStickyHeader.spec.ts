import { act, renderHook } from '@testing-library/react';

import useStickyHeader from '../useStickyHeader';

type ObserverHandle = {
  callback: IntersectionObserverCallback;
  target: Element | null;
  disconnect: jest.Mock;
};

let observers: ObserverHandle[];
const realIntersectionObserver = (
  globalThis as unknown as {
    IntersectionObserver?: typeof IntersectionObserver;
  }
).IntersectionObserver;

class FakeIntersectionObserver {
  callback: IntersectionObserverCallback;

  target: Element | null = null;

  disconnect = jest.fn();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }

  observe(target: Element) {
    this.target = target;
  }

  unobserve = jest.fn();

  takeRecords = jest.fn((): IntersectionObserverEntry[] => []);
}

const installFakeIO = () => {
  (
    globalThis as unknown as { IntersectionObserver: unknown }
  ).IntersectionObserver = FakeIntersectionObserver;
};

const restoreIO = () => {
  (
    globalThis as unknown as { IntersectionObserver: unknown }
  ).IntersectionObserver = realIntersectionObserver;
};

const fireIntersect = (observer: ObserverHandle, isIntersecting: boolean) => {
  if (!observer.target) {
    throw new Error('observer has no target');
  }
  const entry = {
    target: observer.target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
  } as IntersectionObserverEntry;
  act(() => {
    observer.callback([entry], observer as unknown as IntersectionObserver);
  });
};

describe('useStickyHeader', () => {
  beforeEach(() => {
    observers = [];
    installFakeIO();
  });

  afterAll(() => {
    restoreIO();
  });

  it('starts as not-stuck and returns a stable ref callback across renders', () => {
    const { result, rerender } = renderHook(() => useStickyHeader());
    expect(result.current[0]).toBe(false);
    const refCallback = result.current[1];
    rerender();
    expect(result.current[1]).toBe(refCallback);
  });

  it('starts observing the moment the ref callback receives a node', () => {
    const { result } = renderHook(() => useStickyHeader());
    const node = document.createElement('div');
    act(() => result.current[1](node));
    expect(observers).toHaveLength(1);
    expect(observers[0].target).toBe(node);
  });

  it('flips isStuck based on the observer entry', () => {
    const { result } = renderHook(() => useStickyHeader());
    const node = document.createElement('div');
    act(() => result.current[1](node));

    // IntersectionObserver fires once on observe with the initial state; the
    // hook should reconcile to that value, not stay on the initial `false`.
    fireIntersect(observers[0], false);
    expect(result.current[0]).toBe(true);

    fireIntersect(observers[0], true);
    expect(result.current[0]).toBe(false);
  });

  it('disconnects the previous observer and resets state when the ref detaches', () => {
    const { result } = renderHook(() => useStickyHeader());
    const node = document.createElement('div');
    act(() => result.current[1](node));
    fireIntersect(observers[0], false);
    expect(result.current[0]).toBe(true);

    const previousDisconnect = observers[0].disconnect;
    act(() => result.current[1](null));
    expect(previousDisconnect).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(false);
  });

  it('disconnects the previous observer when the ref re-attaches to a different node', () => {
    const { result } = renderHook(() => useStickyHeader());
    const first = document.createElement('div');
    const second = document.createElement('div');

    act(() => result.current[1](first));
    const firstDisconnect = observers[0].disconnect;

    act(() => result.current[1](second));
    expect(firstDisconnect).toHaveBeenCalledTimes(1);
    expect(observers).toHaveLength(2);
    expect(observers[1].target).toBe(second);
  });

  it('disconnects on unmount', () => {
    const { result, unmount } = renderHook(() => useStickyHeader());
    const node = document.createElement('div');
    act(() => result.current[1](node));
    const observer = observers[0];

    unmount();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it('no-ops cleanly when IntersectionObserver is unavailable (SSR / older browsers)', () => {
    restoreIO();
    (
      globalThis as unknown as { IntersectionObserver: unknown }
    ).IntersectionObserver = undefined;
    try {
      const { result } = renderHook(() => useStickyHeader());
      const node = document.createElement('div');
      act(() => result.current[1](node));
      expect(result.current[0]).toBe(false);
      expect(observers).toHaveLength(0);
    } finally {
      installFakeIO();
    }
  });
});
