import { createComponent } from '@lit/react';
import NightingaleTrackCanvas from '@nightingale-elements/nightingale-track-canvas';
import * as React from 'react';

const NightingalTrackCanvasComponent = createComponent({
  tagName: 'nightingale-track-canvas',
  elementClass: NightingaleTrackCanvas,
  react: React,
});

export default NightingalTrackCanvasComponent;
