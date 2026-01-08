import { createComponent, type EventName } from '@lit/react';
import NightingaleMSA from '@nightingale-elements/nightingale-msa';
import * as React from 'react';

export type OnFeatureClick = CustomEvent<{ id: string; event: MouseEvent }>;

export const NightingaleMSAComponent = createComponent({
  tagName: 'nightingale-msa',
  elementClass: NightingaleMSA,
  react: React,
  events: {
    onFeatureClick: 'onFeatureClick' as EventName<OnFeatureClick>,
  },
});

export default NightingaleMSAComponent;
