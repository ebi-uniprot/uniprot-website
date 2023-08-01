import NightingaleTrack from '@nightingale-elements/nightingale-track';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'nightingale-track';

declare namespace JSX {
  interface IntrinsicElements {
    'nightingale-track': NightingaleTrack;
  }
}
