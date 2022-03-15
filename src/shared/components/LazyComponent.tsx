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

const defaultFallback = <Loader />;

type Props = {
  fallback?: ReactNode;
  rootMargin?: string;
};

const ioSupported = globalThis && 'IntersectionObserver' in globalThis;

const LazyComponent: FC<Props> = ({
  fallback = defaultFallback,
  rootMargin,
  children,
}) => {
  // In case of not supported browser, just display the component
  const [wasShown, setWasShown] = useState(!ioSupported);
  const ref = useRef<HTMLDivElement>(null);

  const observer = useMemo(
    () =>
      ioSupported &&
      new globalThis.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setWasShown(true);
          }
        },
        { rootMargin }
      ),
    [rootMargin]
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (observer && ref.current && !wasShown) {
      observer.observe(ref.current);
      // Should disconnect as soon as the intersection observer was triggered
      return () => observer.disconnect();
    }
  }, [observer, wasShown]);

  if (wasShown) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  return <div ref={ref}>{fallback}</div>;
};

export default LazyComponent;
