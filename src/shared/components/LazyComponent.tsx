import { Loader } from 'franklin-sites';
import { FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';

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

const inBrowser =
  typeof window !== 'undefined' &&
  !!window.document &&
  !!window.document.createElement;
const ioSupported = inBrowser && 'IntersectionObserver' in window;

const LazyComponent: FC<React.PropsWithChildren<Props>> = ({
  fallback = defaultFallback,
  rootMargin = '300px 0px',
  children,
  render,
}) => {
  // consistently start in the same way in the browser or on the server, and
  // and update in the browser through a useEffect
  const [shouldRender, setShouldRender] = useState(() => Boolean(render));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always follow props, in case it changes
    if (typeof render !== 'undefined') {
      setShouldRender(render);
    }

    if (!inBrowser) {
      // This shouldn't happen in a useEffect, but still...
      return;
    }

    if (!ioSupported) {
      // Just render if IntersectionObserver is not supported
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries?.[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        // Need to specify this to have the rootMargin work with new layout
        root: document.querySelector(`.${baseLayoutStyles['main-content']}`),
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [render, rootMargin]);

  if (shouldRender) {
    return (
      <Suspense fallback={fallback}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    );
  }

  return <div ref={ref}>{render === false ? null : fallback}</div>;
};

export default LazyComponent;
