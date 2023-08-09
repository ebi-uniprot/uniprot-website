import { PropsWithRef } from 'react';
import NightingaleTrack from '@nightingale-elements/nightingale-track';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';

export type NightingaleParams = {
  ['display-start']?: number;
  ['display-end']?: number;
  highlight?: string;
};

interface CustomEventMap {
  change: CustomEvent<NightingaleParams>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'nightingale-track': PropsWithRef<NightingaleTrack>;
      'nightingale-navigation': PropsWithRef<NightingaleNavigation>;
    }
  }
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}
