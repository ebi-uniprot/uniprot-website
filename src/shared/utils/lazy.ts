import { lazy as reactLazy, ComponentType, LazyExoticComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LazyComponent<T extends ComponentType<React.PropsWithChildren<any>>> =
  LazyExoticComponent<T> & {
    preload: () => void;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazy = <T extends ComponentType<React.PropsWithChildren<any>>>(
  factory: () => Promise<{ default: T }>
) => {
  // variable to keep the result of the factory
  let promise: Promise<{ default: T }>;

  const load = () => {
    // first time we try to load the chunk in the factory?
    if (!promise) {
      // no, then call the factory and keep the resulting promise
      promise = factory();
    }
    // otherwise, or after calling the factory only once, return its promise
    return promise;
  };

  // actual lazy component as returned by react's `lazy()`
  const lazyComponent: Partial<LazyComponent<T>> = reactLazy(() => load());

  // extend react's lazy component with our own custom preload method
  lazyComponent.preload = () => {
    load();
    // Not interested in the actual return value here, so don't return it
  };

  return lazyComponent as LazyComponent<T>;
};

export default lazy;
