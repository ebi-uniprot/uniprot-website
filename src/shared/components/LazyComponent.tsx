import { Loader } from 'franklin-sites';
import {
  FC,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import ErrorBoundary from './error-component/ErrorBoundary';
import baseLayoutStyles from './layouts/styles/base-layout.module.scss';

const defaultFallback = <Loader />;

type Props = {
  fallback?: ReactNode;
  rootMargin?: string;
  // Might be useful to debug, or to manually control the rendering with logic
  // external to this component
  render?: boolean;
};

const ioSupported = globalThis && 'IntersectionObserver' in globalThis;

const LazyComponent: FC<React.PropsWithChildren<Props>> = ({
  fallback = defaultFallback,
  rootMargin = '300px 0px',
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
        {
          // Need to specify this to have the rootMargin work with new layout
          root: document.querySelector(`.${baseLayoutStyles['main-content']}`),
          rootMargin,
        }
      ),
    [rootMargin, render]
  );

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

  return <div ref={ref}>{render === false ? null : fallback}</div>;
};

export default LazyComponent;
