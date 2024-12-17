import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleSequence from '@nightingale-elements/nightingale-sequence';

export const NightingaleSequenceComponent = createComponent({
  tagName: 'nightingale-sequence',
  elementClass: NightingaleSequence,
  react: React,
});

export default NightingaleSequenceComponent;
