import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleTrack from '@nightingale-elements/nightingale-track';

export const NightingalTrackComponent = createComponent({
  tagName: 'nightingale-track',
  elementClass: NightingaleTrack,
  react: React,
});

export default NightingalTrackComponent;
