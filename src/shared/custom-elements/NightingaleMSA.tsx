import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleMSA from '@nightingale-elements/nightingale-msa';

export const NightingaleMSAComponent = createComponent({
  tagName: 'nightingale-msa',
  elementClass: NightingaleMSA,
  react: React,
  events: {
    onFeatureClick: 'featureclick',
    onchange: 'change',
  },
});

export default NightingaleMSAComponent;
