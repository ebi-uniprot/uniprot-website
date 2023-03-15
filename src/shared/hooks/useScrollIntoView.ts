import { useLayoutEffect, useRef } from 'react';

const useScrollIntoViewRef = () => {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return ref;
};

export default useScrollIntoViewRef;
