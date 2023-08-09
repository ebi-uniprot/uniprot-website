import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
} from 'react';

export type NightingaleState = {
  ['display-start']?: number;
  ['display-end']?: number;
  highlight?: [start: number, end: number][];
};

export const NightingaleContext = createContext<
  [
    state: NightingaleState | undefined,
    updater: Dispatch<SetStateAction<NightingaleState | undefined>>
  ]
>([undefined, () => undefined]);

export const NightingaleProvider = ({ children }: { children: ReactNode }) => {
  const stateAndSetter = useState<NightingaleState | undefined>();

  return (
    <NightingaleContext.Provider value={stateAndSetter}>
      {children}
    </NightingaleContext.Provider>
  );
};
