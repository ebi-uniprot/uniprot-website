import { useLayoutEffect, useRef } from 'react';

const useScrollIntoViewRef = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return ref;
};

export default useScrollIntoViewRef;
