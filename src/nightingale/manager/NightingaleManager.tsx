import {
  createContext,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

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
};

export const NightingaleManager = ({ children }: Props) => {
  const stateAndUpdater = useState<State>({});

  // useEffect(() => {
  //   const listener = (event: CustomEvent<Record<string, unknown>>) => {
  //     if (event.detail) {
  //       // Copy the state within the Nightingale manager into this wrapper
  //       setState((previousState) => {
  //         const newState = { ...previousState };
  //         if (event.detail.displaystart) {
  //           newState.displayStart = +event.detail.displaystart;
  //         }
  //         if (event.detail.displayend) {
  //           newState.displayEnd = +event.detail.displayend;
  //         }
  //         if (event.detail.highlight) {
  //           newState.highlight = event.detail.highlight as string;
  //         }
  //         return newState;
  //       });
  //     }
  //   };
  //   const element = ref.current;
  //   element?.addEventListener('change', listener as EventListener, {
  //     passive: true,
  //   });
  //   return () =>
  //     element?.removeEventListener('change', listener as EventListener);
  // }, []);

  // useEffect(() => {
  //   for (const [key, value] of Object.entries(state)) {
  //     if (ref.current?.[key] !== value) {
  //       ref.current?.[key] = value;
  //     }
  //   }
  // }, [state]);

  return (
    <NightingaleContext.Provider value={stateAndUpdater}>
      {children}
    </NightingaleContext.Provider>
  );
};
