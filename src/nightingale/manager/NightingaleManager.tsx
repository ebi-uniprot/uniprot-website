import {
  createContext,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import useCustomElement from '../../shared/hooks/useCustomElement';

type State = {
  displayStart?: number;
  displayEnd?: number;
  highlight?: string;
};

/**
 * Nightingale context in order to pass the state of the instance down any level
 * within the wrapper in order to use that state in React components within
 */
export const NightingaleContext = createContext<State>({});

type Props = {
  children: ReactNode;
  attributes: string;
};

export const NightingaleManager = forwardRef<HTMLElement, Props>(
  ({ children, attributes }, forwardedRef) => {
    const managerElement = useCustomElement(
      /* istanbul ignore next */
      () =>
        import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
      'protvista-manager'
    );

    const [state, setState] = useState<State>({});

    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
      const listener = (event: CustomEvent<Record<string, unknown>>) => {
        if (event.detail) {
          // Copy the state within the Nightingale manager into this wrapper
          setState((previousState) => {
            const newState = { ...previousState };
            if (event.detail.displaystart) {
              newState.displayStart = +event.detail.displaystart;
            }
            if (event.detail.displayend) {
              newState.displayEnd = +event.detail.displayend;
            }
            if (event.detail.highlight) {
              newState.highlight = event.detail.highlight as string;
            }
            return newState;
          });
        }
      };
      const element = ref.current;
      element?.addEventListener('change', listener as EventListener, {
        passive: true,
      });
      return () =>
        element?.removeEventListener('change', listener as EventListener);
    }, []);

    return (
      <NightingaleContext.Provider value={state}>
        <managerElement.name
          ref={(node: HTMLDivElement) => {
            if (forwardedRef && 'current' in forwardedRef) {
              forwardedRef.current = node; // eslint-disable-line no-param-reassign
            }
            ref.current = node;
          }}
          attributes={attributes}
        >
          {children}
        </managerElement.name>
      </NightingaleContext.Provider>
    );
  }
);
