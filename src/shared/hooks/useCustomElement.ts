import { useEffect, useRef } from 'react';

import useSafeState from './useSafeState';

import * as logging from '../utils/logging';

const isSupported = 'customElements' in window;

type UseCustomElement = <T extends string>(
  customElementGetter: () => Promise<{
    default: CustomElementConstructor;
  }>,
  name: T
) => { defined: boolean; errored: boolean; name: T };

const useCustomElement: UseCustomElement = (customElementGetter, name) => {
  const [defined, setDefined] = useSafeState(
    Boolean(window.customElements && window.customElements.get(name))
  );
  const [errored, setErrored] = useSafeState(false);

  // as it's a function, it might have been redefined through a rerender pass,
  // so keep that in a ref to avoid the useEffect to rerun needlessly
  const CEgetter = useRef(customElementGetter);

  useEffect(() => {
    // customElements not supported, bail
    if (!isSupported) {
      return;
    }
    // already instantiated, update state and bail
    if (window.customElements.get(name)) {
      setDefined(true);
      return;
    }
    CEgetter.current()
      .then((module) => {
        if (!window.customElements.get(name)) {
          try {
            window.customElements.define(name, module.default);
            setDefined(true);
          } catch (error) {
            // definition error
            if (error instanceof Error) {
              logging.error(error);
            }
            setErrored(true);
          }
        } else {
          setDefined(true);
        }
      })
      .catch((error) => {
        // network/loading error
        logging.error(error);
      });
  }, [name, setDefined, setErrored]);

  return { defined, errored, name };
};

const useCustomElementUnsupported: UseCustomElement = (_, name) => ({
  defined: false,
  errored: true,
  name,
});

export default isSupported ? useCustomElement : useCustomElementUnsupported;
