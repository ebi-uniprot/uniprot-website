import {
  FC,
  ReactNode,
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
} from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from './error-component/ErrorBoundary';

const defaultFallback = <Loader />;

type Props = {
  fallback?: ReactNode;
  rootMargin?: string;
  // Might be useful to debug, or to manually control the rendering with logic
  // external to this component
  render?: boolean;
};

const ioSupported = globalThis && 'IntersectionObserver' in globalThis;

const LazyComponent: FC<Props> = ({
  fallback = defaultFallback,
  rootMargin,
  children,
  render,
}) => {
  // In case of not supported browser, just display the component
  const [wasShown, setWasShown] = useState(!ioSupported);
  const ref = useRef<HTMLDivElement>(null);

  const observer = useMemo(
    () =>
      render === undefined &&
      ioSupported &&
      new globalThis.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setWasShown(true);
          }
        },
        { rootMargin }
      ),
    [rootMargin, render]
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (render === undefined && observer && ref.current && !wasShown) {
      observer.observe(ref.current);
      // Should disconnect as soon as the intersection observer was triggered
      return () => observer.disconnect();
    }
  }, [render, observer, wasShown]);

  if (render ?? wasShown) {
    return (
      <Suspense fallback={fallback}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    );
  }

  return <div ref={ref}>{fallback}</div>;
};

export default LazyComponent;
